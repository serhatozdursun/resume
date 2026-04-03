import {
  getRandomQuestions,
  getSecureRandom,
  type Question,
} from '../components/ExamPage.helpers';

describe('ExamPage.helpers', () => {
  const sampleQuestion = (id: string): Question => ({
    id,
    question: `Question ${id}?`,
    answers: { a: 'A', b: 'B', c: 'C', d: 'D' },
    correct_answer: 'a',
    points: 1,
    syllabus_reference: 'S-1',
    tip: 'Tip',
    real_life_example: '',
  });

  describe('getSecureRandom', () => {
    it('returns 0 when max is not positive', () => {
      expect(getSecureRandom(0)).toBe(0);
      expect(getSecureRandom(-1)).toBe(0);
    });

    it('returns 0 when max is not finite', () => {
      expect(getSecureRandom(Number.NaN)).toBe(0);
      expect(getSecureRandom(Number.POSITIVE_INFINITY)).toBe(0);
    });

    it('returns values in [0, max) when crypto.getRandomValues is available', () => {
      const max = 7;
      for (let k = 0; k < 40; k++) {
        const n = getSecureRandom(max);
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThan(max);
      }
    });

    it('falls back to Math.random when crypto.getRandomValues is unavailable', () => {
      const original = crypto.getRandomValues;
      Object.defineProperty(crypto, 'getRandomValues', {
        value: undefined,
        configurable: true,
      });
      try {
        const n = getSecureRandom(5);
        expect(n).toBeGreaterThanOrEqual(0);
        expect(n).toBeLessThan(5);
      } finally {
        Object.defineProperty(crypto, 'getRandomValues', {
          value: original,
          configurable: true,
        });
      }
    });
  });

  describe('getRandomQuestions', () => {
    it('returns a permutation subset without mutating the source array', () => {
      const q: Question[] = ['a', 'b', 'c', 'd', 'e'].map(id =>
        sampleQuestion(id)
      );
      const copy = [...q];
      const picked = getRandomQuestions(q, 3);

      expect(picked).toHaveLength(3);
      expect(q).toEqual(copy);
      picked.forEach(item => {
        expect(copy.some(orig => orig.id === item.id)).toBe(true);
      });
      const ids = picked.map(p => p.id);
      expect(new Set(ids).size).toBe(3);
    });

    it('returns an empty array when count is 0', () => {
      const q = [sampleQuestion('1'), sampleQuestion('2')];
      expect(getRandomQuestions(q, 0)).toEqual([]);
    });
  });
});

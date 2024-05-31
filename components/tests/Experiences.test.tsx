// Experiences.test.tsx
import { experiences } from '../ExperiencesComponents'; // Update the path

describe('Experiences', () => {
    it('should have valid experience entries', () => {
        experiences.forEach((exp) => {
            expect(exp.title).toBeTruthy(); // Ensure title exists
            expect(Array.isArray(exp.points)).toBeTruthy(); // Ensure points is an array

            exp.points.forEach((point) => {
                expect(typeof point === 'string').toBeTruthy(); // Ensure each point is a string
            });
        });
    });

    it('should have correct number of entries', () => {
        // Update this number based on the actual number of experiences
        expect(experiences.length).toBe(9);
    });

    // Add more specific tests as needed
});

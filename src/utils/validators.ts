export function validateEmail(email: string): boolean {
  if (!email) return false;
  if (email.length > 254) return false;
  const at = email.indexOf('@');
  if (at <= 0 || at === email.length - 1) return false;
  const domain = email.slice(at + 1);
  if (!domain.includes('.') || domain.endsWith('.')) return false;
  return true;
}

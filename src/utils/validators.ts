export function validateEmail(email: string): boolean {
  // same semantics as current inline regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

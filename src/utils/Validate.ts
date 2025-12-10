const Validate = (email: string, password: string, fullName?: string | null): string | null => {
  const emailValidate = /^[a-zA-Z0-9_.+\-]+[\x40][a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email);
  const passwordValidate = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/.test(password);

  if (!emailValidate) return 'Email ID is not valid';
  if (!passwordValidate) return 'Password must be 8+ chars with uppercase, lowercase, number, and symbol';
  if (fullName !== undefined && fullName !== null && fullName.trim() === '') return 'Name is required';

  return null;
};

export default Validate;

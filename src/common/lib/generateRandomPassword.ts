export function generateRandomPassword(length = 8): string {
  length = Math.max(length, 8);

  const lettersAndNumbers =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let password = "";

  // Generate (length - 1) chars from lettersAndNumbers
  for (let i = 0; i < length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * lettersAndNumbers.length);
    password += lettersAndNumbers[randomIndex];
  }

  // Pick 1 symbol
  const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

  // Sisipkan simbol di posisi acak
  const insertPosition = Math.floor(Math.random() * password.length);
  const finalPassword =
    password.slice(0, insertPosition) +
    randomSymbol +
    password.slice(insertPosition);

  return finalPassword;
}

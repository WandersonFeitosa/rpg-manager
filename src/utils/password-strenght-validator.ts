export function passwordStrenghtValidator(password: string): number {
  let rules = 0;

  if (password.match(/[A-Z]/)) {
    rules++;
  }
  if (password.match(/[a-z]/)) {
    rules++;
  }
  if (password.match(/[0-9]/)) {
    rules++;
  }
  if (password.match(/[^A-Za-z0-9]/)) {
    rules++;
  }
  if (password.length <= 8) {
    rules = 1;
  }
  switch (rules) {
    case 1:
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
    case 5:
      return 3;
    default:
      return 1;
  }
}

export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

export function validatePassword(value: string) {
  let error;
  if (!value) {
    error = "Password is required";
  } else if (value.length < 8) {
    error = "Password must be at least 8 characters";
  }
  return error;
}

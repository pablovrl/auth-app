export function validateEmail(value: string) {
  let error;
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Invalid email address";
  }
  return error;
}

export function validatePassword(value: string, isRequired: boolean = false) {
  let error;
  if (!value && isRequired) {
    error = "Password is required";
  } else if (value.length > 0 && value.length < 8) {
    error = "Password must be at least 8 characters";
  }
  return error;
}

export function validateName(value: string) {
  let error;
  if (!value) {
    error = "Name is required";
  } else if (value.length < 3) {
    error = "Name must be at least 3 characters";
  } else if (!/^[a-zA-Z ]+$/.test(value)) {
    error = "Name must contain only characters";
  }
  return error;
}

export function validatePhone(value: string) {
  let error;
  if (!value) {
    error = "Phone number is required";
  } else if (value.length !== 9) {
    error = "Phone number must be 9 digits";
  } else if (!/^[0-9]+$/.test(value)) {
    error = "Phone number must contain only numbers";
  }
  return error;
}

import { LoginForm } from "./type";

const validateEmail = (email: string) => {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

const validatePassword = (password: string) => {
  return password !== "";
};

const validateLoginForm = (loginForm: LoginForm) => {
  const { username, password } = loginForm;

  if (!validatePassword(password)) {
    return false;
  }

  return validateEmail(username);
};

export default validateLoginForm;

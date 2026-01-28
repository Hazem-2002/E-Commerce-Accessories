import { users } from "./registerForm.js";
import { reRenderCards } from "./main.js";
import { showUserProfileHeader } from "./controlHeader.js";

const loginmodal = document.getElementById("loginmodal");
const loginForm = document.getElementById("loginForm");
const emailLoginForm = document.getElementById("emailLoginForm");
const passwordLoginForm = document.getElementById("passwordLoginForm");

const userLogin = {};
export let isLogin = false;
export let userIndex;

loginmodal.addEventListener("hidden.bs.modal", () => {
  registerForm.reset();

  const inputs = loginForm.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("is-invalid", "is-valid");
  });

  loginForm.classList.remove("was-validated");
  emailLoginForm.value = "";
  passwordLoginForm.value = "";
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userIndex = users.findIndex((c) => c.email === userLogin.email);
  if (userIndex != -1) {
    if (userLogin.password === users[userIndex].password) {
      isLogin = true;
      bootstrap.Modal.getInstance(loginmodal).hide();
      showUserProfileHeader(users[userIndex].name);
      reRenderCards();
    } else {
      passwordLoginForm.classList.add("is-invalid");
    }
  } else {
    emailLoginForm.classList.add("is-invalid");
  }
});

emailLoginForm.addEventListener("input", () => {
  userLogin.email = emailLoginForm.value;
  emailLoginForm.classList.remove("is-invalid");
});

passwordLoginForm.addEventListener("input", () => {
  userLogin.password = passwordLoginForm.value;
  passwordLoginForm.classList.remove("is-invalid");
});

export function logout() {
  isLogin = false;
}

export function getUser() {
  return users[userIndex];
}

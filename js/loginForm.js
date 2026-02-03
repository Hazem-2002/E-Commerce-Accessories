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
let user;

loginmodal.addEventListener("shown.bs.modal", () => {
  loginmodal.querySelector("input").focus();
});

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
  user = JSON.parse(localStorage.getItem(userLogin.email));
  if (user) {
    if (userLogin.password === user.password) {
      isLogin = true;
      bootstrap.Modal.getInstance(loginmodal).hide();
      showUserProfileHeader(user.name);
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
  return user;
}

export function editUser(userAfterEdit) {
  localStorage.removeItem(user.email);
  localStorage.setItem(userAfterEdit.email, JSON.stringify(userAfterEdit));
}

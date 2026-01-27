const registermodal = document.getElementById("registermodal");
const registerForm = document.getElementById("registerForm");
const firstNameRegisterForm = document.getElementById("firstNameRegisterForm");
const lastNameRegisterForm = document.getElementById("lastNameRegisterForm");
const emailRegisterForm = document.getElementById("emailRegisterForm");
const passwordRegisterForm = document.getElementById("passwordRegisterForm");

export const users = [];
let userInfo = {};

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  users.push(Object.assign({}, userInfo, { cart: [] }));
  userInfo = {};
  alert("Account Created Successfully!");
  bootstrap.Modal.getInstance(registermodal).hide();
  new bootstrap.Modal(loginmodal).show();
});

firstNameRegisterForm.addEventListener("input", () => {
  userInfo.name =
    firstNameRegisterForm.value + " " + lastNameRegisterForm.value;
});

lastNameRegisterForm.addEventListener("input", () => {
  userInfo.name =
    firstNameRegisterForm.value + " " + lastNameRegisterForm.value;
});

emailRegisterForm.addEventListener("input", () => {
  userInfo.email = emailRegisterForm.value;

  const isValid = /^\w+@[a-zA-Z]+\.[a-zA-Z]{3}$/.test(emailRegisterForm.value);

  if (isValid) {
    emailRegisterForm.classList.add("is-valid");
    emailRegisterForm.classList.remove("is-invalid");
  } else {
    emailRegisterForm.classList.add("is-invalid");
    emailRegisterForm.classList.remove("is-valid");
  }
});

passwordRegisterForm.addEventListener("input", () => {
  userInfo.password = passwordRegisterForm.value;
});

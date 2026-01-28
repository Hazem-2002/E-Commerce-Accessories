const registermodal = document.getElementById("registermodal");
const registerForm = document.getElementById("registerForm");
const firstNameRegisterForm = document.getElementById("firstNameRegisterForm");
const lastNameRegisterForm = document.getElementById("lastNameRegisterForm");
const emailRegisterForm = document.getElementById("emailRegisterForm");
const passwordRegisterForm = document.getElementById("passwordRegisterForm");

export const users = [];
let userInfo = {};

registermodal.addEventListener("shown.bs.modal", () => {
  registermodal.querySelector("input").focus();
});

registermodal.addEventListener("hidden.bs.modal", () => {
  registerForm.reset();

  const inputs = registerForm.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("is-invalid", "is-valid");
  });

  registerForm.classList.remove("was-validated");
  firstNameRegisterForm.value = "";
  lastNameRegisterForm.value = "";
  emailRegisterForm.value = "";
  passwordRegisterForm.value = "";
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  users.push(Object.assign({}, userInfo, { cart: [] }, { favorite: [] }));
  localStorage.setItem(
    userInfo.email,
    JSON.stringify(Object.assign({}, userInfo, { cart: [] }, { favorite: [] })),
  );
  userInfo = {};
  alert("Account Created Successfully!");
  bootstrap.Modal.getInstance(registermodal).hide();
  new bootstrap.Modal(loginmodal).show();
});

firstNameRegisterForm.addEventListener("input", () => {
  userInfo.name =
    firstNameRegisterForm.value.trim() +
    " " +
    lastNameRegisterForm.value.trim();
  const isValid = /^[a-zA-Z]{3,}$/.test(firstNameRegisterForm.value.trim());
  if (isValid) {
    firstNameRegisterForm.classList.add("is-valid");
    firstNameRegisterForm.classList.remove("is-invalid");
  } else {
    firstNameRegisterForm.classList.add("is-invalid");
    firstNameRegisterForm.classList.remove("is-valid");
  }
});

lastNameRegisterForm.addEventListener("input", () => {
  userInfo.name =
    firstNameRegisterForm.value.trim() +
    " " +
    lastNameRegisterForm.value.trim();
  const isValid = /^[a-zA-Z]{3,}$/.test(lastNameRegisterForm.value.trim());
  if (isValid) {
    lastNameRegisterForm.classList.add("is-valid");
    lastNameRegisterForm.classList.remove("is-invalid");
  } else {
    lastNameRegisterForm.classList.add("is-invalid");
    lastNameRegisterForm.classList.remove("is-valid");
  }
});

emailRegisterForm.addEventListener("input", () => {
  userInfo.email = emailRegisterForm.value.trim();

  const isValid = /^\w+@[a-zA-Z]+\.[a-zA-Z]{3}$/.test(userInfo.email);

  if (isValid) {
    if (!JSON.parse(localStorage.getItem(userInfo.email))) {
      emailRegisterForm.classList.add("is-valid");
      emailRegisterForm.classList.remove("is-invalid");
    } else {
      emailRegisterForm.classList.add("is-invalid");
      emailRegisterForm.classList.remove("is-valid");
      document.getElementById("email-feedback").textContent =
        "Email already exists";
    }
  } else {
    emailRegisterForm.classList.add("is-invalid");
    emailRegisterForm.classList.remove("is-valid");
    document.getElementById("email-feedback").textContent =
      "Email must be in the format: name@example.com";
  }
});

passwordRegisterForm.addEventListener("input", () => {
  userInfo.password = passwordRegisterForm.value.trim();
  const isValid = /^\w{8,}$/.test(userInfo.password);
  if (isValid) {
    passwordRegisterForm.classList.add("is-valid");
    passwordRegisterForm.classList.remove("is-invalid");
  } else {
    passwordRegisterForm.classList.add("is-invalid");
    passwordRegisterForm.classList.remove("is-valid");
  }
});

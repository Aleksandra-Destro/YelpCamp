const regForm = document.querySelector("#regForm");

const firstNameInput = document.querySelector("#first");
const lastNameInput = document.querySelector("#last");
const birthDateInput = document.querySelector("#birthdate");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");

regForm.addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your registration!");
  firstNameInput.value = "";
  lastNameInput.value = "";
  birthDateInput.value = "";
  emailInput.value = "";
  passwordInput.value = "";
});

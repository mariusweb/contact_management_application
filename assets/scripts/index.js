"use strict";

// Fetching data from git reposetory
async function getData() {
  let response = await fetch(
    "https://raw.githubusercontent.com/mariusweb/contact_management_application/master/assets/scripts/contacts.json"
  );
  let data = await response.json();
  return data;
}

// Adding data from JSON file to localstorage
getData().then((data) => {
  localStorage.setItem("users", JSON.stringify(data));
});
let users = JSON.parse(localStorage.getItem("users"));

// Adding input values in to localstorage
const form = document.querySelector("form");
const submitButton = document.querySelector(".submit-button");

const firstNameInput = document.querySelector(".first-name");
const lastNameInput = document.querySelector(".last-name");
const dateOfBirthInput = document.querySelector(".birthdate");
const phoneNumberInput = document.querySelector(".phone-number");
const emailInput = document.querySelector(".e-mail");
const addressInput = document.querySelector(".address");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let user = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    dateOfBirth: dateOfBirthInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
    address: addressInput.value,
  };
  let usersn = [];
  usersn.push(user);
  //   form.reset();
  localStorage.setItem("usersn", JSON.stringify(usersn));
  location.reload();
});

console.log(users);
// localStorage.setItem("users", JSON.stringify(users));

// Adding users to html file
const container = document.querySelector(".container");
let table = document.createElement("table");
table.classList.add("users-list");
container.appendChild(table);

users.map((user) => {
  let tr = document.createElement("tr");
  tr.classList.add("output");

  tr.innerHTML = `
        <td>${user.firstName} ${user.lastName}</td>
        <td>${user.dateOfBirth}</td>
        <td>${user.phoneNumber}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
    `;
  table.appendChild(tr);
});
let usersNew = JSON.parse(localStorage.getItem("usersn"));
usersNew.map((user) => {
  let tr = document.createElement("tr");
  tr.classList.add("output");

  tr.innerHTML = `
          <td>${user.firstName} ${user.lastName}</td>
          <td>${user.dateOfBirth}</td>
          <td>${user.phoneNumber}</td>
          <td>${user.email}</td>
          <td>${user.address}</td>
      `;
  table.appendChild(tr);
});

"use strict";

const form = document.querySelector(".input-form");

let firstNameInput = document.querySelector(".first-name");
let lastNameInput = document.querySelector(".last-name");
let dateOfBirthInput = document.querySelector(".birthdate");
let phoneNumberInput = document.querySelector(".phone-number");
let emailInput = document.querySelector(".e-mail");
let addressInput = document.querySelector(".address");

const container = document.querySelector(".container");

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
  function noop() {}
  data.map((user) => {
    function foo() {
      foo = noop();
      let id = Math.random().toString(16).slice(2);
      user.id = id;
      localStorage.setItem("users", JSON.stringify(data));
    }
    // foo();
  });
});

// Adding input values in to localstorage
const users = JSON.parse(localStorage.getItem("users"));
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let usersNew = JSON.parse(localStorage.getItem("users")) || [];

  let user = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    dateOfBirth: dateOfBirthInput.value,
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
    address: addressInput.value,
    id: Math.random().toString(16).slice(2),
  };
  let userRepite = {
    phoneNumber: phoneNumberInput.value,
    email: emailInput.value,
  };

  if (
    (user.firstName &&
      user.lastName &&
      user.dateOfBirth &&
      user.phoneNumber &&
      user.email &&
      user.address &&
      user.id) ||
    (user.firstName &&
      user.lastName &&
      user.dateOfBirth &&
      user.phoneNumber &&
      user.email &&
      user.id)
  ) {
    usersNew.push(user);
    localStorage.setItem("users", JSON.stringify(usersNew));
  }
  location.reload();
});
const usersUpdate = JSON.parse(localStorage.getItem("users"));
console.log(usersUpdate);

// Adding users to html file

const table = document.createElement("table");
table.classList.add("users-list");
container.appendChild(table);

const addingUser = () => {
  let usersNew = JSON.parse(localStorage.getItem("users"));
  usersNew.map((user) => {
    let tr = document.createElement("tr");
    tr.classList.add("output" + user.id);

    const buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Delete";
    buttonDelete.classList.add("delete" + user.id);

    const buttonEdit = document.createElement("button");
    buttonEdit.innerText = "Edit";
    buttonEdit.classList.add("edit" + user.id);

    tr.innerHTML = `
          
          <td>First name: ${user.firstName}</td>
          <td>Last name: ${user.lastName}</td>
          <td>Date of birth: ${user.dateOfBirth}</td>
          <td>Phone number: ${user.phoneNumber}</td>
          <td>E-mail: ${user.email}</td>
          <td>Address: ${user.address}</td>
          
      `;

    tr.prepend(buttonEdit);
    tr.appendChild(buttonDelete);

    table.appendChild(tr);
  });

  // Deleting user

  usersNew.map((user) => {
    let usersDelete = JSON.parse(localStorage.getItem("users"));
    const deleteButton = document.querySelector(".delete" + user.id);

    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      usersDelete = usersDelete.filter((userDel) => {
        return userDel.id !== user.id;
      });
      localStorage.setItem("users", JSON.stringify(usersDelete));
      location.reload();
    });

    let usersEdit = JSON.parse(localStorage.getItem("users"));
    const buttonEdit = document.querySelector(".edit" + user.id);

    buttonEdit.addEventListener("click", (event) => {
      event.preventDefault();
      // let tabelCell = document.createElement("td");
      // tabelCell.classList.add("tabel-cell" + user.id);

      let editForm = document.createElement("form");
      editForm.classList.add("edit-form" + user.id);
      let output = document.querySelector(".output" + user.id);

      editForm.innerHTML = `
      <input type="submit" value="Save">
        <input type="text" required value="${user.firstName}">
        <input type="text" required value="${user.lastName}">
        <input type="date" required value="${user.dateOfBirth}">
        <input type="tel" required value="${user.phoneNumber}">
        <input type="email" required value="${user.email}">
        <input type="text" value="${user.address}">
      `;
      // tabelCell.innerHTML = `${editForm}`;
      // console.log(tabelCell);
      const clone = editForm.cloneNode(true);

      output.remove();
      container.appendChild(clone);

      // usersEdit.map((userEdit) => {});
      // location.reload();
    });
  });
};
addingUser();

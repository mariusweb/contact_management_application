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
    // Delete user

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

    // Edit user

    const buttonEdit = document.querySelector(".edit" + user.id);

    buttonEdit.addEventListener("click", (event) => {
      event.preventDefault();

      const editForm = document.createElement("form");
      editForm.classList.add("edit-form" + user.id);
      const output = document.querySelector(".output" + user.id);

      const submitEdit = document.createElement("input");
      submitEdit.setAttribute("type", "submit");
      submitEdit.setAttribute("value", "Save");

      editForm.innerHTML = `
        <input class="edit-fname" type="text" required value="${user.firstName}">
        <input class="edit-lname" type="text" required value="${user.lastName}">
        <input class="edit-date" type="date" required value="${user.dateOfBirth}">
        <input class="edit-tel" type="tel" required value="${user.phoneNumber}">
        <input class="edit-email" type="email" required value="${user.email}">
        <input class="edit-address" type="text" value="${user.address}">
      `;

      editForm.prepend(submitEdit);
      // const clone = editForm.cloneNode(true);

      output.remove();
      container.appendChild(editForm);

      // location.reload();
      let saveEditForm = document.querySelector(".edit-form" + user.id);

      saveEditForm.addEventListener("submit", (event) => {
        event.preventDefault();

        let editFirstNameInput = document.querySelector(".edit-fname");
        let editLastNameInput = document.querySelector(".edit-lname");
        let editDateOfBirthInput = document.querySelector(".edit-date");
        let editPhoneNumberInput = document.querySelector(".edit-tel");
        let editEmailInput = document.querySelector(".edit-email");
        let editAddressInput = document.querySelector(".edit-address");

        let usersEdit = JSON.parse(localStorage.getItem("users"));

        let editUsers = [
          {
            firstName: editFirstNameInput.value,
            lastName: editLastNameInput.value,
            dateOfBirth: editDateOfBirthInput.value,
            phoneNumber: editPhoneNumberInput.value,
            email: editEmailInput.value,
            address: editAddressInput.value,
            id: user.id,
          },
        ];
        const result = usersEdit.map((userEdit) => {
          const newUserEdit = editUsers.find(
            (editUser) => editUser.id === userEdit.id
          );
          return newUserEdit ? newUserEdit : userEdit;
        });

        console.log(result);
        localStorage.setItem("users", JSON.stringify(result));
        editForm.remove();
        container.appendChild(output);
        location.reload();
      });
    });
  });
};
addingUser();

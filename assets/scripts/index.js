"use strict";

// Calling form attribute from html
const form = document.querySelector(".input-form");

// Calling attributes from html form attribute
let firstNameInput = document.querySelector(".first-name");
let lastNameInput = document.querySelector(".last-name");
let dateOfBirthInput = document.querySelector(".birthdate");
let phoneNumberInput = document.querySelector(".phone-number");
let emailInput = document.querySelector(".e-mail");
let addressInput = document.querySelector(".address");

// Calling div container attribute from html
const container = document.querySelector(".container");

// Fetching data from git reposetory
async function getData() {
  let response = await fetch(
    "https://raw.githubusercontent.com/mariusweb/contact_management_application/master/assets/scripts/contacts.json"
  );
  let data = await response.json();
  return data;
}

// Adding reset button
const resetData = document.createElement("button");
resetData.classList.add("reset-button");
resetData.innerText = "Reset";

// Adding data from JSON file to localstorage
container.appendChild(resetData);
getData().then((data) => {
  function noop() {}
  data.map((user) => {
    function foo() {
      foo = noop();

      // Creating unique id
      let id = Math.random().toString(16).slice(2);
      user.id = id;
      localStorage.setItem("users", JSON.stringify(data));
    }

    // Resetting storing data to localStorage
    resetData.addEventListener("click", (e) => {
      e.preventDefault();
      foo();
      location.reload();
    });
  });
});

const CheckUserRegex = class {
  constructor(user) {
    this.user = user;
    this.firsName = new RegExp("^\\D{1,26}$");
    this.lastName = new RegExp("^\\D{2,35}$");
    this.dateOfBirth = new RegExp(
      "^(19\\d{2}|20[0-1]\\d|2020)\\-(0\\d|1[0-2])\\-([0-2]\\d|3[0-1])$"
    );
    this.phoneNumber = new RegExp(
      "^(\\+370|[(]?8)?(\\s~)?[\\s]?[5-9][)]?[\\s]?\\d{3}[\\s]?\\d{4}$"
    );
    this.emailAddress = new RegExp("^\\S+@[a-z]+[.][a-z]+$");
    this.address = new RegExp(
      "^(\\D{1,85}(\\s\\D{1,85}\\s\\D{1,2}[.])?(\\s\\d{1,4})?(\\-\\d{1,4})?)$|^(?:)$"
    );
  }
  checkFirstName() {
    return this.firsName.test(this.user.firstName);
  }
  checkLastName() {
    return this.lastName.test(this.user.lastName);
  }
  checkDateOfBirth() {
    return this.dateOfBirth.test(this.user.dateOfBirth);
  }
  checkPhoneNumber() {
    return this.phoneNumber.test(this.user.phoneNumber);
  }
  checkEmailAddress() {
    return this.emailAddress.test(this.user.email);
  }
  checkAddress() {
    return this.address.test(this.user.address);
  }
};

// Adding input values in to localstorage and printing to html
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

    // Creating unique id
    id: Math.random().toString(16).slice(2),
  };

  // Getting user or users that already has value which was printed in inputs
  const isNotUnique = usersNew.filter((userNew) => {
    return (
      userNew.email === user.email || userNew.phoneNumber === user.phoneNumber
    );
  });

  // Function that shows which value repeats
  const alertEmailPhone = (isNot) => {
    let dom = isNot.map((emailPhone) => {
      if (emailPhone.email === user.email) {
        return "email";
      } else if (emailPhone.phoneNumber === user.phoneNumber) {
        return "phone";
      } else if (
        emailPhone.phoneNumber === user.phoneNumber &&
        emailPhone.email === user.email
      ) {
        return "email", "phone";
      }
    });
    return dom;
  };

  const testUser = new CheckUserRegex(user);
  console.log(testUser.checkFirstName());

  // Checking that inputs have values,
  //  making sure email and phone nuber is not repeating
  //  and alerting that is repeating
  if (
    testUser.checkFirstName() &&
    testUser.checkLastName() &&
    testUser.checkDateOfBirth() &&
    testUser.checkPhoneNumber() &&
    testUser.checkEmailAddress() &&
    testUser.checkAddress() &&
    user.id &&
    isNotUnique.length <= 0
  ) {
    usersNew.push(user);
    localStorage.setItem("users", JSON.stringify(usersNew));
    location.reload();
  } else if (alertEmailPhone(isNotUnique) === "email") {
    alert("This email already exist!");
  } else if (alertEmailPhone(isNotUnique) === "phone") {
    alert("This phone number already exist!");
  } else if (
    alertEmailPhone(isNotUnique) === ["email", "phone"] ||
    alertEmailPhone(isNotUnique) === ["phone", "email"]
  ) {
    alert("This email and phone number already exist!");
  } else if (!testUser.checkFirstName()) {
    alert("First name is invalid");
  } else if (!testUser.checkLastName()) {
    alert("Last name is invalid");
  } else if (!testUser.checkDateOfBirth()) {
    alert("Date of Birth is invalid");
  } else if (!testUser.checkPhoneNumber()) {
    alert("This Phone number must be Lithuanian");
  } else if (!testUser.checkEmailAddress()) {
    alert("This Email address is invalid");
  } else if (!testUser.checkAddress()) {
    alert("This Address is invalid");
  }
});

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (clientHeight + scrollTop >= scrollHeight - 1) {
    addingUser(1);
  }
});

// Creating a table attribute for users
const table = document.createElement("table");
table.classList.add("users-list");
container.appendChild(table);

// Add, Edit, Delete, user
const addingUser = (range) => {
  let usersNew = JSON.parse(localStorage.getItem("users"));

  // Adding users to html
  console.log(usersNew);
  usersNew.map((user) => {
    // Created row <tr> in a table attribute with unique class
    for (let i = 0; i < range; i++) {
      let tr = document.createElement("tr");
      tr.classList.add("output" + user.id);

      // Created a delete button for deleting user
      const buttonDelete = document.createElement("button");
      buttonDelete.innerText = "Delete";
      buttonDelete.classList.add("delete" + user.id);

      // Created a edit button for editing user
      const buttonEdit = document.createElement("button");
      buttonEdit.innerText = "Edit";
      buttonEdit.classList.add("edit" + user.id);

      // Adding users to table
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
      table.prepend(tr);
    }
  });

  // Editing and Deleting user
  usersNew.map((user) => {
    // Selecting clicked delete button
    const deleteButton = document.querySelector(".delete" + user.id);

    // Delete user
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      usersNew = usersNew.filter((userDel) => {
        return userDel.id !== user.id;
      });
      localStorage.setItem("users", JSON.stringify(usersNew));
      location.reload();
    });

    // Selecting clicked edit button
    const buttonEdit = document.querySelector(".edit" + user.id);

    // Edit user
    buttonEdit.addEventListener("click", (event) => {
      event.preventDefault();

      // Created form for edit
      const editForm = document.createElement("form");
      editForm.classList.add("edit-form" + user.id);
      const output = document.querySelector(".output" + user.id);

      // Added Save button to edit form
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
      output.remove();
      container.appendChild(editForm);

      // Saving edited form
      // Selecting form that was clicked
      let saveEditForm = document.querySelector(".edit-form" + user.id);
      saveEditForm.addEventListener("submit", (event) => {
        event.preventDefault();

        // Selecting inputs from edit form
        let editFirstNameInput = document.querySelector(".edit-fname");
        let editLastNameInput = document.querySelector(".edit-lname");
        let editDateOfBirthInput = document.querySelector(".edit-date");
        let editPhoneNumberInput = document.querySelector(".edit-tel");
        let editEmailInput = document.querySelector(".edit-email");
        let editAddressInput = document.querySelector(".edit-address");
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

        // Getting all users with edited one
        const result = usersNew.map((userEdit) => {
          const newUserEdit = editUsers.find(
            (editUser) => editUser.id === userEdit.id
          );
          return newUserEdit ? newUserEdit : userEdit;
        });

        // Getting all users exept edited one
        const notEditedUsers = usersNew.filter((userEdit) => {
          const newUserEdit = editUsers.find(
            (editUser) => editUser.id !== userEdit.id
          );
          return newUserEdit;
        });

        // Getting user that has same value as edited one
        const notRepeat = notEditedUsers.filter(
          (checkUser) =>
            checkUser.email === editUsers[0].email ||
            checkUser.phoneNumber === editUsers[0].phoneNumber
        );

        // Function that shows which value repeats
        const alertEmailPhoneEdit = (isNot) => {
          let dom = isNot.map((emailPhone) => {
            if (emailPhone.email === editUsers[0].email) {
              return "email";
            } else if (emailPhone.phoneNumber === editUsers[0].phoneNumber) {
              return "phone";
            } else if (
              emailPhone.phoneNumber === editUsers[0].phoneNumber &&
              emailPhone.email === editUsers[0].email
            ) {
              return "email", "phone";
            }
          });
          return dom;
        };

        const testUserEdit = new CheckUserRegex(editUsers[0]);

        // Printing out edited vesion or alertin for email or phone number repite
        if (
          testUserEdit.checkFirstName() &&
          testUserEdit.checkLastName() &&
          testUserEdit.checkDateOfBirth() &&
          testUserEdit.checkPhoneNumber() &&
          testUserEdit.checkEmailAddress() &&
          testUserEdit.checkAddress() &&
          notRepeat.length <= 0
        ) {
          localStorage.setItem("users", JSON.stringify(result));
          editForm.remove();
          container.appendChild(output);
          location.reload();
        } else if (alertEmailPhoneEdit(notRepeat) === "email") {
          alert("This email already exist!");
        } else if (alertEmailPhoneEdit(notRepeat) === "phone") {
          alert("This phone number already exist!");
        } else if (
          alertEmailPhoneEdit(notRepeat) === ["email", "phone"] ||
          alertEmailPhoneEdit(notRepeat) === ["phone", "email"]
        ) {
          alert("This email and phone number already exist!");
        } else if (!testUserEdit.checkFirstName()) {
          alert("First name is invalid");
        } else if (!testUserEdit.checkLastName()) {
          alert("Last name is invalid");
        } else if (!testUserEdit.checkDateOfBirth()) {
          alert("Date of Birth is invalid");
        } else if (!testUserEdit.checkPhoneNumber()) {
          alert("This Phone number must be Lithuanian");
        } else if (!testUserEdit.checkEmailAddress()) {
          alert("This Email address is invalid");
        } else if (!testUserEdit.checkAddress()) {
          alert("This Address is invalid");
        }
      });
    });
  });
};
addingUser(1);

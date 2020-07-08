"use strict";

const myInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  cache: "default",
};

let myRequest = new Request("./contacts.json", myInit);

async function getData() {
  let response = await fetch(myRequest);
  let data = await response.json();
  console.log(data);
  return data;
}

// getData().then((data) => {
//   console.log(data);
// });

getData();

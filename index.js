const nameInp = document.getElementById("nameInp");
const emailInp = document.getElementById("emailInp");
const mobileInp = document.getElementById("mobileInp");
const passInp = document.getElementById("passInp");
const addUser = document.getElementById("addUser");

const tbody = document.getElementById("tbody");

let userData = JSON.parse(localStorage.getItem("userData")) || [];
let editIndex = null;


showUserData(userData);


addUser.addEventListener("click", addUserDetails);

function addUserDetails() {
  if (editIndex !== null) {
    userData[editIndex].name = nameInp.value;
    userData[editIndex].email = emailInp.value;
    userData[editIndex].mobile = mobileInp.value;
    userData[editIndex].pass = passInp.value;
    localStorage.setItem("userData", JSON.stringify(userData));
    showUserData(userData);
    return;
  }

  let data = {
    name: nameInp.value,
    email: emailInp.value,
    mobile: mobileInp.value,
    pass: passInp.value,
  };
  userData.push(data);
  localStorage.setItem("userData", JSON.stringify(userData));
  showUserData(userData);
}

function showUserData(userData) {
  tbody.innerHTML = ""; // refresh ka kaam
  userData.map(function (user, ind) {
    const tr = document.createElement("tr");
    const nameTd = document.createElement("td");
    const emailTd = document.createElement("td");
    const mobileTd = document.createElement("td");
    const passTd = document.createElement("td");
    const actionTd = document.createElement("td");
    const EditBtnTd = document.createElement("button");
    const deleteBtnTd = document.createElement("button");
    nameTd.textContent = user.name;
    emailTd.textContent = user.email;
    mobileTd.textContent = user.mobile;
    passTd.textContent = user.pass;
    EditBtnTd.textContent = "Edit";
    deleteBtnTd.textContent = "Delete";
    tbody.append(tr);
    actionTd.append(EditBtnTd, deleteBtnTd);
    tr.append(nameTd, emailTd, mobileTd, passTd, actionTd);

    EditBtnTd.addEventListener("click", function () {
      editUser(ind);
    });
    deleteBtnTd.addEventListener("click", function () {
      deleteUser(ind);
    });
  });
}

function editUser(ind) {
  nameInp.value = userData[ind].name;
  emailInp.value = userData[ind].email;
  mobileInp.value = userData[ind].mobile;
  passInp.value = userData[ind].pass;
  editIndex = ind; // number
  nameInp.focus();
}

function deleteUser(ind) {
  userData.splice(ind, 1);
  console.log(userData);
  showUserData(userData);
}

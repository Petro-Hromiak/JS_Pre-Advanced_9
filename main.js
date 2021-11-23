const getID = (i) => document.getElementById(i);
let userData = {};
let tableContent = [];
let userIndex;
function addNewUser() {
    userData = {
        login: getID(`login`).value,
        password: getID(`password`).value,
        email: getID(`email`).value
    };
    if (document.forms['form'].reportValidity()) {
        tableContent.push(userData);
        getID(`form`).reset();
        render();
    }
}
function render() {
    document.querySelector(`.table tbody`).innerHTML = ``;
    let parentTable = document.querySelector(`.table tbody`);
    tableContent.forEach((elem, index) => {
        const newRow = parentTable.insertRow(-1);
        newRow.insertCell(0).appendChild(document.createTextNode(index));
        newRow.insertCell(1).appendChild(document.createTextNode(elem.login));
        newRow.insertCell(2).appendChild(document.createTextNode(elem.password));
        newRow.insertCell(3).appendChild(document.createTextNode(elem.email));
        const editButton = document.createElement(`button`);
        editButton.textContent = `Edit`;
        editButton.onclick = function () { editTableRow(index); };
        newRow.insertCell(4).appendChild(editButton).classList.add(`editButton`);
        const deleteButton = document.createElement(`button`);
        deleteButton.textContent = `Delete`;
        deleteButton.onclick = function () { deleteTableRow(index); };
        newRow.insertCell(5).appendChild(deleteButton).classList.add(`deleteButton`);
    });
}
function editTableRow(index) {
    getID(`login`).value = tableContent[index].login;
    getID(`password`).value = tableContent[index].password;
    getID(`email`).value = tableContent[index].email;
    userIndex = index;
    getID(`addUser`).classList.add(`hide`);
    getID(`editUser`).classList.remove(`hide`);
}
function deleteTableRow(index) {
    tableContent = tableContent.filter((elem, indexRow) => indexRow !== index);
    render();
}
function saveEditUser() {
    event.preventDefault();
    userData = {
        login: getID(`login`).value,
        password: getID(`password`).value,
        email: getID(`email`).value
    };
    tableContent[userIndex] = userData;
    render();
    getID(`form`).reset();
    getID(`addUser`).classList.remove(`hide`);
    getID(`editUser`).classList.add(`hide`);
    userIndex = null;
}

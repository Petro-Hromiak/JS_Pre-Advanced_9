
const getID: any = (i: string) => document.getElementById(i);


let userData = {};
let tableContent: Array<any> = [];
let userIndex: number;

function addNewUser() {
    userData = {
        login: getID(`login`).value,
        password: getID(`password`).value,
        email: getID(`email`).value
    }
    if (document.forms['form'].reportValidity()) {
        tableContent.push(userData)
        getID(`form`).reset()
        render()
    }
}


function render() {
    document.querySelector(`.table tbody`).innerHTML = ``

    let parentTable = document.querySelector(`.table tbody`) as HTMLTableElement
    tableContent.forEach((elem: HTMLFormElement, index: number) => {

        const newRow: HTMLTableRowElement = parentTable.insertRow(-1)

        newRow.insertCell(0).appendChild(document.createTextNode((index + 1) + ''))
        newRow.insertCell(1).appendChild(document.createTextNode(elem.login))
        newRow.insertCell(2).appendChild(document.createTextNode(elem.password))
        newRow.insertCell(3).appendChild(document.createTextNode(elem.email))

        const editButton: HTMLButtonElement = document.createElement(`button`);
        editButton.textContent = `Edit`
        editButton.onclick = function () { editTableRow(index); };
        newRow.insertCell(4).appendChild(editButton).classList.add(`editButton`)

        const deleteButton: HTMLButtonElement = document.createElement(`button`);
        deleteButton.textContent = `Delete`
        deleteButton.onclick = function () { deleteTableRow(index); };
        newRow.insertCell(5).appendChild(deleteButton).classList.add(`deleteButton`)
    })
}

function editTableRow(index: number) {
    getID(`login`).value = tableContent[index].login
    getID(`password`).value = tableContent[index].password
    getID(`email`).value = tableContent[index].email
    userIndex = index
    getID(`addUser`).classList.add(`hide`)
    getID(`editUser`).classList.remove(`hide`)
}

function deleteTableRow(index: number) {
    tableContent = tableContent.filter((elem, indexRow) => indexRow !== index)
    render()
}

function saveEditUser() {
    event.preventDefault()
    userData = {
        login: getID(`login`).value,
        password: getID(`password`).value,
        email: getID(`email`).value
    }
    tableContent[userIndex] = userData;
    render()
    getID(`form`).reset()
    getID(`addUser`).classList.remove(`hide`)
    getID(`editUser`).classList.add(`hide`)
    userIndex = null;
}

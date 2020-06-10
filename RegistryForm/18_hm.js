class Controller {
	constructor(model, view, view2) {
		this.model = model;
		this.view = view;
		this.view2 = view2;
	}

	handleAddUser(name, surname, age) {
		this.model.addUser(name, surname, age);
	}

	handleShowUserArray() {
		this.view.showUserArray();
	}

	handleEditUserArray(userIndex){
		this.view.editUserArray(userIndex);
	}
}

class Model {
	constructor() {}

	addUser(name, surname, age) {
		let user = new Object; 
		let calculate = sessionStorage.length;

		user.name = name;
		user.surname = surname;
		user.age = age;
		
		let jsonObj = JSON.stringify(user);
		sessionStorage.setItem(calculate, jsonObj);
		this.clearInput();
	}

	changeUser(e) {
		let element = e.target;
		let editBySurname = element.previousSibling.innerText;
		let userIndex;
		for (let i = 0; i < sessionStorage.length; i++) {
			let item = JSON.parse(sessionStorage.getItem(i));
			if (item.surname === editBySurname) {
				userIndex = i;
			}
		}
		controller.handleEditUserArray(userIndex);
	}

	changeUserArray(userIndex ,massiveArguments) {
		let item = JSON.parse(sessionStorage.getItem(userIndex));
		let user = new Object;
		let keysArray = ["name", "surname", "age"];

		for (let i = 0; i < massiveArguments.length; i++) {

			if (massiveArguments[i] === "") {

				user[keysArray[i]] = item[keysArray[i]];
			} else {

				user[keysArray[i]] = massiveArguments[i];
			}
		}

		sessionStorage.removeItem(userIndex);
		let jsonObj = JSON.stringify(user);
		sessionStorage.setItem(userIndex, jsonObj);
		controller.handleShowUserArray();
	}

	deleteUser(e) { // Delete user
		let element = e.target;
		let delsurname = element.previousSibling.previousSibling.innerText;

		for (let i = 0; i < sessionStorage.length; i++) {
			let item = JSON.parse(sessionStorage.getItem(i));
			if (item.surname === delsurname) {
				sessionStorage.removeItem(i);
			}
		}

		element.parentNode.remove();
	}

	clearInput() { // Clear Inputs
		let input = document.querySelectorAll(".input");
		input.forEach(item => item.value = "");
	}

}

class ShowExtraPages {
	constructor() {}

	showUserArray() {
		let div1 = document.createElement("div");
		let form = document.createElement("form");
		let fieldset = document.createElement("fieldset");

		document.body.innerHTML = "<div><input type='button' id='back' value='BACK'/></div> ";
		let backButton = document.querySelector('#back');
		backButton.addEventListener('click', controller.view2.startForm);
			document.body.prepend(div1);
			div1.append(form);
			form.append(fieldset);
			for (let i = 0; i < sessionStorage.length; i++) {
				let item = JSON.parse(sessionStorage.getItem(i));
				fieldset.insertAdjacentHTML('afterbegin', "<div><span>" + item.surname + "</span><button class='change'>Edit</button><button class='delete'>X</button></div>");
			}
			let editButton = document.querySelectorAll(".change");
			let buttonDelete = document.querySelectorAll(".delete");
			buttonDelete.forEach(function(item){
				item.addEventListener('click', controller.model.deleteUser, true);
			});
			editButton.forEach(function(item){
				item.addEventListener('click', controller.model.changeUser, true);
			});
	}
	
	editUserArray(userIndex){
		document.body.innerHTML = ` 
			<div>
			<form action="">
				<fieldset>
				<legend>Edit Member</legend>
					<p>Name: <input type="text" id="nameInput" class="input"/></p>
					<p>Surname: <input type="text" id="surnameInput" class="input" /></p>
					<p>Age: <input type="text" id="ageInput" class="input"/></p>
					<input  type="button" id="ready" value="READY"/>
				</fieldset>
			</form>
			</div>
			`
			let name = document.querySelector('#nameInput');
			let surname = document.querySelector('#surnameInput');
			let age = document.querySelector('#ageInput');
			const buttonReady = document.querySelector('#ready');
			buttonReady.onclick = function() {
				let massiveArguments = [name.value, surname.value, age.value];
				controller.model.changeUserArray(userIndex, massiveArguments);
			}

	}
}

class ShowHomePage {
	constructor() {}

	startForm() {
		document.body.innerHTML = ` 
			<div>
			<form action="">
				<fieldset>
				<legend>Add Member</legend>
					<p>Name: <input type="text" id="nameInput" class="input"/></p>
					<p>Surname: <input type="text" id="surnameInput" class="input" /></p>
					<p>Age: <input type="text" id="ageInput" class="input"/></p>
					<input  type="button" id="addto" value="ADD"/>
					<input type="button" id="showto" value="SHOW"/>
				</fieldset>
			</form>
			</div>
			`

			let name = document.querySelector('#nameInput');
			let surname = document.querySelector('#surnameInput');
			let age = document.querySelector('#ageInput');
			const buttonAdd = document.querySelector("#addto");
			const buttonShow = document.querySelector("#showto");
			buttonAdd.onclick = function() {
				controller.handleAddUser(name.value, surname.value, age.value);
			}

			buttonShow.onclick = function() {
				controller.handleShowUserArray();
			}
	}
}

const view2 = new ShowHomePage();
const view = new ShowExtraPages();
const model = new Model();
const controller = new Controller(model, view, view2);
controller.view2.startForm();
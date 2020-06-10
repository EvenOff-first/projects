const button = document.querySelector('#button');
const input = document.querySelector('#input');

class EventObserver {
	constructor() {
		this.observers = [];
	}

	subscribe(func) {
		this.observers.push(func);
	}

	unsubscribe(func) {
		this.observers = this.observers.filter((subscriber) => subscriber !== func);
	}

	broadcast(data) {
		this.observers.forEach(subscriber => subscriber(data));
	}
}

const observer = new EventObserver();

button.addEventListener('click', () => {
	const div = document.createElement('div');
	observer.subscribe(data => {
		div.innerHTML = data;
	});
	button.insertAdjacentElement('afterEnd', div);
});

input.addEventListener('keyup', () => {
	let data = input.value;
	observer.broadcast(data);
});
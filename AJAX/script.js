const button = document.querySelector('button');
const div = document.querySelector('div');
const select = document.querySelector('#moneyRate');
const option = document.querySelectorAll('option');

let loadData = () => {
	let xhttp = new XMLHttpRequest();
	
	xhttp.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', true);
	xhttp.send();
	
	xhttp.addEventListener('readystatechange', () =>{
		if (xhttp.status === 200 && xhttp.readyState === 4) {
			let json = JSON.parse(xhttp.response);

			function checkCurrency(elementValue) {
				json.forEach(item => {
					if (item.ccy === elementValue) {
						let buy = Number(item.buy).toFixed(2);
						let sale = Number(item.sale).toFixed(2);

						div.innerHTML = ` 
							<table>
							<tr>
							<td>Название валюты</td>
							<td>курс покупки</td>
							<td>курс продажи</td>
							</tr>
							<tr>
							<td>${item.ccy}</td>
							<td>${buy}</td>
							<td>${sale}</td>
							</tr>
							</table>
						`;
					}
				})

			}
			option.forEach(item => addEventListener('click', function(e) {
				let element = e.target;
				let elementValue = element.value;
				checkCurrency(elementValue);	
			}));
			
		}
	})
}
 
select.addEventListener('change', loadData);
var database = firebase.database();

/**
 * Função para gravar lead no banco de dados
 *
 * @param {string} name, {string} email, {date} date, {string} ip, {string} type
 */
function saveLeads(name, email, date, ip, type) {

	var ref = database.ref('leads');
	var saveNewLead = ref.push();
	saveNewLead.set({
		name: name,
		email: email,
		currentDate: date,
		ip: ip,
		type: type
	});
}

/**
 * Função para enviar os dados para o Firebase
 *
 */
form = document.getElementById('form-leads');
var btnpdf = document.getElementById('pdf-download');
form.addEventListener('submit', function(e) {
	e.preventDefault();
	var name = form.querySelector('[name="name"]').value,
	email = form.querySelector('[name="email"]').value,
	ip = form.querySelector('[name="ip"]').value,
	type = '',
	date = new Date().toLocaleString();

	var reg = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)([\w-]+\.)+[\w-]{2,4})?$/;
	if (reg.test(email)){
		type = 'b2b';
	} else {
		type = 'b2c'
	}

	saveLeads(name, email, date, ip, type);

	btnpdf.innerHTML= "<a href='assets/download/Tudo-sobre-gestão.pdf' download><p style='font-size: 16px;'><img src='assets/img/downloadoff.png' alt='' style='width: 50px; vertical-align: middle; margin-right: 10px;'/> <br>Baixe seu e-book</p></a>";

	form.parentNode.parentNode.classList.add('obrigado');



})
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
 	date = new Date().toLocaleString(),
 	formulario = form.querySelector('[name="nome-formulario"]').value;

 	var reg = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)(?!yahoo.co.in)(?!aol.com)(?!abc.com)(?!xyz.com)(?!pqr.com)(?!rediffmail.com)(?!live.com)(?!outlook.com)(?!me.com)(?!msn.com)(?!ymail.com)([\w-]+\.)+[\w-]{2,4})?$/;
 	if (reg.test(email)){
 		type = 'b2b';
 	} else {
 		type = 'b2c'
 	}

 	saveLeads(name, email, date, ip, type);

 	if(formulario === 'leads') {
 		btnpdf.innerHTML= "<a href='assets/download/Ebook-TudoSobreGestao.pdf' download><p style='font-size: 16px;'><img src='assets/img/downloadoff.png' alt='' style='width: 50px; vertical-align: middle; margin-right: 10px;'/> <br>Baixe seu e-book</p></a>";
 	}

 	form.parentNode.parentNode.classList.add('obrigado');
 	form.style.display = 'none';
 })

 $('.anchor').click(function(e) {
 	var page = $(this).attr('href').replace('#', '/#/')
		// window.history.pushState("object or string", "Title", page); 
		// window.history.replaceState("object or string", "Title", page);
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 800);
				return false;
			}
		}
	});

 $('.btn-mobile').click(function() {
 	$(this).toggleClass('active');
 	$(this).parent().find('nav').toggleClass('active');
 });

 $('header .anchor').click(function() {
 	var width = $(window).witdh();
 	if(width < 768) {
	 	$('.btn-mobile').removeClass('active');
	 	$('nav').removeClass('active');	
 	}
});


var share_options = {
	url: window.location,
	title: document.title,
	width: 500,
	height: 450,
	target: 'newwindow',
	link: ''
}

/**
 * Função para compartilhar notícias
 *
 * @param {string} social
 * @return url rede social com título da página dinâmicos
 */
function share(social) {
	switch (social) {
		case 'facebook':
			share_options.link = "http://www.facebook.com/share.php?u="+share_options.url+"&amp;t="+share_options.title+"'";
		break;
		case 'twitter':
			share_options.link = "http://twitter.com/share?text="+share_options.title+"&url="+share_options.url;
			// share_options.link = "http://twitter.com/share?text="+share_options.title+"&amp;url="+share_options.url+"'";
		break;
		case 'pinterest':
			share_options.link = "http://pinterest.com/pin/create/button/?url="+share_options.url+"&amp;description="+share_options.title+"'";
		break;
		default:
			share_options.link = "https://api.whatsapp.com/send?text="+share_options.url+" - " + share_options.title;
			share_options.target = '_blank';
			share_options.width = 768;
			share_options.height = 500;
	}
	window.open(share_options.link, share_options.target , 'width='+share_options.width+',height='+share_options.height+'');
	return false;
}

$('.link-share').on('click', function(e) {
	e.preventDefault();
	var social = $(this).attr('data-social');

	share(social);
});
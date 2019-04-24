var database = firebase.database();

/**
 * Função para exportar os leads em csv
 *
 */
var database = firebase.database();
var table = document.getElementById('leads-table');
var tbody = table.querySelector('tbody');
var totalRows = document.getElementById('total-rows');
var leads;
function getData() {
	database.ref('/leads').on('value', function(snapshot) {
		leads = Object.entries(Object.assign({}, snapshot.val()));
		leads.map(function(lead) {
			lead = lead[1];
			$('#leads-table').find('tbody').append(''+
				'<tr>'+
					'<td>'+ lead.name +'</td>'+
					'<td>'+ lead.email +'</td>'+
					'<td>'+ lead.ip +'</td>'+
					'<td>'+ lead.currentDate +'</td>'+
					'<td>'+ lead.type +'</td>'+
				'</tr>'+
			'');
		});
		var totalB2b = leads.filter(function(lead) {
			return lead[1].type == 'b2b'
		});
		b2b = totalB2b.length;
		b2c = leads.length - totalB2b.length;
		totalRows.innerHTML = 'Total: ' + leads.length + ' registro(s)<br/><strong>Total B2B:</strong> '+ b2b +'<br /><strong>Total B2C:</strong> '+ b2c;
		$('#leads-table').DataTable();
	});

};

getData();

exportLeads = document.getElementById('export-leads');
exportEmails = document.getElementById('export-emails');
exportLeads.addEventListener('click', function(e) {
	e.preventDefault();
	exportToCsv('leads', 'leads', leads);
});

exportEmails.addEventListener('click', function(e) {
	e.preventDefault();
	exportToCsv('emails', 'emails', leads);
});

/**
 * Função para exportar os leads em csv
 *
 * @param {string} type, {string} filename, {array} rows
 * @return filename.csv
 */
function exportToCsv(type, filename, rows) {
	var processRow = function (row) {
		var finalVal = [];
		if(type === 'emails') {
			finalVal = [
				row.name,
				row.email
			];
		} else {
			finalVal = [
				row.email,
				row.name,
				row.ip,
				row.type,
				dateFormat(row.currentDate)
			];
		}
		return finalVal + '\n';
	};

	var csvFile = '';
	for (var i = 0; i < rows.length; i++) {
		csvFile += processRow(rows[i][1]);
	}

	var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
	if (navigator.msSaveBlob) {
		navigator.msSaveBlob(blob, filename);
	} else {
		var link = document.createElement("a");
		if (link.download !== undefined) {
			var url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", filename);
			link.style.visibility = 'hidden';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}
}

/**
 * Função para exportar os leads em csv
 *
 * @param {string} dateString
 * @return 00-00-0000 00:00:00
 */
function dateFormat(dateString){

	if (typeof dateString !== "string")
		return dateString;

	return dateString.replace(/(\d{2})\/(\d{2})\/(\d{4})(.*)/g, (str, d, m, Y, hour) => {
		return `${Y}-${m}-${d}${hour}`;
	});

}
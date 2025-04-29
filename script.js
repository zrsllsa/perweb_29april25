$(document).ready(function () {
	let mhs;
	let j = 0;
  
	$.ajax({
	  url: 'data.xml',
	  dataType: 'xml',
	  success: function (res) {
		let i = 0;
		mhs = $(res).find('mhs');
  
		mhs.each(function () {
		  const m = getMhs(i);
		  $('tbody').append(`<tr><td>${++i}</td><td>${m.nim}</td><td>${m.nama}</td></tr>`);
		});
  
		if (mhs.length === 0) {
		  $('tbody').append('<tr><td colspan="3" class="text-center">Tidak ada data</td></tr>');
		}
  
		if (mhs.length < 2) {
		  $('#next').prop('disabled', true);
		}
  
		// Tampilkan data pertama
		getMhs(0);
	  }
	});
  
	function getMhs(i) {
	  const nim = $(mhs[i]).children('nim').text();
	  const nama = $(mhs[i]).children('nama').text();
	  const foto = $(mhs[i]).children('foto').text();
  
	  $('#nim').val(nim);
	  $('#nama').val(nama);
	  $('#foto').attr('src', 'images/' + foto);
  
	  return { nim, nama, foto };
	}
  
	$('#next').click(function () {
	  if (j < mhs.length - 1) {
		j++;
		getMhs(j);
		$('#prev').prop('disabled', false);
	  }
	  if (j === mhs.length - 1) {
		$('#next').prop('disabled', true);
	  }
	});
  
	$('#prev').click(function () {
	  if (j > 0) {
		j--;
		getMhs(j);
		$('#next').prop('disabled', false);
	  }
	  if (j === 0) {
		$('#prev').prop('disabled', true);
	  }
	});
  });
  
var options = JSON.parse(decodeURIComponent(location.hash.slice(1)));

var telInput = document.getElementById('tel');
telInput.value = options.callNumber;
telInput.addEventListener('input',function(evt){
	options.callNumber = telInput.value;
});

document.getElementById('save')
  .addEventListener('click', function (evt) {
    document.getElementById('yo').textContent+=' yo ho ho';
	  document.location = 'pebblejs://close#' +
		  encodeURIComponent(JSON.stringify(options));
});

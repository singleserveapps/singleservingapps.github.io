(function () {
	loadOptions();
	submitHandler();
})();

function submitHandler() {
	var $submitButton = $('#submitButton');

	$submitButton.on('click', function() {
		console.log('Submit');

		var return_to = getQueryParam('return_to', 'pebblejs://close#');
		document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
	});
}

function loadOptions() {
	var $backgroundColorPicker = $('#backgroundColorPicker');
	var $textColorPicker = $('#textColorPicker');
	var $weatherFrequencySlider = $('#weatherFrequencySlider');
	var $useCelsius = $('#useCelsius');
	var $displayPrefix = $('#displayPrefix');

	if (localStorage.backgroundColor) {
		$backgroundColorPicker[0].value = localStorage.backgroundColor;
		$textColorPicker[0].value = localStorage.textColor;
		$weatherFrequencySlider.value = localStorage.weatherFrequency;
		$useCelsius[0].checked = localStorage.useCelsius === 'true';
		$displayPrefix[0].checked = localStorage.displayPrefix === 'true';		
	}
}

function getAndStoreConfigData() {
	var $backgroundColorPicker = $('#backgroundColorPicker');
	var $textColorPicker = $('#textColorPicker');
	var $weatherFrequencySlider = $('#weatherFrequencySlider');
	var $useCelsius = $('#useCelsius');
	var $displayPrefix = $('#displayPrefix');
	
	var options = {
		backgroundColor: $backgroundColorPicker.val(),
		textColor: $textColorPicker.val(),
		weatherFrequency: $weatherFrequencySlider.val(),
		useCelsius: $useCelsius[0].checked,
        displayPrefix: $displayPrefix[0].checked
	};

	localStorage.backgroundColor = options.backgroundColor;
	localStorage.textColor = options.textColor;
	localStorage.weatherFrequency = options.weatherFrequency;
	localStorage.useCelsius = options.useCelsius;
	localStorage.displayPrefix = options.displayPrefix;

	console.log('Got options: ' + JSON.stringify(options));
	return options;
}

function getQueryParam(variable, defaultValue) {
  var query = location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return defaultValue || false;
}

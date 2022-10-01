// Vars
var isPlaying = false;
var currentBit = 0;



// Main body

for (var i = 0; i < $$('.drum').length; i++) {
	$$('.drum')[i].onclick = function () {
		var btnInnerHtml = this.innerHTML;
		initSounds(btnInnerHtml);
		buttActive(btnInnerHtml);
	};
	$('html').onkeypress = function (event) {
		initSounds(event.key);
		buttActive(event.key);
	};
}

// Track player

for (var i = 0; i < $$('.ico').length; i++) {
	$$('.ico')[i].setAttribute('aid', i);
	$$('.ico')[i].onclick = function () {
		if (this.innerHTML == "⏹") {
			isPlaying = false;
			currentBit = 0;
			this.innerHTML = "⏯";
		} else if (this.innerHTML == "⏯") {
			$('#track_value').value = this.getAttribute('track');
			if (isPlaying) {
				for (var j = 0; j < $$('.ico').length; j++) {
					$$('.ico')[j].innerHTML = "⏯";
				}
				isPlaying = false;
			}

			if (currentBit > 0) {
				currentBit = 0;
			}

			if (this.innerHTML == "⏯") {
				this.innerHTML = "⏹";
			}
			isPlaying = true;
			trackPlay(false, this.getAttribute('aid'));
		}
	};
}

$('#track_value').onkeypress = function(event) {
	if(event.keyCode == 13) {
		customPlay();
	}
}

$('#playTrack').onclick = function() {
	customPlay();
};

// Functions

function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return document.querySelectorAll(selector);
}

function play(name) {
	var audio = new Audio('sounds/' + name + '.mp3');
	audio.play();
	
}

function parseTrack(str) {
	return str.split("");
}

function initSounds(key) {
	switch (key) {
		case 'w':
			play('tom1');
			break;
		case 'a':
			play('tom2');
			break;
		case 's':
			play('tom3');
			break;
		case 'd':
			play('tom4');
			break;
		case 'j':
			play('snare');
			break;
		case 'k':
			play('crash');
			break;
		case 'l':
			play('kick');
			break;
		case "x":
			isPlaying = false;
			currentBit = 0;
			for (var j = 0; j < $$('.ico').length; j++) {
				$$('.ico')[j].innerHTML = "⏯";
			}
			break;
	}
}

function buttActive(key) {
	$('.' + key).classList.add('pressed');

	setTimeout(function () {
		$('.' + key).classList.remove('pressed');
	}, 90);
	console.log($('.' + key).classList.value);
}

function trackPlay(isInp, track_number) {
	if (isPlaying) {
		if(!isInp) {
			var cTrack = parseTrack($$('.ico')[track_number].getAttribute('track'));
		} else {
			var cTrack = parseTrack(track_number);
		}
		if (currentBit < cTrack.length) {
			if (cTrack[currentBit] != " ") {
				initSounds(cTrack[currentBit]);
				buttActive(cTrack[currentBit]);
			}
			currentBit++;
			setTimeout("trackPlay(" + isInp + ", '" + track_number + "')", 120);
		} else {
			if(!isInp) {
				$$('.ico')[track_number].innerHTML = "⏯";
			}
			isPlaying = false;
			currentBit = 0;
		}
	}
}

function customPlay() {
	isPlaying = false;
	currentBit = 0;
	for (var j = 0; j < $$('.ico').length; j++) {
		$$('.ico')[j].innerHTML = "⏯";
	}
	var track_value = $('#track_value').value;
	isPlaying = true;
	trackPlay(true, track_value);
}
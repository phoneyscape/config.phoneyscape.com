var hash = location.hash.slice(1);
var options;
if (hash) {
  options = JSON.parse(decodeURIComponent(hash));
} else {
  console.log("You don't appear to be running PebbleJS, that's cool");
  options = {};
}

var levels = options.levels || [];
options.levels = levels;
var recipients = options.recipients || [];
options.recipients = recipients;

var telInput = document.getElementById('mynumber');
telInput.value = options.call || '';
telInput.addEventListener('input',function(evt){
  options.call = telInput.value;
});

var addLevelButton = document.getElementById('addlevel');

// for ids if recipients are ever per-level
var recipGlobalCount = 0;

var addRecipButton = document.getElementById('addrecip');
var recipContainer = document.getElementById('recips');
function addRecip() {
  var thisRecipIndex = recipients.length;
  var recipPair = document.createElement('div');
  var recipLabel = document.createElement('label');
  var recipInput = document.createElement('input');
  // TODO: use recipGlobalCount if/when stratified
  recipInput.id = 'recip-' + thisRecipIndex;
  recipients[thisRecipIndex] = recipients[thisRecipIndex] || '';
  recipInput.value = recipients[thisRecipIndex];
  recipLabel.htmlFor = recipInput.id;
  recipInput.type = 'tel';
  // TODO: don't actually label like this
  recipLabel.textContent = 'Text phone: ';

  // add recipient to UI
  recipInput.addEventListener('input', function(evt) {
    recipients[thisRecipIndex] = recipInput.value;
  });

  recipPair.className = 'pair card';
  recipPair.appendChild(recipLabel);
  recipPair.appendChild(recipInput);

  recipContainer.insertBefore(recipPair, addRecipButton);
}

addRecipButton.addEventListener('click',function(){
  addRecip();
});

addLevelButton.addEventListener('click',function(){
  addLevel();
});

var levelCursor = 0;
function getLevelIndex() {
  levels[levelCursor] = levels[levelCursor] || {
    play: '',
    body: ''
  };
  return levelCursor++;
}

var levelContainer = document.getElementById('levels');
function addLevel() {
  var thisLevel = getLevelIndex();
  var thisLevelContainer = document.createElement('div');

  var bodyPair = document.createElement('div');
  var bodyLabel = document.createElement('label');
  var bodyInput = document.createElement('input');

  bodyInput.id = 'msgbody-' + thisLevel;
  bodyInput.value = levels[thisLevel].body || '';
  bodyLabel.textContent = 'Text message:';
  bodyLabel.htmlFor = bodyInput.id;

  bodyInput.addEventListener('input', function(evt) {
    levels[thisLevel].body = bodyInput.value;
  });

  bodyPair.className = 'pair';
  bodyPair.appendChild(bodyLabel);
  bodyPair.appendChild(bodyInput);
  thisLevelContainer.appendChild(bodyPair);

  var playPair = document.createElement('div');
  var playLabel = document.createElement('label');
  var playInput = document.createElement('input');

  playInput.id = 'playurl-' + thisLevel;
  playInput.value = levels[thisLevel].play || '';
  playLabel.textContent = 'Playback URL:';
  playLabel.htmlFor = playInput.id;

  playInput.addEventListener('input', function(evt) {
    levels[thisLevel].play = playInput.value;
  });

  playPair.className = 'pair';
  playPair.appendChild(playLabel);
  playPair.appendChild(playInput);
  thisLevelContainer.appendChild(playPair);

  thisLevelContainer.className = 'card';
  levelContainer.insertBefore(thisLevelContainer, addLevelButton);
}

for (var i=0; i<recipients.length; i++) {
  addRecip();
}

for (var i=0; i<levels.length; i++) {
  addLevel();
}

document.getElementById('save')
  .addEventListener('click', function (evt) {
    document.location = 'pebblejs://close#' +
      encodeURIComponent(JSON.stringify(options));
});

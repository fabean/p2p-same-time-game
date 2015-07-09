/* jshint ignore:start */
'use strict';

var peer = new Peer({ key: 'n0ei2j1souk57b9' }),

//peer = new Peer({host: '52.25.18.170', port: 9000, path: '/myapp'}),
nameEl = document.getElementById('name-input'),
    setNameButton = document.getElementById('set-name'),
    showHostButton = document.getElementById('show-host'),
    showJoinButton = document.getElementById('show-join'),
    joinHostButton = document.getElementById('join-host'),
    peerId = document.getElementById('friends-peer-id'),
    connectedEl = document.getElementById('connected'),
    outputEl = document.getElementById('output'),
    playerconnection = undefined,
    elTop = 0,
    elLeft = 0,
    name = undefined;

/**
  * Peerjs setup stuff
  */
peer.on('open', function (id) {
  document.getElementById('your-id').innerHTML = '<span>Your id is: <kbd>' + id + '</kbd></span>';
});

peer.on('connection', function (playerconnection, name) {
  connectBack(playerconnection.peer);
  playerconnection.on('open', function () {
    renderConnectedTo(playerconnection.peer);

    playerconnection.on('data', function (data) {
      renderMove(data, 'them');
    });
  });
});

function renderConnectedTo(peer) {
  connectedEl.innerHTML = 'You\'re connected to <span id="friendID">' + peer + '</span>';
  connectedEl.classList.remove('hide');
  document.getElementById('init-wrapper').classList.add('hide');
}

function connectBack(id) {
  // recieve a connection and connect back
  if (typeof playerconnection === 'undefined') {
    // we need to connect back;
    playerconnection = peer.connect(id);
  }
}

/**
  * Setup things (name, join host whatevs)
  */
setNameButton.addEventListener('click', function () {
  setName();
});

nameEl.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    // enter key
    e.preventDefault();
    setName();
  }
});

showHostButton.addEventListener('click', function () {
  document.getElementById('host').classList.toggle('hide');
});

showJoinButton.addEventListener('click', function () {
  document.getElementById('join').classList.toggle('hide');
});

joinHostButton.addEventListener('click', function () {
  playerconnection = peer.connect(peerId.value);
  document.getElementById('join').classList.toggle('hide');
});

peerId.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  if (key === 13) {
    // enter key
    e.preventDefault();
    playerconnection = peer.connect(peerId.value);
    document.getElementById('join').classList.toggle('hide');
  }
});

function setName() {
  var nameInput = document.getElementById('name-input');
  name = nameInput.value;
  nameInput.classList.add('hide');
  setNameButton.classList.add('hide');
  showHostButton.classList.remove('hide');
  showJoinButton.classList.remove('hide');
}

function renderMove(data, who) {
  output.style.left = data.left + 'px';
  output.style.top = data.top + 'px';
}

document.addEventListener('keydown', function (e) {
  var key = e.which || e.keyCode;
  console.log(key);
  if (key === 37) {
    // left
    elLeft = elLeft - 5;
  }
  if (key === 39) {
    // right
    elLeft = elLeft + 5;
  }
  if (key === 38) {
    // up
    elTop = elTop - 5;
  }
  if (key === 40) {
    // down
    elTop = elTop + 5;
  }
  var data = {
    'top': elTop,
    'left': elLeft
  };
  playerconnection.send(data);
});
/**
  * My fancy makeArray helper function
  */
function makeArray(r) {
  return [].slice.call(r, 0);
}
//# sourceMappingURL=scripts.js.map

var webSocket = new WebSocket('ws://localhost:8080/');
var fadeTimeoutIDs = [];
var play = true;
var logBuf = '';
//var point = 0;

function init() {
  webSocket.onopen = handleWebSocketOpen;
  webSocket.onclose = handleWebSocketClose;
  webSocket.onmessage = handleWebSocketMessage;

  var controlBox = document.getElementById('control-box');
  controlBox.onmouseover = fadeInControls;
  controlBox.onmouseout = fadeOutControls;
  controlBox.style.opacity = 1;
  //fadeOutControls();
  decreaseOpacity(controlBox, 1000);
}

function handleWebSocketOpen() { log('websocket connection established.'); }
function handleWebSocketClose() { log('websocket connection closed.'); }
function handleWebSocketMessage(message) { log(message.data); }

function fadeInControls() {
  if(fadeTimeoutIDs.length != 0) {
    fadeTimeoutIDs.forEach(function(id){clearTimeout(id);});
    fadeTimeoutIDs = [];
  }
  document.getElementById('control-box').style.opacity = 1;
}

function decreaseOpacity(element, delay) {
  console.log(delay);
  timeoutID = setTimeout(
    function() {
      element.style.opacity -= 0.1;
      console.log(element.style.opacity);
      if(element.style.opacity > 0.1)
	decreaseOpacity(element, delay);
    },
    delay
  );
  fadeTimeoutIDs.push(timeoutID);
}

function fadeOutControls() {
  var control_box = document.getElementById('control-box');
  console.log(control_box.style.opacity);
  if(control_box.style.opacity >= 1)
    decreaseOpacity(control_box, 200);
}

function log(msg) {
  //document.getElementById( 'log' ).scrollIntoView();
  //console.log(document.getElementById( 'log' ).scrollHeight - document.getElementById( 'log' ).scrollTop);
  //console.log( document.body.scrollTop - document.body.scrollHeight);
  //console.log(document.body.clientHeight,   document.body.scrollHeight + document.body.scrollTop)
  //console.log(document.body.scrollHeight )
  //console.log(document.body.scrollHeight - document.body.scrollTop, document.body.clientHeight )
  //console.log(point);
  //if (document.body.scrollHeight - document.body.scrollTop !== point )
  //point = document.body.scrollHeight - document.body.scrollTop;
  //var old = document.body.scrollHeight - document.body.scrollTop;
  //if (document.body.clientHeight === document.body.scrollHeight - document.body.scrollTop)
  //if (document.body.scrollHeight - document.body.scrollTop > point )
  if(play) {
    document.getElementById('log').textContent += msg + '\n';
    scrollTo(0, document.body.scrollHeight);
  }
  else {
    logBuf += msg + '\n';
  }
}

function togglePlayPauseButton() {
  var buttonText = document.getElementById('buttonPlayPause').firstChild;
  if(buttonText.data == 'pause') {
    buttonText.data = 'play';
    document.getElementById('log').textContent += logBuf;
    logBuf = '';
    play = true;
  }
  else {
    buttonText.data = 'pause';
    play = false;
  }
}

remote.device = {};
remote.device.last_time = new Date().getTime();
remote.device.keyCode_v = null;
remote.device.keyCode_h = null;

window.addEventListener('deviceorientation', function(event) {
  var a = event.alpha;
  var vertical = event.beta;
  var horizontal = -event.gamma;
  var now = new Date().getTime();
  if (new Date().getTime() - remote.device.last_time < 30) { return; }
  remote.device.last_time = now;

  //remote.emit["key"]({type:"keyup",keyCode:38});
  var keyCode_v = null;
  if (vertical > 20) {keyCode_v = 38;}
  if (vertical < 00) {keyCode_v = 40;}
  if (keyCode_v != remote.device.keyCode_v && remote.device.keyCode_v != null) {
  remote.emit['key']({type:'keyup',keyCode: remote.device.keyCode_v});
  }
  remote.device.keyCode_v = keyCode_v;
  if (keyCode_v != null) {
  remote.emit['key']({type:'keydown',keyCode: keyCode_v});
  }
  
  var keyCode_h = null;
  if (horizontal < -20) {keyCode_h = 39;}
  if (horizontal > 20) {keyCode_h = 37;}

  if (keyCode_h != remote.device.keyCode_h && remote.device.keyCode_h != null) {
      remote.emit['key']({type:'keyup',keyCode: remote.device.keyCode_h});
  }
  remote.device.keyCode_h = keyCode_h;
  if (keyCode_h != null) {
      remote.emit['key']({type:'keydown',keyCode: keyCode_h});
  }
}, false);

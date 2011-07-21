window.addEventListener('deviceorientation', function(event) {
  var a = event.alpha;
  var vertical = event.beta;
  var horizontal = -event.gamma;
  if (typeof self.widget != 'undefined') {
    var now = new Date().getTime();
    if (new Date().getTime() - self.widget.last_time < 300) { return; }
    self.widget.last_time = now;
    with (self.widget.style) {
    next_top = vertical + parseInt(top);
    if (600 > next_top && next_top > 0) { top = next_top +'px'; }
    next_right = horizontal + parseInt(right);
    if (800 > next_right && next_right > 0) { right = next_right + 'px'; }
    //console.log('orientation:'+a+','+vertical+','+horizontal);
    //console.log('position:'+(vertical+parseInt(top))+','+right);
    
    if (vertical > 10) remote.emit[METHODS.MOVE]('up');
    if (vertical < -10) remote.emit[METHODS.MOVE]('down');
    if (horizontal < -10) remote.emit[METHODS.MOVE]('right');
    if (horizontal > 10) remote.emit[METHODS.MOVE]('left');
    }
  }
}, false);

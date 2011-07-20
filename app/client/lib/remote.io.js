var remote = function() {};
var d = document;
remote.loadRequire = function() {
    function appendRequire(src) {
        var s = d.createElement('script');
        s.setAttribute('src', src);
        s.onload = onload;
        b.appendChild(s);
        cnt++;
    }
    function onload() {
        while(--cnt) { return; }
        self.init(); 

    }
    var self = this;
    var cnt = 0;
    var b = d.body;
    appendRequire('/socket.io/socket.io.js');
    appendRequire('/javascripts/remote.events.js');
};

remote.init = function() {
    var socket = io.connect();
    socket.on('news', function(data) {
        console.log(data);
        socket.emit('my other event', {my: 'data'});
    });
};

(function init() {
    remote.loadRequire();
})();

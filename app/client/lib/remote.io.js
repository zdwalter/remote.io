var remote = function() {};
remote.init = function() {
    function appendRequire(src) {
        var s = d.createElement('script');
        s.setAttribute('src', src);
        s.onload = onload;
        b.appendChild(s);
        cnt++;
    }
    function onload() {
        while(--cnt) { return; }
        self.start(); 
    }
    var self = this;
    var d = document;
    var cnt = 0;
    var b = d.body;
    appendRequire('/socket.io/socket.io.js');
    appendRequire('/javascripts/remote.events.js');
};

remote.start = function() {
    var socket = io.connect();
    socket.on('news', function(data) {
        console.log(data);
        socket.emit('my other event', {my: 'data'});
    });
};

(function init() {
    remote.init();
})();

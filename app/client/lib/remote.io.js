if (typeof remote != 'undefined') { return 0; }

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
        self.initWidget(); 
        self.initSocket();
    }
    var self = this;
    var d = document;
    var cnt = 0;
    var b = d.body;
    appendRequire('http://remote.gfw4.info/socket.io/socket.io.js');
    appendRequire('http://remote.gfw4.info/javascripts/remote.events.js');
    appendRequire('http://remote.gfw4.info/javascripts/remote.methods.js');
};

remote.html = function() {
    return "<button id='up' onclick='remote.move(\"up\")'>up</button>\n"
     + "<button id='down' onclick='remote.move(\"down\")'>down</button>\n"
     + "<button id='left' onclick='remote.move(\"left\")'>left</button>\n"
     + "<button id='right' onclick='remote.move(\"right\")'>right</button>\n";
};

remote.initWidget = function() {
    var d = document;
    var widget = d.createElement('div');
    widget.id = 'remote.io.widget';
    with (widget.style) {
        position = 'absolute';
        top = self.pageYOffset + 'px';
        right = '0';
        width = '100px';
        height = '100px';
        zIndex = 9999;
        border = '1px solid';
    }
    widget.innerHTML=remote.html();
    d.body.appendChild(widget);
}

remote.initSocket = function() {
    this.socket = io.connect('http://remote.gfw4.info');
    this.socket.on(EVENTS.NEWS, function(data) {
        console.log(JSON.stringify(data));
        remote.act(data);
    });
};

remote.move = function(direction) {
    this.socket.emit(EVENTS.OTHER, {method: METHODS.MOVE, data: direction });
};

remote.act = function(msg) {
    method = msg.method;
    switch(method) {
        case METHODS.MOVE:
            return remote.act.move(msg.data);
    }
};

remote.act.move = function(direction) {
    console.log('move:'+direction);
    // window controller
    var scroll = new function() {
    };

    scroll.down = function() {
        window.scrollBy(0, 100);
    };

    scroll.up = function() {
        window.scrollBy(0, -100);
    };

    scroll[direction.toLowerCase()]();
};
(function init() {
    remote.init();
})();

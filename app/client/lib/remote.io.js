//if (typeof remote != 'undefined') { return 0; }
var remote_io_site = 'app.gfw4.info'; //'10.228.208.118';

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
        self.initMethods();
    }
    var self = this;
    var d = document;
    var cnt = 0;
    var b = d.body;
    appendRequire('http://'+remote_io_site+'/socket.io/socket.io.js');
    appendRequire('http://'+remote_io_site+'/javascripts/remote.events.js');
    appendRequire('http://'+remote_io_site+'/javascripts/remote.methods.js');
    appendRequire('http://'+remote_io_site+'/javascripts/jquery-1.6.2.min.js');
};

remote.initWidget = function() {
    var d = document;
    var widget = d.createElement('div');
    widget.id = 'remote.io.widget';
    with (widget.style) {
        position = 'absolute';
        top = self.pageYOffset + 'px';
        right = '0';
        width = '200px';
        height = '200px';
        zIndex = 9999;
        border = '1px solid';
    }
    widget.innerHTML = '<style>span { color:red; display:none; }</style>';
    widget.innerHTML += '<button onclick="remote.emit.move(&quot;up&quot;)">up</button><button onclick="remote.emit.move(&quot;down&quot;)">down</button><button onclick="remote.emit.move(&quot;left&quot;)">left</button><button onclick="remote.emit.move(&quot;right&quot;)">right</button><p>redirect url</p><input type="text" id="remote_redirect_url" value="http://t.gfw4.info"/><button onclick="remote.emit.redirect()">go</button><button onclick="remote.emit.share()">share</button><p>Status<span id="remote_io_status">Moving</span></p>';
    d.body.appendChild(widget);
//    $.ajax({
//        url:'http://'+remote_io_site+'/widget', 
//        success: function(data){
//            widget.innerHTML = data;
//            self.widget = widget;
//            $(window).scroll(function() {
//                widget.style.top = self.pageYOffset + 'px';
//            });
//        }
//    });
};

remote.initIframe = function(url) {
    var self = this;
    var d = document;
    var browser = d.createElement('div');
    browser.id = 'remote.io.browser';
    with(browser.style) {
        position = 'absolute';
        width = '800px';
        height = '600px';
        top = '0px';
        left = '0px';
        border = '1px solid';
    }
    d.body.appendChild(browser);
    browser.innerHTML = '<iframe id="remote.io.iframe" style="width: 100%;height: 100%" src="'+url+'"></iframe>';
    self.iframe = $("iframe");
};

remote.initSocket = function() {
    var url = 'http://'+remote_io_site;
    console.log(url);
    this.socket = io.connect(url); // FIXME: conflick with jquery.com
    this.socket.on(EVENTS.NEWS, function(msg) {
        console.log(JSON.stringify(msg));
        remote.act[msg.method](msg.data);
    });
};

remote.initMethods = function() {
    var self = this;
    remote.emit = {};
    
    remote.emit[METHODS.REDIRECT] = function() {
        var url = $('input#remote_redirect_url').val();
        self.socket.emit(EVENTS.OTHER, {method: METHODS.REDIRECT, data: url});
    };
    
    remote.emit[METHODS.MOVE] =  function(direction) {
        self.socket.emit(EVENTS.OTHER, {method: METHODS.MOVE, data: direction });
    };

    remote.emit[METHODS.SHARE] = function() {
        var url;
        if (typeof self.iframe != 'undefined') {
            console.log(self.iframe);
            url = self.iframe.attr('src');
        }
        else {
            url = window.location.href;
        }
        self.socket.emit(EVENTS.OTHER, {method: METHODS.REDIRECT, data: url});
    };
    
    remote.act = {};
    
    remote.act[METHODS.MOVE] = function(direction) {
        var target;
        if (typeof self.iframe != 'undefined') { 
            target = self.iframe.contents().find("body");
        } else {
            target = $(window);
        }
        // window controller
        var scroll = {
        down: function() { target.scrollTop(300); }, 
        up: function() { target.scrollTop(-300); }, 
        left: function() { target.scrollLeft(-300); },
        right: function() { target.scrollLeft(300); }
        };
        
        $("#remote_io_status").css("display", "inline").fadeOut("slow"); 
        scroll[direction.toLowerCase()]();
    }
    
    remote.act[METHODS.REDIRECT] = function(url) {
        document.body.innerHTML = '';
        self.initWidget();
        self.initIframe(url);
    };

};

(function init() {
    remote.init();
})();

(function() {
    var _events = {
        NEWS: 'news',
        OTHER: 'my other event'
    };
    if (typeof module != 'undefined') {
            module.exports = _events;
    }
    else if (typeof window != 'undefined'){
        EVENTS = _events; // set global variable for browser
    }
    return _events;
})();

(function() {
    var _events = {
        news: 'news',
        other: 'my other event'
    };
    if (typeof module != 'undefined') {
            module.exports = _events;
    }
    else {
        events = _events; // set global variable for browser
    }
    return _events;
})();

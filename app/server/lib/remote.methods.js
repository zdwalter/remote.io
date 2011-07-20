(function() {
    var _methods = {
        MOVE: 'move',
        OTHER: 'other'
    };
    if (typeof module != 'undefined') {
            module.exports = _methods;
    }
    else if (typeof window != 'undefined'){
        METHODS = _methods; // set global variable for browser
    }
    return _methods;
})();

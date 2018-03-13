module.exports = function interfaced(name) {
    var i = { name: name };

    i.implementedBy = function implementedBy(obj) {
        return typeof obj[i] == 'function';
    };

    i.call = function call() {
        var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
        var obj = args.shift();

        if (!i.implementedBy(obj))
            throw new Error('Interface not implemented: ' + name);

        return obj[i].apply(obj, args);
    };

    i.implementOn = function implementOn(c, func) {
        if (typeof c !== 'function')
            throw new Error('Cannot implement interface on ' + typeof c);

        c.prototype[i] = func;
    };

    return i;
}

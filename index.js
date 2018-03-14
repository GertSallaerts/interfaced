function Interfaced(name) {
    if (!(this instanceof Interfaced))
        return new Interfaced(name);

    this.name = name;
}

Interfaced.prototype.implementedOn = function implementedOn(obj) {
    return typeof obj[this] == 'function';
};

Interfaced.prototype.call = function call() {
    var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
    var obj = args.shift();

    return this.apply(obj, args);
};

Interfaced.prototype.apply = function apply(obj, args) {
    if (!this.implementedOn(obj))
        throw new Error('Interface not implemented: ' + name);

    return obj[this].apply(obj, args);
};

Interfaced.prototype.implementOn = function implementOn(c, func) {
    if (typeof c == 'function')
        c.prototype[this] = func;
    else if (c && typeof c == 'object')
        c[this] = func;
    else
        throw new Error('Cannot implement interface on ' + typeof c);
};

module.exports = Interfaced;

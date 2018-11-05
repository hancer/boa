export default {
  once(el, type, callback) {
    const typeArray = type ? type.split(' ') : [];
    const recursiveFunction = (e) => {
      e.target.removeEventListener(e.type, recursiveFunction);
      return callback(e);
    };
    for (let i = typeArray.length - 1; i >= 0; i--) {
      this.on(el, typeArray[i], recursiveFunction);
    }
  },
  on(el, type, callback) {
    if (el.addEventListener) {
      el.addEventListener(type, callback);
    } else {
      // IE8+ Support
      // eslint-disable-next-line
      el.attachEvent('on' + type, () => {
        callback.call(el);
      });
    }
  },
  off(el, type, callback) {
    if (el.removeEventListener) {
      el.removeEventListener(type, callback);
    } else {
      // IE8+ Support
      // eslint-disable-next-line
      el.detachEvent('on' + type, callback);
    }
  },
  isKeyboard(e) {
    return [
      'keydown',
      'keypress',
      'keyup',
    ].indexOf(e.type) !== -1;
  },
};
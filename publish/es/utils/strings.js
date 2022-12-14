import { isRTL } from '../config';
export function capitalize(str) {
  if (typeof str !== 'string') {
    console.error(new Error('str should be a string'));
  }

  return str && str[0].toUpperCase() + str.slice(1);
}
export function substitute(str, obj) {
  if (typeof str === 'string') {
    if (str.indexOf('{') < 0) {
      return str;
    }

    return str.replace(/\\?\{([^{}]+)\}/g, function (match, name) {
      if (match.charAt(0) === '\\') {
        return match.slice(1);
      }

      return obj[name] === null || obj[name] === undefined ? '' : obj[name];
    });
  }

  if (typeof str === 'function') {
    var val = str(obj);

    if (val === obj && typeof val === 'object') {
      val = Object.assign({}, obj);
    }

    return val;
  }

  return '';
}
export function removeProtocol(url) {
  if (url.indexOf('http') !== 0) return url;

  try {
    var _ref = new URL(url),
        href = _ref.href,
        protocol = _ref.protocol;

    return href.slice(protocol.length);
  } catch (error) {
    return url;
  }
}
export function getRTLPosition(position) {
  if (!position) return position; // position.replace('left', 'right').replace('right', 'left')

  if (position.indexOf('left') !== -1) {
    return position.replace('left', 'right');
  }

  if (position.indexOf('right') !== -1) {
    return position.replace('right', 'left');
  }

  return position;
}
export function getDirectionIconName(mode, double) {
  if (mode === void 0) {
    mode = 'left';
  }

  if (double === void 0) {
    double = false;
  }

  var rtl = isRTL();

  if (mode === 'left') {
    if (rtl) {
      return double ? 'AngleDoubleRight' : 'AngleRight';
    }

    return double ? 'AngleDoubleLeft' : 'AngleLeft';
  }

  if (rtl) {
    return double ? 'AngleDoubleLeft' : 'AngleLeft';
  }

  return double ? 'AngleDoubleRight' : 'AngleRight';
}
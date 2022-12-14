"use strict";

exports.__esModule = true;
exports.getProps = getProps;
exports.defaultProps = void 0;

function getProps(PropTypes) {
  var props = {
    className: PropTypes.string,
    style: PropTypes.object
  };
  var propSets = {
    disabled: PropTypes.bool,
    keygen: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.bool]).isRequired,
    grid: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    type: PropTypes.oneOf(['primary', 'default', 'secondary', 'success', 'info', 'warning', 'error', 'danger', 'link', 'confirmwarning'])
  };

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  args.forEach(function (name) {
    var prop = propSets[name];
    if (prop) props[name] = prop;
  });
  return props;
}

var defaultProps = {
  className: '',
  size: 'default',
  style: {},
  type: 'default'
};
exports.defaultProps = defaultProps;
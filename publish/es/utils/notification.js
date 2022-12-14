var Notification =
/*#__PURE__*/
function () {
  function Notification() {
    this.$events = {};
  }

  var _proto = Notification.prototype;

  _proto.dispatch = function dispatch(name) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var event = this.$events[name];
    if (!event) return;
    event.forEach(function (fn) {
      return fn.apply(void 0, args);
    });
  };

  _proto.subscribe = function subscribe(name, fn) {
    if (!this.$events[name]) this.$events[name] = [];
    var events = this.$events[name];
    if (fn in events) return;
    events.push(fn);
  };

  _proto.unsubscribe = function unsubscribe(name, fn) {
    if (!this.$events[name]) return;
    if (fn) this.$events[name] = this.$events[name].filter(function (e) {
      return e !== fn;
    });else delete this.$events[name];
  };

  return Notification;
}();

export { Notification as default };
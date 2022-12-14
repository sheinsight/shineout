var listeners = new Set();
export var addZoomListener = function addZoomListener(cb) {
  listeners.add(cb);
};
export var removeZoomListener = function removeZoomListener(cb) {
  listeners.delete(cb);
};

var dispatch = function dispatch(data) {
  listeners.forEach(function (cb) {
    cb(data);
  });
};

var updatePixelRatio = function updatePixelRatio(e) {
  var pr = window.devicePixelRatio;

  if (e) {
    dispatch(pr);
  }

  if (window.matchMedia) {
    var media = window.matchMedia("(resolution: " + pr + "dppx)");

    if (media.addEventListener) {
      media.addEventListener('change', updatePixelRatio, {
        once: true
      });
    }
  }
};

updatePixelRatio();
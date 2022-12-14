export default (function (color) {
  if (color.from) {
    return [{
      pos: '0%',
      color: color.from
    }, {
      pos: '100%',
      color: color.to
    }];
  }

  return Object.keys(color).sort(function (a, b) {
    return window.parseInt(a) - window.parseInt(b);
  }).reduce(function (p, v) {
    p.push({
      pos: v,
      color: color[v]
    });
    return p;
  }, []);
});
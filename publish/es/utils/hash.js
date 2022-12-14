export default function (obj) {
  var hash = 0;
  var i;
  var chr;
  var len;
  var str;
  var type = typeof obj;

  switch (type) {
    case 'object':
      str = JSON.stringify(obj);
      break;

    case 'string':
      str = obj;
      break;

    default:
      str = obj ? obj.toString() : '';
      break;
  }

  if (str.length === 0) return hash;

  for (i = 0, len = str.length; i < len; i++) {
    chr = str.charCodeAt(i); // eslint-disable-next-line

    hash = (hash << 5) - hash + chr; // eslint-disable-next-line

    hash |= 0; // Convert to 32bit integer
  }

  return hash.toString(36);
}
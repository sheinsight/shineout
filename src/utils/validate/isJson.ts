export default function(value: unknown) {
  if (typeof value === 'object') return true

  // In the second stage, we run the text against
  // regular expressions that look for non-JSON patterns. We are especially
  // concerned with '()' and 'new' because they can cause invocation, and '='
  // because it can cause mutation. But just to be safe, we want to reject all
  // unexpected forms.

  // We split the second stage into 4 regexp operations in order to work around
  // crippling inefficiencies in IE's and Safari's regexp engines. First we
  // replace all backslash pairs with '@' (a non-JSON character). Second, we
  // replace all simple value tokens with ']' characters. Third, we delete all
  // open brackets that follow a colon or comma or that begin the text. Finally,
  // we look to see that the remaining characters are only whitespace or ']' or
  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

  // eslint-disable-next-line
  if (typeof value === 'string') {
    if (
      /^[\],:{}\s]*$/.test(
        value
          .replace(/\\["\\\/bfnrtu]/g, '@')
          .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
          .replace(/(?:^|:|,)(?:\s*\[)+/g, '')
      )
    ) {
      try {
        JSON.parse(value)
        return true
      } catch (e) {
        return false
      }
    } else {
      return false
    }
  } else {
    return false
  }
}

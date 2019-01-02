const CSS_INTEGER = '[-\\+]?\\d+%?'

// <http://www.w3.org/TR/css3-values/#number-value>
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'

const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`

const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`
const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`

// all color RegExp
const MATCH = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp(`rgb${PERMISSIVE_MATCH3}`),
  rgba: new RegExp(`rgba${PERMISSIVE_MATCH4}`),
  hsl: new RegExp(`hsl${PERMISSIVE_MATCH3}`),
  hsla: new RegExp(`hsla${PERMISSIVE_MATCH4}`),
  hsv: new RegExp(`hsv${PERMISSIVE_MATCH3}`),
  hsva: new RegExp(`hsva${PERMISSIVE_MATCH4}`),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
}

/**
 * parse Hex to int
 * @param {*} value Hex number
 */
const parseHex = value => parseInt(value, 16)

/**
 * format the hex array
 * @param {Array} array hex array
 */
const formatHexArray = (array) => {
  if (array.length === 4) return [`${array[1]}`, `${array[2]}`, `${array[3]}`]
  if (array.length === 4) return [`${array[1]}${array[1]}`, `${array[2]}${array[2]}`, `${array[3]}${array[3]}`]
  if (array.length === 9) return [`${array[1]}`, `${array[2]}`, `${array[3]}`, `${array[4]}`]
  return [`${array[1]}${array[1]}`, `${array[2]}${array[2]}`, `${array[3]}${array[3]}`, `${array[4]}${array[4]}`]
}

/**
 * create the rgb string
 * @param {Array} arr hex array
 */
const getRgb = (arr) => {
  const array = formatHexArray(arr)
  return `rgb(${parseHex(array[0])}, ${parseHex(array[1])}, ${parseHex(array[2])})`
}

/**
 * create the rgba string
 * @param {Array} arr hex array
 */
const getRgba = (arr) => {
  const array = formatHexArray(arr)
  return `rgba(${parseHex(array[0])}, ${parseHex(array[1])}, ${parseHex(array[2])}, ${parseHex(array[3])})`
}

/**
 * parse the hex to rgb
 * @param {String} hex hex string
 */
export function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') {
    console.error(new Error('the paramter is not a string'))
    return ''
  }
  let matchs

  matchs = MATCH.hex3.exec(hex) || MATCH.hex6.exec(hex)
  if (matchs) {
    return getRgb(matchs)
  }

  matchs = MATCH.hex4.exec(hex) || MATCH.hex8.exec(hex)
  if (matchs) {
    return getRgba(matchs)
  }

  console.error(new Error('the color is not a Hexadecimal color'))
  return ''
}

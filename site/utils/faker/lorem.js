function getNum(max = 10, min = 0) {
  return Math.round(Math.random() * (max - min)) + min
}

function getChar() {
  const num = getNum(25)
  return String.fromCharCode(num + 97)
}

function word() {
  const num = getNum(9, 2)
  const chars = []
  for (let i = 0; i < num; i++) {
    chars.push(getChar())
  }
  return chars.join('')
}

function sentence() {
  const num = getNum(20, 4)
  const words = []
  for (let i = 0; i < num; i++) {
    words.push(word())
  }

  const s = words.join(' ')

  return `${s[0].toUpperCase() + s.slice(1)}.`
}

export default function(length = 1) {
  const ss = []
  for (let i = 0; i < length; i++) {
    ss.push(sentence())
  }
  return ss.join(' ')
}

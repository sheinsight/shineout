import crypto from 'crypto'

const native = { randomUUID: crypto.randomUUID }

const rnds8Pool = new Uint8Array(256) // # of random values to pre-allocate
let poolPtr = rnds8Pool.length

function rng() {
  if (poolPtr > rnds8Pool.length - 16) {
    crypto.randomFillSync(rnds8Pool)
    poolPtr = 0
  }
  // eslint-disable-next-line no-return-assign
  return rnds8Pool.slice(poolPtr, (poolPtr += 16))
}

const byteToHex = []

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1))
}
function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return `${byteToHex[arr[offset + 0]] +
    byteToHex[arr[offset + 1]] +
    byteToHex[arr[offset + 2]] +
    byteToHex[arr[offset + 3]]}-${byteToHex[arr[offset + 4]]}${byteToHex[arr[offset + 5]]}-${
    byteToHex[arr[offset + 6]]
  }${byteToHex[arr[offset + 7]]}-${byteToHex[arr[offset + 8]]}${byteToHex[arr[offset + 9]]}-${
    byteToHex[arr[offset + 10]]
  }${byteToHex[arr[offset + 11]]}${byteToHex[arr[offset + 12]]}${byteToHex[arr[offset + 13]]}${
    byteToHex[arr[offset + 14]]
  }${byteToHex[arr[offset + 15]]}`.toLowerCase()
}

export default function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID()
  }

  options = options || {}

  const rnds = options.random || (options.rng || rng)()

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  // eslint-disable-next-line no-bitwise
  rnds[6] = (rnds[6] & 0x0f) | 0x40
  // eslint-disable-next-line no-bitwise
  rnds[8] = (rnds[8] & 0x3f) | 0x80

  // Copy bytes to buffer, if provided
  if (buf) {
    offset = offset || 0

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i]
    }

    return buf
  }

  return unsafeStringify(rnds)
}

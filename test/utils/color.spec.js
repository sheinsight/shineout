import * as color from '../../src/utils/color'

describe('color.js[rgbToHex]', () => {
  it('should transform rgb to hex', () => {
    const rgbs = ['rgb(255, 255, 255)', 'rgb(255, 195, 49)', 'rgb(51, 171, 98)']
    const hexs = ['#ffffff', '#ffc331', '#33ab62']
    rgbs.forEach((rgb, index) => {
      expect(color.rgbToHex(rgb)).toBe(hexs[index])
    })
  })
  it('input wrong rgb data', () => {
    const fn = jest.fn()
    window.console.error = fn
    expect(color.rgbToHex(0)).toBe('')
    expect(fn.mock.calls.length).toBe(1)
    expect(fn.mock.calls[0][0].message).toBe('the color is empty')
    expect(color.rgbToHex('rgb("ggg")')).toBe('')
    expect(fn.mock.calls.length).toBe(2)
    expect(fn.mock.calls[1][0].message).toBe('the string \'rgb("ggg")\' is not a rgb color')
  })
})
describe('color.js[hexToHsl]', () => {
  it('should transform hex to hsl', () => {
    const hexs = ['#ffddee', 'eedd337f']
    const hsls = ['hsl(330, 100, 93)', 'hsla(54, 84, 56, 0.5)']
    hexs.forEach((hex, index) => {
      expect(color.hexToHsl(hex)).toBe(hsls[index])
    })
  })
  // it('input wrong hex data', () => {
  //   expect(() => color.hexToHsl('#fgqrrq')).toThrow()
  // })
})
describe('color.js[hexToRgb]', () => {
  it('should transform hex to rgb', () => {
    const rgbs = ['rgb(255, 255, 255)', 'rgb(255, 195, 49)', 'rgb(51, 171, 98)']
    const hexs = ['#ffffff', '#ffc331', '#33ab62']
    hexs.forEach((hex, index) => {
      expect(color.hexToRgb(hex)).toBe(rgbs[index])
    })
  })
  it('should transform hex3 to rgb', () => {
    const rgbs = ['rgb(255, 255, 255)', 'rgb(204, 204, 204)', 'rgb(255, 0, 255)']
    const hexs = ['#fff', '#ccc', '#f0f']
    hexs.forEach((hex, index) => {
      expect(color.hexToRgb(hex)).toBe(rgbs[index])
    })
  })

  // it('should return empty', () => {
  //   expect(color.hexToRgb(0)).toBe('')
  // })
})
describe('color.js[hslToHex]', () => {
  it('should transform hsl to hex (no alpha)', () => {
    const hsls = ['hsla(330, 100, 93, 0.5)', 'hsla(54 , 84, 56, 0.5)']
    const hexs = ['#ffdbed', '#edda30']
    hsls.forEach((hsl, index) => {
      expect(color.hslToHex(hsl, true)).toBe(hexs[index])
    })
  })
  it('should transform hsl to hex', () => {
    const hsls = ['hsl(330, 100, 93)', 'hsla(54 , 84, 56, 0.5)']
    const hexs = ['#ffdbed', '#edda307f']
    hsls.forEach((hsl, index) => {
      expect(color.hslToHex(hsl)).toBe(hexs[index])
    })
  })
})
describe('color.js[hslToRgb]', () => {
  it('should transform hsl to rgb', () => {
    const hsls = ['hsl(120, 40%, 50%)', 'hsl(200, 20%, 30%)', 'hsl(320, 45%, 55%)', 'hsl(360, 60%, 70%)']
    const rgbs = ['rgb(76, 178, 76)', 'rgb(61, 81, 91)', 'rgb(191, 88, 157)', 'rgb(224, 132, 132)']

    hsls.forEach((hsl, i) => {
      expect(color.hslToRgb(hsl)).toBe(rgbs[i])
    })
  })

  it('should transform hsl to rgb in boundary', () => {
    const hsls = ['hsl(0, 0, 0)', 'hsl(0, 100%, 0)', 'hsl(360, 100%, 100%)', 'hsl(360, 50%, 50%)']
    const rgbs = ['rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(191, 63, 63)']

    hsls.forEach((h, i) => {
      expect(color.hslToRgb(h)).toBe(rgbs[i])
    })
  })

  it('should transform hsl to rgb(no precent)', () => {
    expect(color.hslToRgb('hsl(250, 30, 40)')).toBe('rgb(81, 71, 132)')
    expect(color.hslToRgb('hsl(330, 60, 70)')).toBe('rgb(224, 132, 178)')
  })
})
describe('color.js[isDark]', () => {
  it('should get true when color is dark', () => {
    const test = [
      '#000',
      '111',
      'rgb(100, 100, 100)',
      'rgba(100, 100, 100, 0.5)',
      'hsl(300, 100, 5)',
      'hsla(300, 100, 5, 0.1)',
    ]
    test.forEach(value => {
      expect(color.isDark(value)).toBeTruthy()
    })
  })
})
describe('color.js[isLight]', () => {
  it('should get true when color is light', () => {
    const test = [
      '#eeeeee',
      'fff',
      'rgb(245, 245, 245)',
      'rgba(245, 245, 245, 0.5)',
      'hsl(100,   70, 80)',
      'hsla(100, 90, 90, 0.1)',
    ]
    test.forEach(value => {
      expect(color.isLight(value)).toBeTruthy()
    })
  })
})
describe('color.js[other]', () => {
  it('should get false when color is illegal', () => {
    const test = ['#ggg', 'rgb(100, 100)', 'hsld(300, 5)']
    test.forEach(value => {
      expect(color.isDark(value)).toBeFalsy()
      expect(color.isLight(value)).toBeFalsy()
    })
  })
})

describe('color.js[fade]', () => {
  it('should fade color', () => {
    expect(color.fade('#ccc', 0.5)).toBe('rgba(204, 204, 204, 0.5)')
    expect(color.fade('#efefef', 0.5)).toBe('rgba(237, 237, 237, 0.5)')
  })

  it('input wrong color', () => {
    expect(color.fade(false, 0.5)).toBe('')
  })
})

describe('color.js[darken]', () => {
  it('should darken color', () => {
    expect(color.darken('#ccc', 50)).toBe('rgba(76, 76, 76, 1)')
    expect(color.darken('#FFCC00', 23)).toBe('rgba(137, 110, 0, 1)')
    expect(color.darken('#00000055')).toBe('rgba(0, 0, 0, 1)')
    expect(color.darken('rgb(123,234, 255)', 10)).toBe('rgba(71, 227, 255, 1)')
    expect(color.darken('rgba(123,234, 255, 0.5)', 10)).toBe('rgba(255, 255, 255, 1)')
    expect(color.darken(false, 23)).toBe('')
  })
})

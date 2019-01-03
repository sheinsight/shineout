import test from 'ava'
import * as color from '../../src/utils/color'


test('should return a empty string', (t) => {
  t.is(color.hexToRgb(), '')
  t.is(color.hexToRgb('yarn'), '')
  t.is(color.hslToRgb(), '')
  t.is(color.hslToRgb('hls(200, 40, 50)'), '')
  t.is(color.rgbToHex(), '')
  t.is(color.rgbToHex('rbg(200, 40, 50)'), '')
})

test('should transform hex to rgb', (t) => {
  const hex = ['#fff', '#123', '#eeeeee', '#7453ba', '123']
  const rgb = ['rgb(255, 255, 255)', 'rgb(17, 34, 51)', 'rgb(238, 238, 238)', 'rgb(116, 83, 186)', 'rgb(17, 34, 51)']

  hex.forEach((h, i) => {
    t.is(color.hexToRgb(h), rgb[i])
  })
})


test('should transform hex to rgba', (t) => {
  const hex = ['#ffff', '#1233', '#00000000', '#7453ba66', '00000000']
  const rgba = ['rgba(255, 255, 255, 1)', 'rgba(17, 34, 51, 0.2)', 'rgba(0, 0, 0, 0)', 'rgba(116, 83, 186, 0.4)', 'rgba(0, 0, 0, 0)']

  hex.forEach((h, i) => {
    t.is(color.hexToRgb(h), rgba[i])
  })
})

test('should transform hsl to rgb', (t) => {
  const hsl = ['hsl(120, 40%, 50%)', 'hsl(200, 20%, 30%)', 'hsl(320, 45%, 55%)', 'hsl(360, 60%, 70%)']
  const rgb = ['rgb(76, 178, 76)', 'rgb(61, 81, 91)', 'rgb(191, 88, 157)', 'rgb(224, 132, 132)']

  hsl.forEach((h, i) => {
    t.is(color.hslToRgb(h), rgb[i])
  })
})

test('should transform hsl to rgb in boundary', (t) => {
  const hsl = ['hsl(0, 0, 0)', 'hsl(0, 100%, 0)', 'hsl(360, 100%, 100%)', 'hsl(360, 50%, 50%)']
  const rgb = ['rgb(0, 0, 0)', 'rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(191, 63, 63)']

  hsl.forEach((h, i) => {
    t.is(color.hslToRgb(h), rgb[i])
  })
})

test('should transfrom hsl to rgb(no precent)', (t) => {
  t.is(color.hslToRgb('hsl(250, 30, 40)'), 'rgb(81, 71, 132)')
  t.is(color.hslToRgb('hsl(330, 60, 70)'), 'rgb(224, 132, 178)')
})

test('should transform rgb to hex', (t) => {
  const rgb = ['rgb(255, 180, 0)', 'rgb(200,  200 ,  200)', 'rgb(120.8, 110.7, 50.7)']
  const hex = ['#ffb400', '#c8c8c8', '#786e32']

  rgb.forEach((r, i) => {
    t.is(color.rgbToHex(r), hex[i])
  })
})

test('should transform rgba to hex', (t) => {
  const rgba = ['rgba(255, 180, 0, 0.5)', 'rgba(200,  200 ,  200, 0.2)']
  const hex = ['#ffb4007f', '#c8c8c833']

  rgba.forEach((r, i) => {
    t.is(color.rgbToHex(r), hex[i])
  })
})

test('should transform rgba to hex (noAlpha)', (t) => {
  const rgba = ['rgba(255, 180, 0, 0.5)', 'rgba(200,  200 ,  200, 0.2)']
  const hex = ['#ffb400', '#c8c8c8']

  rgba.forEach((r, i) => {
    t.is(color.rgbToHex(r, true), hex[i])
  })
})

test('should transform rgb to hsl', (t) => {
  const rgb = ['rgb(255, 180, 0)', 'rgb(200,  200 ,  200)', 'rgb(120.8, 110.8, 50.8)']
  const hsl = ['hsl(42, 100, 50)', 'hsl(0, 0, 78)', 'hsl(51, 41, 33)']

  rgb.forEach((r, i) => {
    t.is(color.rgbTohsl(r), hsl[i])
  })
})

test('should transform rgba to hsla', (t) => {
  const rgba = ['rgba(255, 180, 0, 0.2)', 'rgba(200,  200 ,  200, 0.5)']
  const hsla = ['hsla(42, 100, 50, 0.2)', 'hsla(0, 0, 78, 0.5)']

  rgba.forEach((r, i) => {
    t.is(color.rgbTohsl(r), hsla[i])
  })
})

test('should get true when color is dark', (t) => {
  t.true(color.isDark('#000'))
  t.true(color.isDark('111'))
  t.true(color.isDark('rgb(100, 100, 100)'))
  t.true(color.isDark('rgba(100, 100, 100, 0.5)'))
  t.true(color.isDark('hsl(300,   100, 5)'))
  t.true(color.isDark('hsla(300,   100, 5, 0.1)'))
})

test('should get false when color is illegal', (t) => {
  t.false(color.isDark('#ggg'))
  t.false(color.isDark('rgb(100, 100)'))
  t.false(color.isDark('hsld(300, 5)'))
  t.false(color.isLight('#ggg'))
  t.false(color.isLight('rgb(100, 100)'))
  t.false(color.isLight('hsld(300, 5)'))
})

test('should get true when color is light', (t) => {
  t.true(color.isLight('#eeeeee'))
  t.true(color.isLight('fff'))
  t.true(color.isLight('rgb(245, 245, 245)'))
  t.true(color.isLight('rgba(245, 245, 245, 0.5)'))
  t.true(color.isLight('hsl(100,   70, 80)'))
  t.true(color.isLight('hsla(100, 90, 90, 0.1)'))
})


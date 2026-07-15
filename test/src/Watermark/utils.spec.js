import { getCanvasFont, getContentLines, mergeFont } from '../../../src/Watermark/utils'

const defaultFont = {
  color: 'rgba(0, 0, 0, 0.15)',
  fontSize: 16,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontFamily: 'sans-serif',
  textAlign: 'center',
}

describe('Watermark utils', () => {
  test('should normalize string content to a line with the default font', () => {
    expect(getContentLines('Shineout', defaultFont)).toEqual([
      {
        text: 'Shineout',
        font: defaultFont,
      },
    ])
  })

  test('should merge custom font for each content line without overriding defaults with undefined', () => {
    expect(
      getContentLines(
        [
          'Shineout',
          { text: 'Watermark', font: { fontSize: 20, fontWeight: 'bold' } },
          { text: 'Fallback', font: { fontFamily: 'serif', fontSize: undefined } },
        ],
        defaultFont
      )
    ).toEqual([
      { text: 'Shineout', font: defaultFont },
      {
        text: 'Watermark',
        font: { ...defaultFont, fontSize: 20, fontWeight: 'bold' },
      },
      {
        text: 'Fallback',
        font: { ...defaultFont, fontFamily: 'serif' },
      },
    ])
  })

  test('should create a canvas font descriptor scaled by pixel ratio', () => {
    expect(
      getCanvasFont(
        {
          ...defaultFont,
          fontSize: 20,
          fontStyle: 'italic',
          fontWeight: 'bold',
          fontFamily: 'serif',
        },
        2
      )
    ).toBe('italic normal bold 40px serif')
  })

  test('should not override default font values with undefined', () => {
    expect(mergeFont(defaultFont, { fontFamily: 'serif', fontSize: undefined })).toEqual({
      ...defaultFont,
      fontFamily: 'serif',
    })
  })
})

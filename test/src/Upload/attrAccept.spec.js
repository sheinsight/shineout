import { accept as attrAccept } from '../../../src/utils'

describe('Upload[attr-accept]', () => {
  test('should validate image/*', () => {
    const files = [
      { name: 'a.png', type: 'image/png' },
      { name: 'b.jpeg', type: 'image/jpeg' },
      { name: 'c.gif', type: 'image/gif' },
      { name: 'aaa', type: 'image/gif' },
      { name: 'd.dwg', type: 'image/vnd.dwg' },
    ]
    files.forEach(file => {
      expect(attrAccept(file, 'image/*')).toBeTruthy()
    })
  })

  test('should validate ext', () => {
    const files = [
      { name: 'a.zip' },
      { name: 'file.rar' },
      { name: 'b.zip' },
      { name: 'b.b.rar' },
      { name: 'c_a_b.c.zip.zip' },
    ]
    files.forEach(file => {
      expect(attrAccept(file, '.zip, .rar')).toBeTruthy()
    })
  })

  test('should validate MIME-TYPE', () => {
    const files = [
      { name: 'a.doc', type: 'application/msword' },
      { name: 'b.txt', type: 'plain/text' },
      { name: 'c.gif', type: 'image/gif' },
    ]
    files.forEach(file => {
      expect(attrAccept(file, 'application/msword, plain/text, image/gif')).toBeTruthy()
    })
  })

  test('should report error while match failed', () => {
    const files = [
      { name: 'a.doc', type: 'application/msword' },
      { name: 'b.txt', type: 'plain/text' },
      { name: 'c.gif', type: 'image/gif' },
    ]
    files.forEach(file => {
      expect(attrAccept(file, 'image/png')).toBeFalsy()
    })
  })
})

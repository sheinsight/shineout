import { Modal } from 'shineout'

describe('Modal[Type]', () => {
  test('should render different type', () => {
    ;['info', 'success', 'warn', 'error'].forEach(type => {
      document.body.innerHTML = ''
      Modal[type]({
        title: `This is a ${type} message`,
        content: 'this is some information',
      })
      expect(document.body.innerHTML.replace(/id=".*"/g, 'id="a')).toMatchSnapshot()
    })
  })
})

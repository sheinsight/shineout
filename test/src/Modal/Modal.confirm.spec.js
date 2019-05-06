import { Modal } from 'shineout'

/* global SO_PREFIX */
describe('Modal[Confirm]', () => {
  test('should render confirm button', () => {
    Modal.confirm({
      title: 'This is a confirm message',
      content: 'this is some information that user confirm',
    })
    expect(document.querySelectorAll(`.${SO_PREFIX}-modal-footer button`).length).toBe(2)
  })
})

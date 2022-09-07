import Notification from '../../src/utils/notification'

describe('Notification', () => {
  it('base', () => {
    const eat = jest.fn()
    const drink = jest.fn()
    const notification = new Notification()
    notification.subscribe('eat', eat)
    notification.subscribe('eat', drink)
    notification.dispatch('eat', 'apple', 'juice')
    expect(eat.mock.calls.length).toBe(1)
    expect(eat.mock.calls[0][0]).toBe('apple')
    expect(eat.mock.calls[0][1]).toBe('juice')
    expect(drink.mock.calls.length).toBe(1)
    expect(drink.mock.calls[0][0]).toBe('apple')
    expect(drink.mock.calls[0][1]).toBe('juice')
    notification.unsubscribe('eat', eat)
    notification.dispatch('eat', 'pie')
    expect(drink.mock.calls.length).toBe(2)
    expect(drink.mock.calls.length).toBe(2)
  })
})

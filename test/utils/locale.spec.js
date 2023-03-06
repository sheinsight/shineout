import { setLocale, getLocale } from '../../src/locale'
import cn from '../../src/locale/zh-CN'
import en from '../../src/locale/en_US'

describe('locale', () => {
  it('zh-CN', () => {
    setLocale('zh-CN')
    expect(getLocale()).toBe(cn)
    expect(getLocale('ok', { ok: 'ojbk' })).toBe('ojbk')
    expect(getLocale('ok')).toBe('确定')
  })

  it('en', () => {
    setLocale('en_US')
    expect(getLocale()).toBe(en)
    expect(getLocale('ok', { ok: 'ojbk' })).toBe('ojbk')
    expect(getLocale('ok')).toBe('Ok')
  })

  it('object', () => {
    const lo = { ok: 'noOk' }
    setLocale(lo)
    expect(getLocale('ok', { ok: 'ojbk' })).toBe('ojbk')
    expect(getLocale('ok')).toBe('noOk')
  })
})

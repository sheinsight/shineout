import { useEffect } from 'react'
import { setConfig } from 'shineout'
import getParameterByName from './param'

export const useDirection = () => {
  useEffect(() => {
    const direction = getParameterByName('direction') || ''
    setConfig({ direction })
    if (direction === 'rtl') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }, [])
}

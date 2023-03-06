import { useEffect, useState } from 'react'
import { setConfig, config } from 'shineout'
import getParameterByName from './param'

export const useDirection = () => {
  const [d, setD] = useState(config.direction)
  useEffect(() => {
    const direction = getParameterByName('direction') || ''
    setConfig({ direction })
    setD(direction)
    if (direction === 'rtl') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }, [])
  return [d]
}

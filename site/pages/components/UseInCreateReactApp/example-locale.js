import React from 'react'
import { getLocale } from 'shineout/locale'

export default function() {
  return <pre>{JSON.stringify(getLocale(), null, 2)}</pre>
}

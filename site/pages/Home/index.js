import React from 'react'
import MarkDown from '../../components/MarkDown'

import cntext from './cn.md'

function Home() {
  return (
    <MarkDown source={cntext} />
  )
}

export default Home

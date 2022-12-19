import React, { PureComponent } from 'react'
import { getDirectionClass } from '../utils/classname'

import Jumper from './Jumper'
import Prev from './Prev'
import Next from './Next'
import { PrevProps, JumperProps, NextProps } from './Props'

import { paginationClass } from './styles'

class Simple extends PureComponent {
  render() {
    return (
      <div className={paginationClass('links', getDirectionClass('section'))}>
        <Prev {...this.props as PrevProps & { total: number; pageSize: number }} isSimple />
        <Jumper {...this.props as JumperProps} isSimple size="small" />
        <Next {...this.props as NextProps} isSimple />
      </div>
    )
  }
}

export default Simple

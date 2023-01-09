import React, { PureComponent, ReactNode } from 'react'
import { listClass } from './styles'

interface ExtraProps {
  extra: ReactNode[]
}

class Extra extends PureComponent<ExtraProps> {
  render() {
    const render = this.props.extra.map((value, index) => (
      <React.Fragment key={index}>
        {value}
        {index < this.props.extra.length - 1 ? <div className={listClass('split')} /> : null}
      </React.Fragment>
    ))

    return <div className={listClass('extra')}>{render}</div>
  }
}

export default Extra

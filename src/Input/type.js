import React from 'react'
import { curry } from '../utils/func'

// extends type props for validate params, example Input.Number
export default curry(
  (option, Origin) =>
    class extends React.PureComponent {
      render() {
        const { type } = option
        // cover props type or extends some Components type
        return <Origin {...this.props} type={type} />
      }
    }
)

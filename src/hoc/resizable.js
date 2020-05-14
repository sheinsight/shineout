import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { resizableClass } from '../styles'
import { getUidStr } from '../utils/uid'
import { curry } from '../utils/func'

export default curry(
  Origin =>
    class Resizable extends React.Component {
      static propTypes = {
        style: PropTypes.object,
        className: PropTypes.string,
        resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
      }

      constructor(props) {
        super(props)
        this.resizableId = getUidStr()
      }

      componentDidMount() {
        this.appendHandler()
      }

      componentDidUpdate() {
        if (this.props.resizable) {
          this.appendHandler()
        }
      }

      appendHandler() {
        const { resizable } = this.props
        if (!resizable || this.appended) return
        this.appended = true
        this.el = document.querySelector(`.${resizableClass(this.resizableId)}`)
        if (!this.el) return
        ;['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(dir => {
          const single = document.createElement('div')
          single.className = resizableClass('handler', `handler-${dir}`)
          this.el.appendChild(single)
        })
      }

      render() {
        const { resizable, className, ...others } = this.props
        if (!resizable) return <Origin {...this.props} />
        const mc = classnames(className, resizableClass('_', this.resizableId))
        return <Origin {...others} className={mc} />
      }
    }
)

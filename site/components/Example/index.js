import React, { PureComponent, Fragment, createElement } from 'react'
import PropTypes from 'prop-types'
import { getUidStr } from 'shineout/utils/uid'
import classGenerate from '../../utils/classname'
import CodeBlock from '../CodeBlock'

const cls = classGenerate(require('./example.less'), 'example')

class Example extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      showcode: false,
    }

    this.id = getUidStr()
    this.toggleCode = this.toggleCode.bind(this)
  }

  componentDidMount() {
    this.props.appendHeading({
      id: this.id,
      level: 3,
      children: [this.props.title],
    })
  }

  toggleCode() {
    this.setState({ showcode: !this.state.showcode })
  }

  render() {
    const { component, rawText, title } = this.props
    const { showcode } = this.state

    return (
      <Fragment>
        <div id={this.id} className={cls('_', showcode && 'showcode')}>
          <span className={cls('title')}>{title}</span>
          <a href="javascript:;" className={cls('toggle')} onClick={this.toggleCode}>Code</a>
          { createElement(component) }
        </div>
        { showcode && <CodeBlock language="js" value={rawText} /> }
      </Fragment>
    )
  }
}

Example.propTypes = {
  appendHeading: PropTypes.func,
  component: PropTypes.func.isRequired,
  rawText: PropTypes.string,
  title: PropTypes.string.isRequired,
}

Example.defaultProps = {
  appendHeading: () => {},
  rawText: '',
}

export default Example

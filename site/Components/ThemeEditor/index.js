import React from 'react'
import ReactDOM from 'react-dom'
import { color } from 'shineout'
import Fab from './Fab'
import Editor from './Editor'
import { headerClass } from '../../styles'

const container = document.createElement('div')
document.body.appendChild(container)
const Panel = props => ReactDOM.createPortal(<Fab key="panel" {...props} />, container)

export default class ThemeEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {}

  handleToggle() {
    this.setState(prevState => ({ visible: !prevState.visible }))
  }

  renderPanel() {
    const { visible } = this.state
    if (!this.rendered && !visible) return null
    this.rendered = true
    return (
      <Panel key="panel" visible={visible} onClose={this.handleToggle}>
        <Editor />
      </Panel>
    )
  }

  render() {
    return [
      <span key="color" className={headerClass('color')} onClick={this.handleToggle}>
        <div className={headerClass('color-current')} style={{ backgroundColor: color.primary }} />
      </span>,
      this.renderPanel(),
    ]
  }
}

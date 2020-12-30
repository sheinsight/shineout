import React from 'react'
import ReactDOM from 'react-dom'
import ready from 'shineout/utils/dom/ready'
import styled from 'styled-components'
import eggImg from '../images/egg_2021.png'
import Image from '../../src/Image'

const Mask = styled.div`
  background: rgba(20, 23, 55, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 110000;
`

const EGG_KEY = 'SHINEOUT_2021_EGG_HAPPY_NEW_YEAR'

let container = null
ready(() => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  container = div
})

export default class Eggs extends React.Component {
  state = {
    visible: !localStorage.getItem(EGG_KEY),
  }

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    // localStorage.setItem(EGG_KEY, Date.now())
    this.setState({ visible: false })
  }

  renderContent() {
    return (
      <Mask onClick={this.handleClose}>
        <Image src={eggImg} height="100%" placeholder={null} />
      </Mask>
    )
  }

  render() {
    const { visible } = this.state
    if (!visible) return null
    return ReactDOM.createPortal(this.renderContent(), container)
  }
}

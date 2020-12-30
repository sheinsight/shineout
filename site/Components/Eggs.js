import React from 'react'
import ReactDOM from 'react-dom'
import ready from 'shineout/utils/dom/ready'
import styled from 'styled-components'
import eggImg from '../images/egg_2021.png'
import Icon from '../icons/Icon'

const Mask = styled.div`
  background: rgba(20, 23, 55, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 110000;
  display: flex;
  justify-content: center;
`

const Close = styled.div`
  width: 26px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 50%;
  border: 1px solid;
  color: #fff;
  margin-top: 10%;
  cursor: pointer;
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
    loaded: false,
  }

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.loadImg = this.loadImg.bind(this)
  }

  componentDidMount() {
    if (this.state.visible) {
      this.loadImg()
      console.log('！！！')
    }
  }

  loadImg() {
    const image = new Image()
    image.onload = () => {
      this.setState({ loaded: true })
    }
    image.src = eggImg
  }

  handleClose() {
    // localStorage.setItem(EGG_KEY, Date.now())
    this.setState({ visible: false })
  }

  renderContent() {
    return (
      <Mask style={{}}>
        <img src={eggImg} alt="元旦快乐～～～" height="100%" />
        <Close onClick={this.handleClose}>
          <Icon name="close" />
        </Close>
      </Mask>
    )
  }

  render() {
    const { visible, loaded } = this.state
    if (!visible) return null
    return ReactDOM.createPortal(this.renderContent(), container)
  }
}

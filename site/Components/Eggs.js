import React from 'react'
import ReactDOM from 'react-dom'
import ready from 'shineout/utils/dom/ready'
import styled, { keyframes } from 'styled-components'
import icons from 'shineout/icons'

const backgroundAnimation = keyframes`
  0% {opacity: 0}
  100% {opacity: 1}
`
const zoominAnimation = keyframes`
  from, 60%, 75%, 90%, to {animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);}
  0% {opacity: 0;transform: translate3d(-3000px, 0, 0);}
  60% {opacity: 1;transform: translate3d(25px, 0, 0);}
  75% {transform: translate3d(-10px, 0, 0);}
  90% {transform: translate3d(5px, 0, 0);}
  100% {opacity: 1;transform: none;}
`
const Mask = styled.div`
  background: rgba(20, 23, 55, 0.6);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 110000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation-name: ${backgroundAnimation};
  animation-duration: 0.2s;
`

const Wrapper = styled.div`
  position: relative;
  animation-name: ${zoominAnimation};
  animation-duration: 0.8s;
`

const Close = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 44px;
  height: 44px;
  fill: #fff;
  padding: 10px;
  border: 1px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: rotate(180deg);
  }
`

const Image = styled.img`
  height: 80vh;
  min-height: 500px;
`

const imageURL = '/images/egg_2021.png'
const EGG_KEY = 'SHINEOUT_2021_EGG_HAPPY_NEW_YEAR'

let container = null
ready(() => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  container = div
})

function at() {
  const start = +new Date('2020-12-30 00:00:00')
  const end = start + 5 * 3600 * 24 * 1000
  const now = Date.now()
  if (now >= start && now <= end) return true
  return false
}
export default class Eggs extends React.Component {
  state = {
    visible: false,
  }

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount() {
    if (localStorage.getItem(EGG_KEY) || !at()) return
    const image = new window.Image()
    image.src = imageURL
    image.onload = () => this.setState({ visible: true })
  }

  componentDidUpdate() {
    document.body.parentNode.style.overflow = this.state.visible ? 'hidden' : ''
  }

  handleClose() {
    localStorage.setItem(EGG_KEY, Date.now())
    this.setState({ visible: false })
  }

  renderContent() {
    return (
      <Mask>
        <Wrapper>
          <Image src={imageURL} alt="Happy New Year" />
          <Close onClick={this.handleClose}>{icons.Close}</Close>
        </Wrapper>
      </Mask>
    )
  }

  render() {
    const { visible } = this.state
    if (!visible) return null
    return ReactDOM.createPortal(this.renderContent(), container)
  }
}

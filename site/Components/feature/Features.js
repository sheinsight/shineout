import React from 'react'
import { Button } from 'shineout'
import PropTypes from 'prop-types'
import { Carousel, Image } from 'shineout'
import { featureClass } from '../../styles'
import history from '../../history'

const Feature = ({ feature }) => {
  const desc = Array.isArray(feature.description) ? feature.description : [feature.description]
  return (
    <div className={featureClass('feature')}>
      {feature.image && (
        <div className={featureClass('image')} style={{ background: feature.bg }}>
          <Image src={feature.image} height={160} />
        </div>
      )}
      <div className={featureClass('desc')}>
        {desc.map((d, i) => (
          <p key={i}>
            <span className={featureClass('line-icon')} />
            <span dangerouslySetInnerHTML={{ __html: d }} />
          </p>
        ))}
      </div>
    </div>
  )
}

Feature.propTypes = {
  feature: PropTypes.shape(),
}

export default class Features extends React.Component {
  state = {
    current: 0,
  }

  componentDidMount() {
    document.body.parentNode.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.parentNode.style.overflow = ''
  }

  getCurrentFeature() {
    const { current } = this.state
    const { features } = this.props
    return features[current]
  }

  handleMove = index => {
    this.setState({ current: index })
  }

  handleClose = (e, force) => {
    const { onClose } = this.props
    if (e.target === e.currentTarget || force) onClose()
  }

  handleMore = () => {
    const { onClose } = this.props
    const { url } = this.getCurrentFeature()
    onClose()
    history.push(url)
  }

  renderHeader() {
    const feature = this.getCurrentFeature()
    return <div className={featureClass('header')}>{feature.title}</div>
  }

  renderContent() {
    const { features } = this.props
    return (
      <div className={featureClass('content')}>
        <Carousel onMove={this.handleMove}>
          {features.map(feature => (
            <Feature feature={feature} key={feature.title} />
          ))}
        </Carousel>
      </div>
    )
  }

  renderFooter() {
    const { onClose } = this.props
    const feature = this.getCurrentFeature()
    return (
      <div className={featureClass('footer')}>
        <Button
          disabled={!feature.url}
          onClick={this.handleMore}
          className={featureClass('more')}
          type="primary"
          size="large"
        >
          了解更多
        </Button>
        <Button className={featureClass('dismiss')} text onClick={onClose}>
          已经知道了，不需要了解
        </Button>
      </div>
    )
  }

  render() {
    return (
      <div className={featureClass('mask')} onClick={this.handleClose}>
        <div className={featureClass('modal')}>
          {this.renderHeader()}
          {this.renderContent()}
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}

Features.propTypes = {
  onClose: PropTypes.func,
  features: PropTypes.array,
}

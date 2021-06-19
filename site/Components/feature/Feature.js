import React from 'react'
import { Button } from 'shineout'
import PropTypes from 'prop-types'
import { Carousel, Image } from 'shineout'
import { featureClass } from '../../styles'

const features = [
  {
    title: '【功能优化】Select多选项合并展示优化',
    bg: '#197AFA',
    image: '/images/feature/1.6.5-rc.12-compressed.png',
    description: [
      '<b>优化前：</b><span>展示合并选中值时，仅能显示1个值，其余被隐藏至数量中，鼠标移入数量标签显示全部值。这会导致空间有很多的情况下，用户却不能直观获得更多的信息。</span>',
      '<b>优化后：</b><span>选中值可以根据选择框宽度展示更多内容，且支持选根据择框宽度的改变去自适应展示内容。用户可以在宽度范围内获取更多的信息。</span>',
    ],
    url: '/components/Select#heading-01-multiple',
  },
  {
    title: 'Hello',
    description: 'world',
  },
]

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
    return features[current]
  }

  handleMove = index => {
    this.setState({ current: index })
  }

  handleClose = e => {
    const { onClose } = this.props
    if (e.target === e.currentTarget) onClose()
  }

  handleMore = () => {
    const { onClose } = this.props
    const { url } = this.getCurrentFeature()
    onClose()
    window.location.href = url
  }

  renderHeader() {
    const feature = this.getCurrentFeature()
    return <div className={featureClass('header')}>{feature.title}</div>
  }

  renderContent() {
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
}

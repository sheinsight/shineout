/**
 * cn - 基本用法
 *    -- 轮播组件提供了三种动画过渡方式，可以切换选项查看效果
 * en - Base
 *    -- The carousel component provides three modes of animation transition. Change the option to view the result.
 */
import React, { Component } from 'react'
import { Carousel, Select } from 'shineout'

const containerStyle = {
  fontSize: 40,
  color: '#fff',
  display: 'flex',
  margin: 'auto',
}

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      interval: 5000,
      animation: 'slide',
      indicatorType: 'circle',
      indicatorPosition: 'center',
    }
  }

  propChange(key, value) {
    this.setState({ [key]: value })
  }

  render() {
    const { interval, animation, indicatorPosition, indicatorType } = this.state

    return (
      <div>
        <div style={{ marginBottom: 20 }}>
          animation:{' '}
          <Select
            data={['slide', 'slide-y', 'fade']}
            keygen
            style={{ width: 100 }}
            value={animation}
            size="small"
            onChange={this.propChange.bind(this, 'animation')}
          />
          {'　indicatorPosition: '}
          <Select
            data={['left', 'center', 'right']}
            keygen
            style={{ width: 90 }}
            value={indicatorPosition}
            size="small"
            onChange={this.propChange.bind(this, 'indicatorPosition')}
          />
          {'　indicatorType: '}
          <Select
            data={['circle', 'number', 'line']}
            keygen
            style={{ width: 90 }}
            value={indicatorType}
            size="small"
            onChange={this.propChange.bind(this, 'indicatorType')}
          />
        </div>

        <Carousel
          style={{ width: 500, height: 300 }}
          interval={interval}
          animation={animation}
          indicatorPosition={indicatorPosition}
          indicatorType={indicatorType}
        >
          <div style={{ background: '#666', display: 'flex' }}>
            <div style={containerStyle}>Page 1</div>
          </div>
          <div style={{ background: '#fa8c16', display: 'flex' }}>
            <div style={containerStyle}>Page 2</div>
          </div>
          <div style={{ background: '#eb2f96', display: 'flex' }}>
            <div style={containerStyle}>Page 3</div>
          </div>
          <a>
            <img alt="" style={{ width: '100%', height: '100%' }} src="../../../images/1_b.jpg" />
          </a>
        </Carousel>
      </div>
    )
  }
}

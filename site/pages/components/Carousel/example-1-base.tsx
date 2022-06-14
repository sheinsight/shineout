/**
 * cn - 基本用法
 *    -- 轮播组件提供了三种动画过渡方式，可以切换选项查看效果
 * en - Base
 *    -- The carousel component provides three modes of animation transition. Change the option to view the result.
 */
import React, { useState } from 'react'
import { Carousel, Select, TYPE } from 'shineout'

type CarouselProps = TYPE.Carousel.Props
type Animation = CarouselProps['animation']
type IndicatorType = CarouselProps['indicatorType']
type IndicatorPosition = CarouselProps['indicatorPosition']

const containerStyle = {
  fontSize: 40,
  color: '#fff',
  display: 'flex',
  margin: 'auto',
}

const App: React.FC = () => {
  const [interval] = useState(5000)
  const [animation, setAnimation] = useState<Animation>('slide')
  const [indicatorType, setIndicatorType] = useState<IndicatorType>('circle')
  const [indicatorPosition, setIndicatorPosition] = useState<IndicatorPosition>('center')

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        animation:
        <Select
          keygen
          size="small"
          value={animation}
          style={{ width: 100 }}
          onChange={v => setAnimation(v)}
          data={['slide', 'slide-y', 'fade']}
        />
        {'indicatorPosition: '}
        <Select
          keygen
          size="small"
          style={{ width: 90 }}
          value={indicatorPosition}
          data={['left', 'center', 'right']}
          onChange={v => setIndicatorPosition(v)}
        />
        {'indicatorType: '}
        <Select
          keygen
          size="small"
          style={{ width: 90 }}
          value={indicatorType}
          data={['circle', 'number', 'line']}
          onChange={v => setIndicatorType(v)}
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

export default App

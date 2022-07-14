/**
 * cn - 自定义 Indicator
 *    -- 当 indicatorType 为函数时，可以自定义 Indicator
 * en - Custom Indicator
 *    -- Indicators can be customized when indicatorType is a function.
 */
import React from 'react'
import { Carousel } from 'shineout'
import classnames from 'classnames'
import './style-2-custom-indicator.less'

const duration = 5000
const containerStyle = {
  fontSize: 40,
  color: '#fff',
  display: 'flex',
  margin: 'auto',
}

const items = ['S', 'H', 'I', 'N', 'E']

function indicatorSwitch(current, moveTo) {
  return (
    <div className="indicator">
      {items.map((item, index) => {
        const isActive = current === index
        const itemClassname = classnames('indicator-item', isActive && 'active')
        const animationStyle = isActive ? { animation: `indicator-rise ${duration / 1000}s linear` } : {}
        return (
          <div key={item} onClick={() => moveTo(index)} className={itemClassname}>
            <span>{item}</span>
            <div className="indicator-progress">
              <div className="fg" style={animationStyle} />
              <div className="bg" />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function() {
  return (
    <Carousel indicatorType={indicatorSwitch} style={{ width: 500, height: 300 }} interval={duration}>
      {items.map(item => (
        <div key={item} style={{ background: '#2e97f1', display: 'flex' }}>
          <div style={containerStyle}>{item}</div>
        </div>
      ))}
    </Carousel>
  )
}

/* style-2-custom-indicator.css
@keyframes indicator-rise {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
div.indicator {
  text-align: center;
  user-select: none;
  float: left;
}
div.indicator-item {
  margin-right: 10px;
  float: left;
  width: 36px;
  height: 30px;
  font-size: 20px;
  color: #ffffff50;
  cursor: pointer;
}
div.indicator-item.active {
  color: #fff;
}
div.indicator .indicator-progress {
  position: relative;
}
div.indicator .indicator-progress > div {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
}
div.indicator .indicator-progress .bg {
  width: 100%;
  background: #ffffff50;
}
div.indicator .indicator-progress .fg {
  width: 0;
  background: #ffffff;
}
*/

import React from 'react'
import { Button } from 'shineout'
import classGenerate from '../../utils/classname'
import locate from '../../locate'
import Icon from '../../icons/Icon'

const homeClass = classGenerate(require('../../styles/home.less'), 'home')

function Home() {
  return (
    <div className={homeClass('_')}>
      <div className={homeClass('left')}>
        <div className={homeClass('content')}>
          <h2>SHINEOUT</h2>
          <div>
            {
              locate('一个更加『轻量』和『快速』的基于React的桌面端组件库', 'A components library for React')
            }
          </div>
          <div className={homeClass('buttons')}>
            <Button type="primary" href="#/components">{locate('开始使用', 'Start')}</Button>
            <Button style={{ marginLeft: 20 }} href="https://github.com/sheinsight/shineout"><Icon name="github" /> GitHub</Button>
          </div>
        </div>

        <div className={homeClass('bottom-left')}>
          <svg viewBox="0 0 975 493">
            <defs>
              <linearGradient x1="100%" y1="55.2864611%" x2="0.25781251%" y2="55.2864583%" id="shineout-html-left-bottom">
                <stop stopColor="#31309F" offset="0%" />
                <stop stopColor="#0B054F" offset="100%" />
              </linearGradient>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(0.000000, -587.000000)" fill="url(#shineout-html-left-bottom)">
                <path d="M0.0743965568,587 C-0.0247988523,588.217347 -0.0247988523,752.550681 0.0743965568,1080 C650.004337,1082.07504 974.795719,1082.07504 974.448542,1080 C525.920113,768.033011 190.802369,987.428247 0.0743965568,587 Z" />
              </g>
            </g>
          </svg>
        </div>
      </div>
      <div className={homeClass('right')}>
        <div className={homeClass('img')}>
          <img src="../images/components.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home

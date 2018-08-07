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
            一个更加『轻量』和『快速』的基于React的桌面端组件库
            <br />
            支持 React &gt; 16; 支持 10000+ 数据;
          </div>
          <div className={homeClass('buttons')}>
            <Button type="primary" href="#/components">{locate('开始使用', 'Start')}</Button>
            <Button style={{ marginLeft: 20 }} href="https://github.com/UncaughtError/Shineout"><Icon name="github" /> Github</Button>
          </div>
        </div>

        <div className={homeClass('bottom-left')}>
          <svg viewBox="0 0 974 491">
            <defs>
              <linearGradient x1="100%" y1="55.2864611%" x2="0.25781251%" y2="55.2864583%" id="shineout-html-left-bottom">
                <stop stopColor="#31309F" offset="0%" />
                <stop stopColor="#0B054F" offset="100%" />
              </linearGradient>
            </defs>
            <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g transform="translate(0.000000, -589.000000)" fill="url(#shineout-html-left-bottom)">
                <path d="M0.0743965568,589 C-0.0247988523,590.216158 -0.0247988523,753.697905 0.0743965568,1079.44524 C649.705124,1081.51825 974.346899,1081.51825 973.999722,1079.44524 C525.471293,767.7831 190.802369,989.036958 0.0743965568,589 Z" />
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

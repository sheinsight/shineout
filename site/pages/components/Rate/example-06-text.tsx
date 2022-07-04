/**
 * cn - 附加文字
 *    -- text 属性可以为每个选项附加文字
 * en - Text
 *    -- Set text property to append text to each item.
 */
import React from 'react'
import { Rate } from 'shineout'
import FontAwesome from '../Icon/FontAwesome'

const star = <FontAwesome name="star" />
const StarRate = Rate(star, star)

const App: React.FC = () => <StarRate defaultValue={4} text={['poor', 'fair', 'good', 'very good', 'excellent']} />

export default App

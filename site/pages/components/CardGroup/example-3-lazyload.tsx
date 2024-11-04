/**
 * cn - 懒加载
 *    -- 设置 Item 的 placeholder 后会开启懒加载
 *    -- placeholder 必须要有一定的高度，否则懒加载无法有效果
 * en - Lazyload
 *    -- enable lazyload while set placeholder on Item
 *    -- placehoder's height should beyond zero
 */
import React from 'react'
import { CardGroup, Spin, TYPE, Image } from 'shineout'

const Icon = (_props: any) => <span>i</span>

type CardGroupItemProps = TYPE.CardGroup.ItemProps<any>

function ImageDemo() {
  const images = [
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-01.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-02.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-03.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-04.png',
    'https://raw.githubusercontent.com/sheinsight/shineout-static/main/shineout-next/images/image/s-05.png',
  ]
  return (
    <div
      style={{
        gap: 16,
        width: '100%',
        display: 'flex',
      }}
    >
      <Image.Group target="_modal" pile lazy>
        {images.map((item, index) => (
          <Image inViewOnly key={index} width={128} height={128} src={item} href={item} />
        ))}
      </Image.Group>

      <Image.Group target="_modal" pile lazy>
        {images.map((item, index) => (
          <Image inViewOnly key={index} width={128} height={128} src={item} href={item} />
        ))}
      </Image.Group>
    </div>
  )
}

interface ItemData {
  title: string
  icon: string
  color: string
}

function generateRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`
}

function generateData(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    title: `Item ${index + 1}`,
    icon: 'star',
    color: generateRandomColor(),
  }))
}

const data: ItemData[] = generateData(100)

// type ElementType = HTMLElement

// interface UseInViewOptions {
//   root?: HTMLElement | null
//   rootMargin?: string
//   threshold?: number | number[]
//   once?: boolean // 是否只触发一次
// }

// const useInView = <T extends ElementType>(options: UseInViewOptions = {}) => {
//   const elementRef = useRef<T | null>(null)
//   const [isInView, setIsInView] = useState(false)
//   const [wasInView, setWasInView] = useState(false)

//   useEffect(() => {
//     const element = elementRef.current
//     if (!element) return

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         const inView = entry.isIntersecting
//         setIsInView(inView)

//         if (inView) {
//           setWasInView(true)
//           // 如果设置了 once 选项，且元素已经出现过，则取消观察
//           if (options.once) {
//             observer.disconnect()
//           }
//         }
//       },
//       {
//         root: options.root || null,
//         rootMargin: options.rootMargin || '0px',
//         threshold: options.threshold || 0,
//       }
//     )

//     observer.observe(element)

//     return () => {
//       observer.disconnect()
//     }
//   }, [options.root, options.rootMargin, options.threshold, options.once])

//   return { ref: elementRef, isInView, wasInView }
// }

function Item({ title, icon, color }: ItemData) {
  // const { ref, isInView } = useInView<HTMLDivElement>();
  return (
    <div style={{ padding: 20 }}>
      <div>
        <div
          style={{
            width: 40,
            height: 40,
            display: 'inline-flex',
            borderRadius: '50%',
            background: `${color}20`,
          }}
        >
          <Icon name={icon} fontSize={14} style={{ margin: 'auto', color }} />
        </div>
        <span
          style={{
            marginInlineStart: 12,
            fontSize: 16,
            fontWeight: 500,
            color: 'rgba(51,62,89,1)',
          }}
        >
          {title}
        </span>
      </div>
      <p style={{ margin: '20px 0', fontSize: 14, color: 'rgba(153,157,168,1)' }}>
        Add or delete tag for your customer. You can sort your customer...
        <ImageDemo />
      </p>
      <div style={{ color: 'rgba(102,108,124,1)' }}>
        <Icon name="plus" style={{ marginInlineEnd: 6 }} />
        Add This
      </div>
    </div>
  )
}

const placeholder: CardGroupItemProps['placeholder'] = (
  <div style={{ width: '100%', height: 50, display: 'flex' }}>
    <Spin style={{ margin: 'auto' }} />
  </div>
)

const App: React.FC = () => (
  <CardGroup height={400} columns={4} lazy>
    {data.map(v => (
      <CardGroup.Item key={v.title} placeholder={placeholder}>
        <Item {...v} />
      </CardGroup.Item>
    ))}
  </CardGroup>
)

export default App

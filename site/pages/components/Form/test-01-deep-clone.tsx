/**
 * cn - deepClone=false 受控模式交互测试
 *    -- 测试 deepClone={false} 在受控模式下的各种外部修改模式。左侧为 deepClone=true，右侧为 deepClone=false。
 *    -- ④⑤⑥ 通过 datum.getValue() 拿到值后直接 mutate 嵌套对象，再 datum.setValue() 写回，模拟真实的"拿到 onChange value 后直接修改"场景。
 * en - deepClone=false Controlled Mode Interactive Test
 *    -- Test various external value modification patterns with deepClone={false} in controlled mode.
 */
import React, { useState, useRef } from 'react'
import { Form, Input } from 'shineout'

interface FormValue {
  name: string
  user: {
    firstName: string
    address: {
      city: string
      zip: string
    }
  }
  tags: string[]
  note: string
}

const initialValue: FormValue = {
  name: 'Alice',
  user: {
    firstName: 'Alice',
    address: { city: 'Beijing', zip: '100000' },
  },
  tags: ['react', 'typescript'],
  note: 'hello',
}

function deepCopyInitial(): FormValue {
  return JSON.parse(JSON.stringify(initialValue))
}

type LogEntry = { time: string; label: string; msg: string; ok: boolean }

function addLog(logs: LogEntry[], label: string, msg: string, ok = true): LogEntry[] {
  const time = new Date().toLocaleTimeString('zh-CN', { hour12: false })
  return [{ time, label, msg, ok }, ...logs].slice(0, 30)
}

interface PanelProps {
  title: string
  titleColor: string
  deepClone: boolean
}

function Panel({ title, titleColor, deepClone }: PanelProps) {
  const [value, setValue] = useState<FormValue>(deepCopyInitial())
  const [logs, setLogs] = useState<LogEntry[]>([])
  const datumRef = useRef<any>(null)
  const renderCount = useRef(0)
  renderCount.current += 1

  function log(label: string, msg: string, ok = true) {
    setLogs(prev => addLog(prev, label, msg, ok))
  }

  // 操作 1：✅ 展开 + 修改顶层字段
  function op1() {
    setValue(v => {
      const next = { ...v, name: v.name === 'Alice' ? 'Bob' : 'Alice' }
      log('①顶层替换', `name: "${v.name}" → "${next.name}"`)
      return next
    })
  }

  // 操作 2：✅ 正确不可变更新深层字段（展开到修改层）
  function op2() {
    setValue(v => {
      const cities = ['Beijing', 'Shanghai', 'Guangzhou', 'Shenzhen']
      const next = cities[(cities.indexOf(v.user.address.city) + 1) % cities.length]
      log('②深层不可变', `city: "${v.user.address.city}" → "${next}"`)
      return { ...v, user: { ...v.user, address: { ...v.user.address, city: next } } }
    })
  }

  // 操作 3：✅ 数组追加（不可变）
  function op3() {
    setValue(v => {
      const newTag = `tag${v.tags.length + 1}`
      log('③数组追加', `tags: [..., "${newTag}"]`)
      return { ...v, tags: [...v.tags, newTag] }
    })
  }

  // 操作 4：模拟"拿到 onChange value 后直接 mutate 嵌套字段再 setValue"
  // 通过 datum.getValue() 拿值（deepClone=true 得深拷贝，=false 得浅拷贝），
  // 直接修改嵌套对象，再调 datum.setValue() 写回。
  // deepClone=true：getValue 深拷贝，v.user !== $values.user，mutate 不污染 $values，
  //                 deepEqual 检测到变化 → 字段正常更新 ✅
  // deepClone=false：getValue 浅拷贝，v.user === $values.user，mutate 同时污染 $values，
  //                  deepEqual 认为没变化 → setValue 跳过，字段不更新 ⚠️
  function op4() {
    const datum = datumRef.current
    if (!datum) return
    const v = datum.getValue() // 关键：拿 datum 的值，而不是 React state
    const old = v.user.firstName
    v.user.firstName = v.user.firstName === 'Alice' ? 'MUTATED' : 'Alice' // 直接 mutate 嵌套
    log('④直接mutate嵌套', `user.firstName: "${old}" → "${v.user.firstName}"`, deepClone)
    datum.setValue({ ...v }) // 顶层展开后写回
    setValue(datum.getValue())
  }

  // 操作 5：模拟"直接 mutate 深层字段再 setValue"
  function op5() {
    const datum = datumRef.current
    if (!datum) return
    const v = datum.getValue()
    const old = v.user.address.zip
    v.user.address.zip = v.user.address.zip === '100000' ? '999999' : '100000' // 深层 mutate
    log('⑤直接mutate深层', `user.address.zip: "${old}" → "${v.user.address.zip}"`, deepClone)
    datum.setValue({ ...v })
    setValue(datum.getValue())
  }

  // 操作 6：模拟"直接 push 数组再 setValue"
  function op6() {
    const datum = datumRef.current
    if (!datum) return
    const v = datum.getValue()
    v.tags.push('pushed') // 直接 mutate 数组
    log('⑥数组直接push', `tags.push("pushed")，长度: ${v.tags.length}`, deepClone)
    datum.setValue({ ...v })
    setValue(datum.getValue())
  }

  // 操作 7：✅ 重置为初始值
  function op7() {
    const fresh = deepCopyInitial()
    setValue(fresh)
    if (datumRef.current) datumRef.current.setValue(fresh, undefined, true)
    log('⑦重置', '整体替换为初始值')
  }

  const ops = [
    { label: '① 顶层替换 ✅', fn: op1, ok: true },
    { label: '② 深层不可变更新 ✅', fn: op2, ok: true },
    { label: '③ 数组追加-不可变 ✅', fn: op3, ok: true },
    { label: '④ 直接mutate嵌套字段', fn: op4, ok: deepClone },
    { label: '⑤ 直接mutate深层字段', fn: op5, ok: deepClone },
    { label: '⑥ 数组直接push', fn: op6, ok: deepClone },
    { label: '⑦ 重置初始值 ✅', fn: op7, ok: true },
  ]

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
          padding: '6px 10px',
          background: titleColor,
          borderRadius: 4,
        }}
      >
        <strong style={{ color: '#fff', fontSize: 13 }}>{title}</strong>
        <span style={{ marginLeft: 'auto', fontSize: 11, color: 'rgba(255,255,255,0.85)' }}>
          渲染次数: {renderCount.current}
        </span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
        {ops.map(op => (
          <button
            key={op.label}
            onClick={op.fn}
            style={{
              padding: '3px 8px',
              fontSize: 11,
              cursor: 'pointer',
              border: `1px solid ${op.ok ? '#52c41a' : '#faad14'}`,
              borderRadius: 3,
              background: op.ok ? '#f6ffed' : '#fffbe6',
              color: op.ok ? '#389e0d' : '#ad6800',
              whiteSpace: 'nowrap',
            }}
          >
            {op.label}{!op.ok ? ' ⚠️' : ''}
          </button>
        ))}
      </div>

      <Form
        value={value}
        onChange={newVal => {
          log('onChange', `触发，name="${(newVal as any).name}"`)
          setValue(newVal as FormValue)
        }}
        deepClone={deepClone}
        labelWidth={100}
        style={{ fontSize: 12 }}
        onDatumBind={(d: any) => { datumRef.current = d }}
      >
        <Form.Item label="name">
          <Input name="name" />
        </Form.Item>
        <Form.Item label="firstName">
          <Input name="user.firstName" />
        </Form.Item>
        <Form.Item label="city">
          <Input name="user.address.city" />
        </Form.Item>
        <Form.Item label="zip">
          <Input name="user.address.zip" />
        </Form.Item>
        <Form.Item label="note">
          <Input name="note" />
        </Form.Item>
        <Form.Item label="tags[0]（datum绑定）">
          <Input name="tags[0]" />
        </Form.Item>
        <Form.Item label="tags（React state）">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '4px 0' }}>
            {(value.tags || []).map((tag, i) => (
              <span
                key={i}
                style={{
                  padding: '1px 8px',
                  background: '#e6f4ff',
                  border: '1px solid #91caff',
                  borderRadius: 10,
                  fontSize: 11,
                  color: '#1677ff',
                }}
              >
                {tag}
              </span>
            ))}
            {value.tags?.length === 0 && (
              <span style={{ color: '#ccc', fontSize: 11 }}>（空）</span>
            )}
          </div>
        </Form.Item>
      </Form>

      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 2 }}>当前 React state value：</div>
        <pre
          style={{
            margin: 0,
            padding: '6px 8px',
            background: '#f5f5f5',
            borderRadius: 3,
            fontSize: 11,
            maxHeight: 140,
            overflow: 'auto',
          }}
        >
          {JSON.stringify(value, null, 2)}
        </pre>
      </div>

      <div style={{ marginTop: 8 }}>
        <div style={{ fontSize: 11, color: '#999', marginBottom: 2 }}>操作日志（最新在前）：</div>
        <div
          style={{
            maxHeight: 160,
            overflow: 'auto',
            border: '1px solid #e8e8e8',
            borderRadius: 3,
            fontSize: 11,
            fontFamily: 'monospace',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ padding: '8px', color: '#ccc' }}>暂无操作</div>
          ) : (
            logs.map((entry, i) => (
              <div
                key={i}
                style={{
                  padding: '3px 8px',
                  borderBottom: '1px solid #f0f0f0',
                  background: entry.ok ? undefined : '#fffbe6',
                  color: entry.ok ? '#222' : '#ad6800',
                }}
              >
                <span style={{ color: '#bbb' }}>{entry.time} </span>
                <span style={{ fontWeight: 600 }}>[{entry.label}]</span>{' '}
                {entry.msg}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

function Tips() {
  return (
    <div
      style={{
        marginBottom: 16,
        padding: '10px 14px',
        background: '#e6f4ff',
        borderRadius: 4,
        fontSize: 12,
        lineHeight: 1.8,
        border: '1px solid #91caff',
      }}
    >
      <strong>测试说明：</strong>
      <ul style={{ margin: '4px 0 0 0', paddingLeft: 16 }}>
        <li>
          <strong>①②③⑦</strong> 两侧行为一致，是推荐写法（展开到修改层，不可变更新）
        </li>
        <li>
          <strong>④⑤⑥</strong> 通过 <code>datum.getValue()</code> 拿值后直接 mutate 嵌套对象/数组，再写回，模拟不规范的"拿到 onChange value 直接改"场景：
          <br />
          → <strong style={{ color: '#1890ff' }}>deepClone=true（左）</strong>：getValue 深拷贝，mutate 不影响 $values，deepEqual 检测到变化，<strong>字段正常更新 ✅</strong>
          <br />
          → <strong style={{ color: '#52c41a' }}>deepClone=false（右）</strong>：getValue 浅拷贝，嵌套引用共享，mutate 同时污染 $values，deepEqual 认为没变而跳过，<strong>字段不更新 ⚠️</strong>
        </li>
        <li>
          注意表单里有两种 tags 展示：<code>tags[0]</code> 是 datum 绑定的 Input（靠 pub/sub 更新），
          <code>tags（React state）</code> 直接读 React state 渲染（靠 React rerender 更新）。
          操作⑥后右侧 <code>tags[0]</code> 不更新，但 React state 气泡会更新——说明 datum 内部已跳过，只是 React state 被触发了。
        </li>
      </ul>
    </div>
  )
}

const App: React.FC = () => (
  <div>
    <Tips />
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
      <Panel title="deepClone=true（默认）" titleColor="#1890ff" deepClone />
      <Panel title="deepClone=false" titleColor="#52c41a" deepClone={false} />
    </div>
  </div>
)

export default App

/**
 * cn - deepClone 性能 Benchmark
 *    -- 当表单数据量较大时，deepClone 会导致 onChange 性能下降。设置 deepClone={false} 可以使用浅拷贝替代深拷贝，提升性能。
 *    -- deepClone={false} 时 getValue 返回浅拷贝（新的顶层引用），受控模式下 React 可正常检测变化。
 * en - deepClone Performance Benchmark
 *    -- When the form data is large, deepClone may cause performance issues. Set deepClone={false} to use shallow clone instead of deep clone.
 *    -- When deepClone={false}, getValue returns a shallow copy (new top-level reference), so controlled mode works correctly.
 */
import React, { useState, useRef } from 'react'
import { Form, Input, Button } from 'shineout'

function generateLargeValue() {
  const value: any = {}
  const groups = ['user', 'address', 'order', 'payment', 'shipping', 'preference', 'extra', 'meta']
  groups.forEach(group => {
    value[group] = { level1: {} }
    for (let i = 0; i < 30; i++) {
      value[group].level1[`field_${i}`] = { detail: `${group}_value_${i}` }
    }
  })
  return value
}

const groups = [
  { prefix: 'user', label: '用户信息' },
  { prefix: 'address', label: '地址信息' },
  { prefix: 'order', label: '订单信息' },
  { prefix: 'payment', label: '支付信息' },
  { prefix: 'shipping', label: '物流信息' },
  { prefix: 'preference', label: '偏好设置' },
  { prefix: 'extra', label: '扩展信息' },
  { prefix: 'meta', label: '元数据' },
]
const FIELD_COUNT = 30
const ITERATIONS = 100

const App: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([])
  const datumTrueRef = useRef<any>(null)
  const datumFalseRef = useRef<any>(null)

  const runBenchmark = () => {
    const results: string[] = []
    const largeValue = generateLargeValue()

    // --- getValue 对比 ---
    if (datumTrueRef.current) {
      const start = performance.now()
      for (let i = 0; i < ITERATIONS; i++) {
        datumTrueRef.current.getValue()
      }
      const cost = performance.now() - start
      results.push(`deepClone=true  getValue()  x${ITERATIONS} = ${cost.toFixed(2)}ms (avg ${(cost / ITERATIONS).toFixed(3)}ms)`)
    }

    if (datumFalseRef.current) {
      const start = performance.now()
      for (let i = 0; i < ITERATIONS; i++) {
        datumFalseRef.current.getValue()
      }
      const cost = performance.now() - start
      results.push(`deepClone=false getValue()  x${ITERATIONS} = ${cost.toFixed(2)}ms (avg ${(cost / ITERATIONS).toFixed(3)}ms)`)
    }

    results.push('')

    // --- setValue 对比 ---
    if (datumTrueRef.current) {
      const onChange = datumTrueRef.current.onChange
      datumTrueRef.current.onChange = undefined
      const start = performance.now()
      for (let i = 0; i < ITERATIONS; i++) {
        datumTrueRef.current.setValue({ ...largeValue, _tick: i })
      }
      const cost = performance.now() - start
      datumTrueRef.current.onChange = onChange
      results.push(`deepClone=true  setValue()  x${ITERATIONS} = ${cost.toFixed(2)}ms (avg ${(cost / ITERATIONS).toFixed(3)}ms)`)
    }

    if (datumFalseRef.current) {
      const onChange = datumFalseRef.current.onChange
      datumFalseRef.current.onChange = undefined
      const start = performance.now()
      for (let i = 0; i < ITERATIONS; i++) {
        datumFalseRef.current.setValue({ ...largeValue, _tick: i })
      }
      const cost = performance.now() - start
      datumFalseRef.current.onChange = onChange
      results.push(`deepClone=false setValue()  x${ITERATIONS} = ${cost.toFixed(2)}ms (avg ${(cost / ITERATIONS).toFixed(3)}ms)`)
    }

    results.push('')

    // --- 受控模式 roundtrip：模拟 getValue -> onChange -> setValue ---
    results.push('受控模式 roundtrip (getValue → setValue):')

    if (datumTrueRef.current) {
      const onChange = datumTrueRef.current.onChange
      datumTrueRef.current.onChange = undefined
      const start = performance.now()
      for (let i = 0; i < ITERATIONS; i++) {
        const v = datumTrueRef.current.getValue()
        datumTrueRef.current.setValue(v)
      }
      const cost = performance.now() - start
      datumTrueRef.current.onChange = onChange
      results.push(`deepClone=true  roundtrip x${ITERATIONS} = ${cost.toFixed(2)}ms (avg ${(cost / ITERATIONS).toFixed(3)}ms)`)
    }

    if (datumFalseRef.current) {
      const onChange = datumFalseRef.current.onChange
      datumFalseRef.current.onChange = undefined
      const start = performance.now()
      for (let i = 0; i < ITERATIONS; i++) {
        const v = datumFalseRef.current.getValue()
        datumFalseRef.current.setValue(v)
      }
      const cost = performance.now() - start
      datumFalseRef.current.onChange = onChange
      results.push(`deepClone=false roundtrip x${ITERATIONS} = ${cost.toFixed(2)}ms (avg ${(cost / ITERATIONS).toFixed(3)}ms)`)
    }

    results.push(`--- ${new Date().toLocaleTimeString()} ---`)
    setLogs(prev => [...results, '', ...prev].slice(0, 80))
  }

  const initialValue = generateLargeValue()

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Button type="primary" onClick={runBenchmark}>
          运行 Benchmark（getValue / setValue / roundtrip 各 x{ITERATIONS}）
        </Button>
        <span style={{ color: '#999', fontSize: 12, marginLeft: 12 }}>
          两个 Form 各 {groups.length * FIELD_COUNT} 个字段（嵌套 3-4 层）
        </span>
      </div>

      {/* 耗时日志 */}
      <div
        style={{
          background: '#1e1e1e',
          color: '#d4d4d4',
          padding: 12,
          borderRadius: 4,
          fontSize: 12,
          fontFamily: 'monospace',
          marginBottom: 16,
          maxHeight: 220,
          overflow: 'auto',
          whiteSpace: 'pre',
        }}
      >
        {logs.length === 0 ? (
          <span style={{ color: '#666' }}>点击 Benchmark 按钮查看对比结果...</span>
        ) : (
          logs.map((log, i) => {
            const color = log.includes('deepClone=false') ? '#4ec9b0' : log.includes('deepClone=true') ? '#9cdcfe' : '#666'
            return <div key={i} style={{ color }}>{log}</div>
          })
        )}
      </div>

      {/* 两个表单并排 */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1, maxHeight: 360, overflow: 'auto', border: '1px solid #e8e8e8', padding: 8, borderRadius: 4 }}>
          <h4 style={{ margin: '0 0 8px', color: '#1890ff', fontSize: 13 }}>deepClone=true（默认）</h4>
          <Form
            defaultValue={initialValue}
            deepClone
            onDatumBind={(d: any) => { datumTrueRef.current = d }}
          >
            {groups.map(group => (
              <div key={group.prefix} style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 11, color: '#999', marginBottom: 2 }}>{group.label}</div>
                {Array.from({ length: FIELD_COUNT }, (_, i) => (
                  <Form.Item key={i} style={{ marginBottom: 2 }}>
                    <Input name={`${group.prefix}.level1.field_${i}.detail`} style={{ width: '100%' }} />
                  </Form.Item>
                ))}
              </div>
            ))}
          </Form>
        </div>

        <div style={{ flex: 1, maxHeight: 360, overflow: 'auto', border: '1px solid #e8e8e8', padding: 8, borderRadius: 4 }}>
          <h4 style={{ margin: '0 0 8px', color: '#52c41a', fontSize: 13 }}>deepClone=false</h4>
          <Form
            defaultValue={initialValue}
            deepClone={false}
            onDatumBind={(d: any) => { datumFalseRef.current = d }}
          >
            {groups.map(group => (
              <div key={group.prefix} style={{ marginBottom: 4 }}>
                <div style={{ fontSize: 11, color: '#999', marginBottom: 2 }}>{group.label}</div>
                {Array.from({ length: FIELD_COUNT }, (_, i) => (
                  <Form.Item key={i} style={{ marginBottom: 2 }}>
                    <Input name={`${group.prefix}.level1.field_${i}.detail`} style={{ width: '100%' }} />
                  </Form.Item>
                ))}
              </div>
            ))}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default App

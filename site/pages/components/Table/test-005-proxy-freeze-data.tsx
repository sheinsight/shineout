/**
 * cn - 测试冻结对象
 *    -- 测试冻结对象
 * en - Test freeze object
 *    -- Test freeze object
 */
import React, { useState } from 'react'
import { Table } from 'shineout'
import { create } from '@shined/reactive'

const data = [
  {
    supplierCategoryId: 32,
    supplierCategoryName: '自主-成衣',
    detailConfigList: [
      {
        id: 808,
        configType: 6,
        configTypeName: '供应商分类和商品分类',
        configValue: '2062',
        configQuantity: -1,
        applyNo: 'QD24022807933116419',
        applyId: 920,
        applyStatus: 2,
        applyStatusName: '审批拒绝',
        configStatus: 3,
        configStatusName: '暂不可用',
        goodsLevelName: 'Vestidos de meninas',
        goodsLevelId: 2062,
        updateTime: '2024-02-28 16:48:45',
      },
    ],
  },
  {
    supplierCategoryId: 4044943,
    supplierCategoryName: 'ODM-成衣',
    detailConfigList: [
      {
        id: 821,
        configType: 6,
        configTypeName: '供应商分类和商品分类',
        configValue: '2339',
        configQuantity: 11234,
        applyNo: 'QD24080509884913667',
        applyId: 933,
        applyStatus: 3,
        applyStatusName: '审批通过',
        configStatus: 1,
        configStatusName: '启用',
        goodsLevelName: '连衣裙(women dresses zh-cn001)',
        goodsLevelId: 2339,
        updateTime: '2024-08-05 20:58:22',
      },
    ],
  },
  {
    supplierCategoryId: 19,
    supplierCategoryName: '常熟-成衣',
    detailConfigList: [
      {
        id: 796,
        configType: 6,
        configTypeName: '供应商分类和商品分类',
        configValue: '2339',
        configQuantity: 417,
        applyNo: 'QD23120705174956035',
        applyId: 918,
        applyStatus: 1,
        applyStatusName: '审批中',
        configStatus: 1,
        configStatusName: '启用',
        goodsLevelName: '连衣裙(women dresses zh-cn001)',
        goodsLevelId: 2339,
        updateTime: '2023-12-07 10:58:01',
      },
    ],
  },
  {
    supplierCategoryId: 4,
    supplierCategoryName: '十三行下的第一个子类目',
    detailConfigList: [
      {
        id: 806,
        configType: 6,
        configTypeName: '供应商分类和商品分类',
        configValue: '10011380',
        configQuantity: 400,
        applyNo: 'QD23110810001797122',
        applyId: 908,
        applyStatus: 3,
        applyStatusName: '审批通过',
        configStatus: 2,
        configStatusName: '禁用',
        goodsLevelName: null,
        goodsLevelId: 10011380,
        updateTime: '2025-01-07 14:57:43',
      },
    ],
  },
  {
    supplierCategoryId: 87,
    supplierCategoryName: 'VMI-配饰',
    detailConfigList: [
      {
        id: 805,
        configType: 6,
        configTypeName: '供应商分类和商品分类',
        configValue: '11322',
        configQuantity: 400,
        applyNo: 'QD23110810001797122',
        applyId: 908,
        applyStatus: 3,
        applyStatusName: '审批通过',
        configStatus: 2,
        configStatusName: '禁用',
        goodsLevelName: '碎花布料',
        goodsLevelId: 11322,
        updateTime: '2023-11-08 21:12:24',
      },
    ],
  },
  {
    supplierCategoryId: 3578,
    supplierCategoryName: '考核测试',
    detailConfigList: [
      {
        id: 807,
        configType: 6,
        configTypeName: '供应商分类和商品分类',
        configValue: '1896',
        configQuantity: 20,
        applyNo: 'QD24022807891042304',
        applyId: 919,
        applyStatus: 3,
        applyStatusName: '审批通过',
        configStatus: 1,
        configStatusName: '启用',
        goodsLevelName: '运动服',
        goodsLevelId: 1896,
        updateTime: '2024-07-01 13:41:11',
      },
    ],
  },
  {
    supplierCategoryId: 14,
    supplierCategoryName: 'AL-围巾',
    detailConfigList: [
      {
        id: 819,
        configType: 6,
        configTypeName: '供应商分类和商品分类',
        configValue: '1984',
        configQuantity: 798,
        applyNo: 'QD24071007465177090',
        applyId: 931,
        applyStatus: 3,
        applyStatusName: '审批通过',
        configStatus: 1,
        configStatusName: '启用',
        goodsLevelName: '男士牛仔外套',
        goodsLevelId: 1984,
        updateTime: '2024-07-10 15:49:30',
      },
    ],
  },
]
const columns = [
  {
    title: '供应商二级分类',
    render: 'supplierCategoryName',
    width: 120,
    treeColumnsName: 'detailConfigList',
  },
  {
    title: '商品末级分类',
    render: 'goodsLevelName',
    width: 100,
  },
]

// const reactiveStore = create(data)
// const proxyData = new Proxy(data, {
//   get(target, prop) {
//     // console.log(`Getting property ${String(prop)}`)
//     return Object.freeze(target[prop])
//   },
//   set(target, prop, value) {
//     // console.log(`Setting property ${String(prop)} to ${value}`)
//     target[prop] = value
//     return true
//   },
// })

const App = () => {
  // const reactiveData = reactiveStore.useSnapshot()
  const [selected, setSelected] = useState([])
  return (
    <div>
      <Table
        bordered
        keygen={d => d.id || +d.supplierCategoryId}
        data={data}
        // data={proxyData}
        // data={reactiveData}
        treeCheckAll
        columns={columns}
        value={selected}
        onRowSelect={selected => setSelected(selected)}
      />
      <div>
        勾选数：
        {selected.length}
      </div>
    </div>
  )
}
export default App

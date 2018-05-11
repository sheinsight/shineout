/**
 * cn - 基本用法
 * en - Overview
 */
import React from 'react'
import { Table } from 'shineout'

const data = [{
  warehouse_name: '广州仓', receipt_code: 'SH18051100005', purchase_code: '450530', supplier_name: '青岛饰品', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 8.14, purchase_total_count: 1, in_storage_count: 0, receipt_total_count: 2, receipt_total_ctn: 1, defective_count: 0, merchandiser_name: '马金明', purchase_time: '2018-01-17 11:08:13', receipt_name: '钟嘉慧', receipt_time: '2018-05-11 11:06:39',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051100004', purchase_code: '450536', supplier_name: '青岛饰品', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 10.79, purchase_total_count: 1, in_storage_count: 0, receipt_total_count: 5, receipt_total_ctn: 1, defective_count: 0, merchandiser_name: '马金明', purchase_time: '2018-01-17 11:08:01', receipt_name: '钟嘉慧', receipt_time: '2018-05-11 11:06:38',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051100003', purchase_code: '451987', supplier_name: '青岛饰品', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 100.00, purchase_total_count: 10, in_storage_count: 0, receipt_total_count: 8, receipt_total_ctn: 1, defective_count: 0, merchandiser_name: '马金明', purchase_time: '2018-05-08 18:08:34', receipt_name: '钟嘉慧', receipt_time: '2018-05-11 11:06:37',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051100002', purchase_code: '451991', supplier_name: '青岛饰品', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 100.00, purchase_total_count: 10, in_storage_count: 0, receipt_total_count: 5, receipt_total_ctn: 1, defective_count: 0, merchandiser_name: '马金明', purchase_time: '2018-05-11 10:59:05', receipt_name: '钟嘉慧', receipt_time: '2018-05-11 11:06:36',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051100001', purchase_code: '452155', supplier_name: '青岛饰品', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 100.00, purchase_total_count: 10, in_storage_count: 0, receipt_total_count: 10, receipt_total_ctn: 1, defective_count: 0, merchandiser_name: '马金明', purchase_time: '2018-05-11 10:59:03', receipt_name: '钟嘉慧', receipt_time: '2018-05-11 11:06:33',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000036', purchase_code: '3822', supplier_name: '供应商2089', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 11:39:01',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000035', purchase_code: '385', supplier_name: '严靖', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:17:21',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000034', purchase_code: '3822', supplier_name: '供应商2089', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 11:39:01',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000033', purchase_code: '3822', supplier_name: '供应商2089', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 11:39:01',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000032', purchase_code: '385', supplier_name: '曹聪', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:17:21',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000031', purchase_code: '3822', supplier_name: '供应商2089', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 11:39:01',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000030', purchase_code: '385', supplier_name: '曹聪', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:17:21',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000029', purchase_code: '385', supplier_name: '曹聪', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:17:21',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000028', purchase_code: '385', supplier_name: '曹聪', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:17:21',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000027', purchase_code: '385', supplier_name: '曹聪', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:17:21',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000026', purchase_code: '385', supplier_name: '严靖', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:17:21',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000025', purchase_code: '4310', supplier_name: '严靖', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:11:31',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000024', purchase_code: '4311', supplier_name: '严靖', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 15:11:29',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000023', purchase_code: '1252', supplier_name: '严靖', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 14:56:06',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000022', purchase_code: '451445', supplier_name: '曹聪', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 30, in_storage_count: 0, receipt_total_count: 30, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 14:38:23',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000021', purchase_code: '451444', supplier_name: '曹聪', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 0.00, purchase_total_count: 30, in_storage_count: 0, receipt_total_count: 0, receipt_total_ctn: 0, defective_count: 0, merchandiser_name: '', purchase_time: '2018-05-10 14:51:50', receipt_name: '曹聪', receipt_time: '2018-05-10 14:51:50',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000020', purchase_code: '451444', supplier_name: '曹聪', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 0.00, purchase_total_count: 30, in_storage_count: 0, receipt_total_count: 0, receipt_total_ctn: 0, defective_count: 0, merchandiser_name: '', purchase_time: '2018-05-10 14:49:03', receipt_name: '曹聪', receipt_time: '2018-05-10 14:49:03',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000019', purchase_code: '451444', supplier_name: '曹聪', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 30, in_storage_count: 0, receipt_total_count: 30, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 14:38:23',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000018', purchase_code: '3822', supplier_name: '供应商2089', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 11:39:01',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000017', purchase_code: '450352', supplier_name: '供应商2089', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 14:16:44',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000016', purchase_code: '3822', supplier_name: '供应商2089', purchase_type_description: 'ODM外协', original_type: 'ODM', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 11:39:01',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000015', purchase_code: '451640', supplier_name: '供应商2089', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 13:46:59',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000014', purchase_code: '451642', supplier_name: '供应商2089', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 13:42:18',
}, {
  warehouse_name: '广州仓', receipt_code: 'SH18051000012', purchase_code: '452279', supplier_name: '供应商2089', purchase_type_description: '生产大货', original_type: 'FOB', sub_type_description: '急采', status_description: '已收货', sku_count: 1, purchase_total_amount: 281.00, purchase_total_count: 100, in_storage_count: 0, receipt_total_count: 100, receipt_total_ctn: 50, defective_count: 0, merchandiser_name: '跟单员', purchase_time: '2018-05-01 00:00:00', receipt_name: '收货人', receipt_time: '2018-05-10 13:28:45',
}]

const columns = [{
  key: '1',
  title: '仓库',
  render: 'warehouse_name',
  width: 100,
}, {
  key: '2',
  title: '收货单号',
  render: 'receipt_code',
  width: 150,
}, {
  key: '3',
  title: '下单编号',
  render: 'purchase_code',
  width: 150,
}, {
  key: '4',
  title: '供应商',
  render: 'supplier_name',
  width: 150,
}, {
  key: '5',
  title: '单据类型',
  render: 'purchase_type_description',
  width: 100,
}, {
  key: '6',
  title: '业务子类型',
  render: 'sub_type_description',
  width: 150,
}, {
  key: '7',
  title: '状态',
  render: 'status_description',
  width: 100,
}, {
  key: '8',
  title: 'SKC数',
  render: 'sku_count',
  width: 100,
}, {
  key: '9',
  title: '总金额',
  render: 'purchase_total_amount',
  width: 100,
}, {
  key: '10',
  title: '总箱数',
  render: 'receipt_total_ctn',
  width: 100,
}, {
  key: '11',
  title: '下单总数',
  render: 'purchase_total_count',
  width: 100,
}, {
  key: '12',
  title: '送货总数',
  render: 'receipt_total_count',
  width: 100,
}, {
  key: '13',
  title: '入库总件数',
  render: d => (<div>{d.in_storage_count || 0}</div>),
  width: 150,
}, {
  key: '14',
  title: '次品总件数',
  render: 'defective_count',
  width: 150,
}, {
  key: '15',
  title: '跟单员',
  render: 'merchandiser_name',
  width: 100,
}, {
  key: '16',
  title: '下单时间',
  render: 'purchase_time',
  width: 200,
}, {
  key: '17',
  title: '收货人',
  render: 'receipt_name',
  width: 100,
}, {
  key: '18',
  title: '收货时间',
  render: 'receipt_time',
  width: 200,
}, {
  key: '19',
  title: '操作记录',
  render: () => <div style={{ height: 40 }} />,
  width: 100,
}]

export default function () {
  return (
    <Table
      bordered
      fixed="both"
      size="small"
      keygen="receipt_code"
      width={2400}
      columns={columns}
      data={data}
      style={{ maxHeight: 500 }}
    />
  )
}

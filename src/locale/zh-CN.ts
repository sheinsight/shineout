export default {
  weekdayValues: {
    narrow: ['一', '二', '三', '四', '五', '六', '日'],
    short: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    long: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
  },

  startOfWeek: 1,

  monthValues: {
    short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    long: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  },

  pickerTitle: ['开始时间', '结束时间'],

  timeOfDayValues: ['上午', '下午'],

  ok: '确定',
  cancel: '取消',
  noData: '无数据',
  selectAll: '全选',
  loading: '加载中...',

  rules: {
    required: {
      array: '{title} 不能为空',
      string: '{title} 不能为空',
    },
    type: '请输入正确的 {title}',
    length: {
      max: {
        string: '{title} 不能超过 {max} 个字符',
        number: '{title} 不能大于 {max}',
        array: '{title} 不能超过 {max} 个选项',
      },
      min: {
        string: '{title} 不能少于 {min} 个字符',
        number: '{title} 不能小于 {min}',
        array: '{title} 至少选择 {min} 个选项',
      },
    },
    reg: '{title} 格式不正确',
  },

  selected: '项',
  search: '搜索',
  urlInvalidMsg: '图片格式不正确，请重新上传',
  invalidAccept: '文件格式不正确',

  notFound: '未找到',
}

# Modal *对话框*
在不跳转页面的前提下，可以使用 Modal 展示次要内容或者操作。

<example />

## API

### Modal

<api name="Modal" />

### ModalMethods

Modal 提供了一组方法供全局调用，这些方法生成的元素，会在关闭后销毁。该组方法应仅供展示所用, 如果需要数据交互, 请使用 Modal

Modal.info(options) // 提示信息

Modal.success(options) // 成功提示框

Modal.error(options) // 错误提示框

Modal.confirm(options) // 确认提示框

Modal.show(options) // 默认弹窗 没有图标

Modal.closeAll() // 关闭所有弹窗

#### Options参数

** *options 支持 Modal除了 usePortal 和 destory 的其他任何属性, 此外还有如下的额外属性**

<api name="ModalMethods" />


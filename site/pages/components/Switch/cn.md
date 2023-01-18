# Switch *开关选择器*

<example />

## API

### Switch

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| checked | boolean | 无 | 当前选中状态，checked 传入时为受控组件 |
| disabled | boolean | false | 是否禁用 |
| name | string | 无 | Form 存取数据的名称 |
| onChange | (checked: boolean) => void | 无 | checked 表示选中状态 |
| content | ReactNode[] | 无 | 选中和未选中时的内容 |
| size | 'default' \| 'small' \| 'large' | default | 开关大小 |
| value | boolean | 无 | checked 未设置的情况下， checked = value |
| defaultValue | boolean | 无 | 初始值 |
| keepContentShow | boolean | 无 | 在 size 为 small 时，是否保持内容显示 |


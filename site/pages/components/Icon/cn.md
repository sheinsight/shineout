# Icon *图标*

<example />

## API

### Icon(此为函数,用于生成真实的图标组件)

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| url | string | '' | 图标css文件地址,使用远程地址,无需手动下载 |
| fontFamily | string | 'iconfont' | font-family 需要和引入的css文件内的font-family一致 |
| prefix | string | 'icon' | 类名前缀 |



### MyIcon(组件名可以自己定义,详情看例子)

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| name | string | '' | 图标类名,值参照具体使用的图标库 |
| size | string| 'default' | 图标大小,有"small","default","large |
| type | string | 'default' | 图标颜色,有"primary","success","default","warning"等 |
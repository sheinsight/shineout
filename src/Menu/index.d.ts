import * as React from 'react'
import { StandardProps, keyType, ListItemStandardProps, StructDataStandardProps } from '../@types/common'

export interface MenuProps<Item, Value> extends
StandardProps,
Pick<ListItemStandardProps<Item, Value>, 'keygen' | 'disabled'>,
Pick<StructDataStandardProps<Item>, 'renderItem'>
 {

    /**
     * desc: Menu items data
     *
     * 需要渲染成菜单的数据
     *
     * default: []
     */
     data?: Item[];

     /**
      * desc: style of menu
      *
      * 菜单样式
      *
      * default: 'inline'
      */
     mode?: 'inline' | 'vertical' | 'horizontal' | 'vertical-auto';

     /**
      * desc: The item is actived when the active function return true.
      *
      * 验证是否激活,参数为对应的数据对象,返回true则代表该菜单激活
      *
      * default: null
      */
     active?: (data: Item) => boolean;

     /**
      * desc: Initial expanded menu
      *
      * 初始展开的菜单;如果需要设置此值,则需要设置keygen,此值为一个包含key的数组
      *
      * default: []
      */
     defaultOpenKeys?: keyType[];

     /**
      * desc: expended menu
      *
      * 展开的菜单(受控)
      *
      * default: []
      */
     openKeys?: keyType[];

     /**
      * desc: The function will be called when the user clicks the menu item.
      *
      * 子菜单点击事件,参数为当条数据
      *
      * default: null
      */
     onClick?: (data: Item) => void;

     /**
      * desc: indent of each level
      *
      * 每一层缩进宽度
      *
      * default: 24
      */
     inlineIndent?: number;

     /**
      * desc: the key of inject the link value of the submenu
      *
      * 需要注入子菜单的链接键值
      *
      * default: -
      */
     linkKey?: ((d: Item) => string) | string;

     /**
      * desc: menu open change callback
      *
      * 菜单展开/收起回调
      *
      * default: none
      */
     onOpenChange?: (keys: keyType[]) => void;

     /**
      * desc: Front solid triangle expansion
      *
      * 前置实心三角展开符
      *
      * default: null
      */
     frontCaret?: boolean;

     /**
      * theme of menu
      *
      * 主题
      *
      * default: -
      */
     theme?: 'dark';
}

declare class Menu<Item = object, Value = any> extends React.Component<MenuProps<Item, Value>, {}> {}

export default Menu

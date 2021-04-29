import * as React from 'react'
import { StandardProps } from '../@types/common'


type ReactNode = React.ReactNode;
export interface ImageProps extends StandardProps{

  /**
   * the height of the image(When the value is percentage, the ratio is the width of the image)
   * 
   * 图片高度(值为百分比时，对比值为图片宽度)
   * 
   * default: '100%'
   */
  height?: string | number;

  /**
   * original picture address
   * 
   * 原始图片地址
   * 
   * default: none
   */
  href?: string;

  /**
   * whether to delay loading, number to set lazy offset
   * 
   * 是否延迟加载，如果为数字则表示懒加载偏移量
   * 
   * default: false
   */
  lazy?: boolean | number;

  /**
   * the picture address
   * 
   * 图片地址
   * 
   * default: required
   */
  src?: string;

  /**
   * target of image
   * 
   * 图片打开方式
   * 
   * default: '_modal'
   */
  target?: '_modal' | '_blank' | '_self' | '_download';

  /**
   * the width of the image
   * 
   * 图片宽度
   * 
   * default: '100%'
   */
  width?: string | number;

  /**
   * loading image placeholder content
   * 
   * 图片加载中占位内容
   * 
   * default: 'loading'
   */
  placeholder?: ReactNode;

  /**
   * the special element selector witch container the lazy image, such as: '#id', '.class'
   * 
   * 对特定元素进行懒加载判断的选择器, 如: '#id', '.class'
   * 
   * default: -
   */
  container?: string;

  /**
   * image error placeholder
   * 
   * 图片载入错误的文案
   * 
   * default: none
   */
  error?: ReactNode;

  /**
   * auto transform protocol
   * 
   * 是否根据页面自动转换协议
   * 
   * default: false
   */
  autoSSL?: boolean;

  /**
   * fit the container
   * 
   * 适应容器的方式
   * 
   * default: -
   */
  fit?: 'fill' | 'fit' | 'stretch' | 'center';

  /**
   * shape of image
   * 
   * 图片样式
   * 
   * default: 'rounded'
   */
  shape?: 'rounded' | 'circle' | 'thumbnail';
}

export interface ImageGroupProps {

  /**
   * the height of single image(When the value is percentage, the ratio is the width of the image)
   * 
   * 单个图片高度(值为百分比时，对比值为图片宽度)
   * 
   * default: '100%'
   */
  height?: string | number;

  /**
   * whether to delay loading
   * 
   * 是否延迟加载
   * 
   * default: false
   */
  lazy?: boolean;

  /**
   * whether to stack
   * 
   * 是否堆叠
   * 
   * default: false
   */
  pile?: boolean;

  /**
   * target of image
   * 
   * 图片打开方式
   * 
   * default: '_modal'
   */
  target?: '_modal' | '_blank' | '_self' | '_download';

  /**
   * the width of single picture
   * 
   * 单个图片宽度
   * 
   * default: '100%'
   */
  width?: string | number;

}
declare class ImageGroup extends React.Component<ImageGroupProps, {}> {
  render(): JSX.Element;
}


declare class Image extends React.Component<ImageProps, {}> {
  static Group: typeof ImageGroup;

  render(): JSX.Element;
}

export default Image
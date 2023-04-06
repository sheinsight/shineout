import { ModalProps } from '../Modal/Props'

/**
 * @title Drawer
 */
export interface DrawerProps extends ModalProps {
  /** *
   * @en 弹出位置
   * @cn Pop-up position
   * @default 'right'
   */
  position?: ModalProps['position']
  /**
   * @en 对话框宽度, 当 position 为 'right' 或 'left' 时生效
   * @cn the width of the Drawer
   * @default auto
   */
  width?: number | string
  /**
   * @en 对话框高度, 当 position 为 'top' 或 'bottom' 时生效
   * @cn the height of the Drawer
   * @default auto
   */
  height?: number | string
}

// Created by scripts/src-index.d.js.
import * as utils from './utils'

declare const __default: {
  utils: typeof utils,
  version: '1.12.0-rc.2'
}

export default __default
export { utils }
export { setLocale } from './locale'
export { color, style } from './utils/expose'
export { default as config, setConfig, isRTL } from './config'

export { default as LazyList } from './AnimationList/LazyList'

export { default as List } from './DataList'
import { ListProps as __ListProps , ListBaseItemProps as __ListBaseItemProps } from './DataList'

export { default as Alert } from './Alert'
import { AlertProps as __AlertProps,  } from './Alert/interface'

export { default as AnimationList } from './AnimationList'

export { default as Breadcrumb } from './Breadcrumb'
import { BreadcrumbData as __BreadcrumbData, BreadcrumbProps as __BreadcrumbProps } from './Breadcrumb/interface'

export { default as Button } from './Button'
import { ButtonType as __ButtonType, ButtonShape as __ButtonShape, ButtonProps as __ButtonProps, ButtonGroupProps as __ButtonGroupProps } from './Button/interface'

export { default as Card } from './Card'
import { CardProps as __CardProps, CardBodyProps as __CardBodyProps, CardHeaderProps as __CardHeaderProps, CardFooterProps as __CardFooterProps, CardSubmitProps as __CardSubmitProps, CardAccordionProps as __CardAccordionProps } from './Card/interface'

export { default as CardGroup } from './CardGroup'
import { CardGroupProps as __CardGroupProps, CardGroupItemProps as __CardGroupItemProps } from './CardGroup/interface'

export { default as Carousel } from './Carousel'
import { CarouselProps as __CarouselProps,  } from './Carousel/interface'

export { default as Cascader } from './Cascader'
import { BaseValue as __BaseValue, CascaderProps as __CascaderProps } from './Cascader/interface'

export { default as Checkbox } from './Checkbox'
import { CheckboxProps as __CheckboxProps, GroupProps as __GroupProps } from './Checkbox/interface'

export { default as DatePicker } from './DatePicker'
import { DatePickerProps as __DatePickerProps, QuickSelect as __QuickSelect, AreaType as __AreaType, DateTimeType as __DateTimeType, DatePickerValue as __DatePickerValue } from './DatePicker'

export { default as Datum } from './Datum'

export { default as Divider } from './Divider'
import { DividerProps as __DividerProps,  } from './Divider/interface'

export { default as Drawer } from './Drawer'
import { DrawerProps as __DrawerProps,  } from './Drawer'

export { default as Dropdown } from './Dropdown'
import { DropdownItem as __DropdownItem, DropdownProps as __DropdownProps } from './Dropdown/interface'

export { default as EditableArea } from './EditableArea'
import { EditableAreaProps as __EditableAreaProps,  } from './EditableArea'

export { default as Form } from './Form'
import { FormItemProps as __FormItemProps, FormRef as __FormRef, FormResetProps as __FormResetProps, FormSubmitProps as __FormSubmitProps, FormProps as __FormProps, FormFieldProps as __FormFieldProps, FormFieldSetProps as __FormFieldSetProps, FieldChildrenFunc as __FieldChildrenFunc, FieldSetChildrenFunc as __FieldSetChildrenFunc } from './Form/interface'

export { default as Gap } from './Gap'
import { GapProps as __GapProps,  } from './Gap/interface'

export { default as Grid } from './Grid'
import { GridProps as __GridProps, responsiveType as __responsiveType } from './Grid/interface'

export { default as Icon } from './Icon'
import { IconProps as __IconProps, IconComProps as __IconComProps,  } from './Icon/interface'

export { default as Image } from './Image'
import { ImageProps as __ImageProps, ImageGroupProps as __ImageGroupProps,  } from './Image/interface'

export { default as Input } from './Input'
import { InputProps as __InputProps, InputGroupProps as __InputGroupProps, InputNumberProps as __InputNumberProps, InputPasswordProps as __InputPasswordProps } from './Input/interface'

export { default as Lazyload } from './Lazyload'

export { default as Menu } from './Menu'
import { MenuListProps as __MenuListProps, MenuItemProps as __MenuItemProps, MenuProps as __MenuProps } from './Menu/interface'

export { default as Message } from './Message'
import { MessageOptions as __MessageOptions } from './Message/interface'

export { default as Modal } from './Modal'
import { ModalProps as __ModalProps, ModalFunctionOptions as __ModalFunctionOptions,  } from './Modal'

export { default as Pagination } from './Pagination'
import { TextParams as __TextParams, PaginationProps as __PaginationProps } from './Pagination/interface'

export { default as Popover } from './Popover'
import { PopoverProps as __PopoverProps, PopoverConfirmProps as __PopoverConfirmProps, PopoverContentProps as __PopoverContentProps } from './Popover/interface'

export { default as Progress } from './Progress'
import { ProgressProps as __ProgressProps } from './Progress/interface'

export { default as Radio } from './Radio'
import { RadioProps as __RadioProps, RadioGroupProps as __RadioGroupProps } from './Radio/interface'

export { default as Rate } from './Rate'
import { RateProps as __RateProps } from './Rate/interface'

export { default as Rule } from './Rule'
import { validFunc as __validFunc, RuleParams as __RuleParams, FormItemRule as __FormItemRule } from './Rule/interface'

export { default as Scroll } from './Scroll'

export { default as Select } from './Select'
import { SelectProps as __SelectProps,  } from './Select'

export { default as Slider } from './Slider'
import { SliderProps as __SliderProps,  } from './Slider'

export { default as Spin } from './Spin'
import { SpinProps as __SpinProps } from './Spin/interface'

export { default as Sticky } from './Sticky'
import { StickyProps as __StickyProps,  } from './Sticky'

export { default as Switch } from './Switch'
import { SwitchProps as __SwitchProps } from './Switch/interface'

export { default as Table } from './Table'
import { TableRef as __TableRef, ColumnFix as __ColumnFix, ColumnType as __ColumnType, ColumnOrder as __ColumnOrder, SummaryItem as __SummaryItem, renderSorterParam as __renderSorterParam, ColumnItem as __ColumnItem, TableProps as __TableProps } from './Table/interface'

export { default as Tabs } from './Tabs'
import { TabsProps as __TabsProps, TabsLinkProps as __TabsLinkProps, TabsPanelProps as __TabsPanelProps } from './Tabs/interface'

export { default as Tag } from './Tag'
import { TagProps as __TagProps, TagInputProps as __TagInputProps,  } from './Tag/interface'

export { default as Textarea } from './Textarea'
import { TextareaProps as __TextareaProps } from './Textarea/interface'

export { default as Tooltip } from './Tooltip'
import { TooltipProps as __TooltipProps } from './Tooltip/interface'

export { default as Transfer } from './Transfer'
import { TransferProps as __TransferProps } from './Transfer/interface'

export { default as Tree } from './Tree'
import { TreeProps as __TreeProps, TreeFieldProps as __TreeFieldProps } from './Tree/interface'

export { default as TreeSelect } from './TreeSelect'
import { TreeSelectProps as __TreeSelectProps, ComponentRef as __ComponentRef,  } from './TreeSelect'

export { default as Upload } from './Upload'
import { Validator as __Validator, UploadProps as __UploadProps, UploadImageHandlerProps as __UploadImageHandlerProps, UploadOptions as __UploadOptions, UploadImageProps as __UploadImageProps, UploadButtonProps as __UploadButtonProps } from './Upload/interface'


export namespace TYPE {

  export namespace List {
    export type Props<Item,Value> = __ListProps<Item , Value>
    export type BaseItemProps = __ListBaseItemProps
  }

  export namespace Alert {
    export type Props = __AlertProps
  }
  export namespace Breadcrumb {
  
    export type Data = __BreadcrumbData
    export type Props<Data = __BreadcrumbData> = __BreadcrumbProps<Data>
  }
  export namespace Button {
  
    export type Type = __ButtonType
    export type Shape = __ButtonShape
    export type Props = __ButtonProps
    export type GroupProps = __ButtonGroupProps
  }
  export namespace Card {
  
    export type Props = __CardProps
    export type BodyProps = __CardBodyProps
    export type HeaderProps = __CardHeaderProps
    export type FooterProps = __CardFooterProps
    export type SubmitProps = __CardSubmitProps
    export type AccordionProps<T> = __CardAccordionProps<T>
  }
  export namespace CardGroup {
  
    export type Props = __CardGroupProps
    export type ItemProps<T> = __CardGroupItemProps<T>
  }
  export namespace Carousel {
    export type Props = __CarouselProps
  }
  export namespace Cascader {
  
    export type BaseValue = __BaseValue
    export type Props<Item, Value extends BaseValue> = __CascaderProps<Item, Value>
  }
  export namespace Checkbox {
  
    export type Props<Value> = __CheckboxProps<Value>
    export type GroupProps<DataItem, Value> = __GroupProps<DataItem, Value>
  }
  export namespace DatePicker {
    export type Props<T = __DatePickerValue> = __DatePickerProps<T>
    export type QuickSelect = __QuickSelect  
    export type AreaType = __AreaType
    export type DateTimeType = __DateTimeType
    export type Value = __DatePickerValue
  }
  export namespace Divider {
    export type Props = __DividerProps
  }
  export namespace Drawer {
    export type Props = __DrawerProps
  }
  export namespace Dropdown {
  
    export type Item = __DropdownItem
    export type Props = __DropdownProps
  }
  export namespace EditableArea {
    export type Props = __EditableAreaProps
  }
  export namespace Form {
  
    export type ItemProps = __FormItemProps
    export type Ref<Value> = __FormRef<Value>
    export type ResetProps = __FormResetProps
    export type SubmitProps = __FormSubmitProps
    export type Props<Value> = __FormProps<Value>
    export type FieldProps<Value> = __FormFieldProps<Value>
    export type FieldSetProps<Value> = __FormFieldSetProps<Value>
    export type FieldChildrenFunc<Value = any> = __FieldChildrenFunc<Value>
    export type FieldSetChildrenFunc<Value = any> = __FieldSetChildrenFunc<Value>
  }
  export namespace Gap {
    export type Props = __GapProps
  }
  export namespace Grid {
    export type Props = __GridProps  
    export type responsiveType = __responsiveType
  }
  export namespace Icon {
    export type Props = __IconProps
    export type ComProps = __IconComProps
  }
  export namespace Image {
    export type Props = __ImageProps
    export type GroupProps = __ImageGroupProps
  }
  export namespace Input {
  
    export type Props = __InputProps
    export type GroupProps = __InputGroupProps
    export type NumberProps = __InputNumberProps
    export type PasswordProps = __InputPasswordProps
  }
  export namespace Menu {
  
    export type ListProps<Item> = __MenuListProps<Item>
    export type ItemProps<Item> = __MenuItemProps<Item>
    export type Props<Item, Value> = __MenuProps<Item, Value>
  }
  export namespace Message {
  
    export type Options = __MessageOptions
  }
  export namespace Modal {
    export type Props = __ModalProps
    export type FunctionOptions = __ModalFunctionOptions
  }
  export namespace Pagination {
  
    export type TextParams = __TextParams
    export type Props = __PaginationProps
  }
  export namespace Popover {
  
    export type Props = __PopoverProps
    export type ConfirmProps = __PopoverConfirmProps
    export type ContentProps = __PopoverContentProps
  }
  export namespace Progress {
  
    export type Props = __ProgressProps
  }
  export namespace Radio {
  
    export type Props = __RadioProps
    export type GroupProps<Value, Item> = __RadioGroupProps<Value, Item>
  }
  export namespace Rate {
  
    export type Props = __RateProps
  }
  export namespace Rule {
  
    export type validFunc = __validFunc
    export type Params = __RuleParams
    export type FormItemRule<Value, FormData = any, Props = any> = __FormItemRule<Value, FormData, Props>
  }
  export namespace Select {
    export type Props<Item, Value> = __SelectProps<Item, Value>
  }
  export namespace Slider {
    export type Props<Value> = __SliderProps<Value>
  }
  export namespace Spin {
  
    export type Props = __SpinProps
  }
  export namespace Sticky {
    export type Props = __StickyProps
  }
  export namespace Switch {
  
    export type Props = __SwitchProps
  }
  export namespace Table {
  
    export type Ref = __TableRef
    export type ColumnFix = __ColumnFix
    export type ColumnType = __ColumnType
    export type ColumnOrder = __ColumnOrder
    export type SummaryItem = __SummaryItem
    export type renderSorterParam = __renderSorterParam
    export type ColumnItem<DataItem> = __ColumnItem<DataItem>
    export type Props<DataItem, Value> = __TableProps<DataItem, Value>
  }
  export namespace Tabs {
  
    export type Props = __TabsProps
    export type LinkProps = __TabsLinkProps
    export type PanelProps = __TabsPanelProps
  }
  export namespace Tag {
    export type Props = __TagProps
    export type InputProps = __TagInputProps
  }
  export namespace Textarea {
  
    export type Props = __TextareaProps
  }
  export namespace Tooltip {
  
    export type Props = __TooltipProps
  }
  export namespace Transfer {
  
    export type Props<Item, Value extends any[]> = __TransferProps<Item, Value>
  }
  export namespace Tree {
  
    export type Props<DataItem, Value extends any[]> = __TreeProps<DataItem, Value>
    export type FieldProps<DataItem, Value extends any[]> = __TreeFieldProps<DataItem, Value>
  }
  export namespace TreeSelect {
    export type Props<Item, Value> = __TreeSelectProps<Item, Value>
    export type ComponentRef<Item, Value> = __ComponentRef<Item, Value>
  }
  export namespace Upload {
  
    export type Validator = __Validator
    export type Props<ValueItem> = __UploadProps<ValueItem>
    export type ImageHandlerProps = __UploadImageHandlerProps
    export type Options<ValueItem> = __UploadOptions<ValueItem>
    export type ImageProps<ValueItem> = __UploadImageProps<ValueItem>
    export type ButtonProps<ValueItem> = __UploadButtonProps<ValueItem>
  }
}

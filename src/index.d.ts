// Created by scripts/src-index.d.js.
import * as utils from './utils'

declare const __default: {
  utils: typeof utils,
  version: '1.11.0-rc.18'
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
import { AlertProps as __AlertProps ,  } from './Alert'

export { default as AnimationList } from './AnimationList'

export { default as Breadcrumb } from './Breadcrumb'
import { BreadcrumbProps as __BreadcrumbProps , BreadcrumbData  as __BreadcrumbData  ,  } from './Breadcrumb'

export { default as Button } from './Button'
import { ButtonProps as __ButtonProps , ButtonGroupProps as __ButtonGroupProps , ButtonType as __ButtonType } from './Button'

export { default as Card } from './Card'
import { CardProps as __CardProps , CardBodyProps as __CardBodyProps,CardHeaderProps as __CardHeaderProps,CardFooterProps as __CardFooterProps,CardSubmitProps as __CardSubmitProps,CardAccordionProps as __CardAccordionProps ,  } from './Card'

export { default as CardGroup } from './CardGroup'
import { CardGroupProps as __CardGroupProps , CardGroupItemProps as __CardGroupItemProps ,  } from './CardGroup'

export { default as Carousel } from './Carousel'
import { CarouselProps as __CarouselProps ,  } from './Carousel'

export { default as Cascader } from './Cascader'
import { CascaderProps as __CascaderProps ,  } from './Cascader'

export { default as Checkbox } from './Checkbox'
import { CheckboxProps as __CheckboxProps , CheckboxGroupProps as __CheckboxGroupProps ,  } from './Checkbox'

export { default as DatePicker } from './DatePicker'
import { DatePickerProps as __DatePickerProps , QuickSelect as __QuickSelect , AreaType as __AreaType,DateTimeType as __DateTimeType,DisabledType as __DisabledType,DatePickerValue as __DatePickerValue } from './DatePicker'

export { default as Datum } from './Datum'

export { default as Divider } from './Divider'
import { DividerProps as __DividerProps ,  } from './Divider'

export { default as Drawer } from './Drawer'
import { DrawerProps as __DrawerProps ,  } from './Drawer'

export { default as Dropdown } from './Dropdown'
import { DropdownProps as __DropdownProps , DropdownItem as __DropdownItem } from './Dropdown'

export { default as EditableArea } from './EditableArea'
import { EditableAreaProps as __EditableAreaProps ,  } from './EditableArea'

export { default as Form } from './Form'
import { FormProps as __FormProps , FormItemProps as __FormItemProps,FormFlowProps as __FormFlowProps,FormResetProps as __FormResetProps,FormRef as __FormRef,FormSubmitProps as __FormSubmitProps,FormFieldProps as __FormFieldProps,FormFieldSetProps as __FormFieldSetProps,FieldChildrenFunc as __FieldChildrenFunc,FieldSetChildrenFunc as __FieldSetChildrenFunc ,  } from './Form'

export { default as Gap } from './Gap'
import { GapProps as __GapProps ,  } from './Gap'

export { default as Grid } from './Grid'
import { GridProps as __GridProps , responsiveType as __responsiveType } from './Grid'

export { default as Icon } from './Icon'
import { IconProps as __IconProps , IconComProps as __IconComProps , IconCom as __IconCom } from './Icon'

export { default as Image } from './Image'
import { ImageProps as __ImageProps , ImageGroupProps as __ImageGroupProps ,  } from './Image'

export { default as Input } from './Input'
import { InputProps as __InputProps , InputNumberProps as __InputNumberProps,InputGroupProps as __InputGroupProps,InputPasswordProps as __InputPasswordProps , numType as __numType } from './Input'

export { default as Lazyload } from './Lazyload'

export { default as Menu } from './Menu'
import { MenuProps as __MenuProps ,  } from './Menu'

export { default as Message } from './Message'
import { MessageProps as __MessageProps , MessageOptions as __MessageOptions ,  } from './Message'

export { default as Modal } from './Modal'
import { ModalProps as __ModalProps , ModalFunctionOptions as __ModalFunctionOptions ,  } from './Modal'

export { default as Pagination } from './Pagination'
import { PaginationProps as __PaginationProps , TextParams as __TextParams,SizeListProps as __SizeListProps ,  } from './Pagination'

export { default as Popover } from './Popover'
import { PopoverProps as __PopoverProps , PopoverConfirmProps as __PopoverConfirmProps , ContentProps as __ContentProps } from './Popover'

export { default as Progress } from './Progress'
import { ProgressProps as __ProgressProps ,  } from './Progress'

export { default as Radio } from './Radio'
import { RadioProps as __RadioProps , RadioGroupProps as __RadioGroupProps ,  } from './Radio'

export { default as Rate } from './Rate'
import { RateProps as __RateProps ,  } from './Rate'

export { default as Rule } from './Rule'
import { Max as __Max,Min as __Min,Type as __Type,Range as __Range,Required as __Required,validFunc as __validFunc,RuleParams as __RuleParams,RuleResult as __RuleResult,RegExpParams as __RegExpParams,paramFunc as __paramFunc , RuleCommon as __RuleCommon,RuleParamsType as __RuleParamsType } from './Rule'

export { default as Scroll } from './Scroll'

export { default as Select } from './Select'
import { SelectProps as __SelectProps ,  } from './Select'

export { default as Slider } from './Slider'
import { SliderProps as __SliderProps ,  } from './Slider'

export { default as Spin } from './Spin'
import { SpinProps as __SpinProps ,  } from './Spin'

export { default as Sticky } from './Sticky'
import { StickyProps as __StickyProps ,  } from './Sticky'

export { default as Switch } from './Switch'
import { SwitchProps as __SwitchProps ,  } from './Switch'

export { default as Table } from './Table'
import { TableProps as __TableProps , TableRef as __TableRef,RowEvents as __RowEvents,CheckColumn as __CheckColumn,renderSorterParam  as __renderSorterParam  , ColumnFix as __ColumnFix,ColumnType as __ColumnType,ColumnOrder as __ColumnOrder,ColumnItem as __ColumnItem } from './Table'

export { default as Tabs } from './Tabs'
import { TabsProps as __TabsProps , TabsLinkProps as __TabsLinkProps,TabsPanelProps as __TabsPanelProps ,  } from './Tabs'

export { default as Tag } from './Tag'
import { TagProps as __TagProps , TagInputProps as __TagInputProps ,  } from './Tag'

export { default as Textarea } from './Textarea'
import { TextareaProps as __TextareaProps ,  } from './Textarea'

export { default as Tooltip } from './Tooltip'
import { TooltipProps as __TooltipProps ,  } from './Tooltip'

export { default as Transfer } from './Transfer'
import { TransferProps as __TransferProps ,  } from './Transfer'

export { default as Tree } from './Tree'
import { TreeProps as __TreeProps ,  } from './Tree'

export { default as TreeSelect } from './TreeSelect'
import { TreeSelectProps as __TreeSelectProps ,  } from './TreeSelect'

export { default as Upload } from './Upload'
import { UploadProps as __UploadProps , Validator as __Validator,BaseParams as __BaseParams,Options as __Options,UploadImageProps as __UploadImageProps,UploadButtonProps as __UploadButtonProps,UploadImageHandlerProps as __UploadImageHandlerProps , OmitFormProps as __OmitFormProps } from './Upload'


export namespace TYPE {

  export namespace List {
    export type Props<Item,Value> = __ListProps<Item , Value>
    export type BaseItemProps = __ListBaseItemProps
  }

  export namespace Alert {
    export type Props = __AlertProps
  }
  export namespace Breadcrumb {
    export type Props<Item> = __BreadcrumbProps<Item>
    export type Data  = __BreadcrumbData 
  }
  export namespace Button {
    export type Props = __ButtonProps
    export type GroupProps = __ButtonGroupProps  
    export type Type = __ButtonType
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
    export type Props<Item, Value> = __CascaderProps<Item, Value>
  }
  export namespace Checkbox {
    export type Props<T> = __CheckboxProps<T>
    export type GroupProps<Data, T> = __CheckboxGroupProps<Data, T>
  }
  export namespace DatePicker {
    export type Props<T> = __DatePickerProps<T>
    export type QuickSelect = __QuickSelect  
    export type AreaType = __AreaType
    export type DateTimeType = __DateTimeType
    export type DisabledType = __DisabledType
    export type Value = __DatePickerValue
  }
  export namespace Divider {
    export type Props = __DividerProps
  }
  export namespace Drawer {
    export type Props = __DrawerProps
  }
  export namespace Dropdown {
    export type Props = __DropdownProps  
    export type Item = __DropdownItem
  }
  export namespace EditableArea {
    export type Props = __EditableAreaProps
  }
  export namespace Form {
    export type Props<Value> = __FormProps<Value>
    export type ItemProps = __FormItemProps
    export type FlowProps = __FormFlowProps
    export type ResetProps = __FormResetProps
    export type Ref<Value> = __FormRef<Value>
    export type SubmitProps = __FormSubmitProps
    export type FieldProps<Value> = __FormFieldProps<Value>
    export type FieldSetProps<Value> = __FormFieldSetProps<Value>
    export type FieldChildrenFunc<Value> = __FieldChildrenFunc<Value>
    export type FieldSetChildrenFunc<Value> = __FieldSetChildrenFunc<Value>
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
    export type Com = __IconCom
  }
  export namespace Image {
    export type Props = __ImageProps
    export type GroupProps = __ImageGroupProps
  }
  export namespace Input {
    export type Props<Value> = __InputProps<Value>
    export type NumberProps<Value> = __InputNumberProps<Value>
    export type GroupProps<Value> = __InputGroupProps<Value>
    export type PasswordProps<Value> = __InputPasswordProps<Value>  
    export type numType = __numType
  }
  export namespace Menu {
    export type Props<Item, Value> = __MenuProps<Item, Value>
  }
  export namespace Message {
    export type Props = __MessageProps
    export type Options = __MessageOptions
  }
  export namespace Modal {
    export type Props = __ModalProps
    export type FunctionOptions = __ModalFunctionOptions
  }
  export namespace Pagination {
    export type Props = __PaginationProps
    export type TextParams = __TextParams
    export type SizeListProps = __SizeListProps
  }
  export namespace Popover {
    export type Props = __PopoverProps
    export type ConfirmProps = __PopoverConfirmProps  
    export type ContentProps = __ContentProps
  }
  export namespace Progress {
    export type Props = __ProgressProps
  }
  export namespace Radio {
    export type Props<Item> = __RadioProps<Item>
    export type GroupProps<Value, Item> = __RadioGroupProps<Value, Item>
  }
  export namespace Rate {
    export type Props = __RateProps
  }
  export namespace Rule {

    export type Max = __Max
    export type Min = __Min
    export type Type = __Type
    export type Range = __Range
    export type Required = __Required
    export type validFunc = __validFunc
    export type Params = __RuleParams
    export type Result = __RuleResult
    export type RegExpParams = __RegExpParams
    export type paramFunc<U> = __paramFunc<U>  
    export type Common<U> = __RuleCommon<U>
    export type ParamsType<Value, P> = __RuleParamsType<Value, P>
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
    export type Props<Value, TRD> = __TableProps<Value, TRD>
    export type Ref = __TableRef
    export type RowEvents = __RowEvents
    export type CheckColumn<T> = __CheckColumn<T>
    export type renderSorterParam  = __renderSorterParam   
    export type ColumnFix = __ColumnFix
    export type ColumnType = __ColumnType
    export type ColumnOrder = __ColumnOrder
    export type ColumnItem<T> = __ColumnItem<T>
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
    export type Props<Item, Value> = __TransferProps<Item, Value>
  }
  export namespace Tree {
    export type Props<Item, Value> = __TreeProps<Item, Value>
  }
  export namespace TreeSelect {
    export type Props<Item, Value> = __TreeSelectProps<Item, Value>
  }
  export namespace Upload {
    export type Props<T> = __UploadProps<T>
    export type Validator = __Validator
    export type BaseParams = __BaseParams
    export type Options<T> = __Options<T>
    export type ImageProps<T> = __UploadImageProps<T>
    export type ButtonProps<T> = __UploadButtonProps<T>
    export type ImageHandlerProps = __UploadImageHandlerProps  
    export type OmitFormProps<value> = __OmitFormProps<value>
  }
}

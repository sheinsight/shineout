// Created by scripts/src-index.js.
import * as utils from './utils'

export default { utils, version: '1.10.7' }
export { utils }
export { setLocale } from './locale'
export { color, style } from './utils/expose'
export { default as config, setConfig, isRTL } from './config'

export { default as LazyList } from './AnimationList/LazyList'
export { default as List } from './DataList'

import { AlertProps } from './Alert'
export { default as Alert } from './Alert'


import { BreadcrumbProps } from './Breadcrumb'
export { default as Breadcrumb } from './Breadcrumb'


import { ButtonProps,ButtonGroupProps  } from './Button'
export { default as Button } from './Button'


import { CardProps,CardHeaderProps,CardBodyProps,CardFooterProps,CardSubmitProps,CardAccordionProps } from './Card'
export { default as Card } from './Card'


import { CardGroupProps,CardGroupItemProps } from './CardGroup'
export { default as CardGroup } from './CardGroup'


import { CarouselProps } from './Carousel'
export { default as Carousel } from './Carousel'


import { CascaderProps } from './Cascader'
export { default as Cascader } from './Cascader'


import { CheckboxProps,CheckboxGroupProps } from './Checkbox'
export { default as Checkbox } from './Checkbox'


import { DatePickerProps } from './DatePicker'
export { default as DatePicker } from './DatePicker'


import { DividerProps } from './Divider'
export { default as Divider } from './Divider'


import { DropdownProps } from './Dropdown'
export { default as Dropdown } from './Dropdown'


import { EditableAreaProps } from './EditableArea'
export { default as EditableArea } from './EditableArea'


import { FormProps,FormItemProps,FormSubmitProps,FormResetProps,FormFieldProps,FormFieldSetProps,FormFlowProps  } from './Form'
export { default as Form } from './Form'


import { GapProps } from './Gap'
export { default as Gap } from './Gap'


import { GridProps } from './Grid'
export { default as Grid } from './Grid'


import { IconComProps } from './Icon'
export { default as Icon } from './Icon'


import { ImageProps,ImageGroupProps  } from './Image'
export { default as Image } from './Image'


import { InputProps,InputNumberProps,InputPasswordProps } from './Input'
export { default as Input } from './Input'


import { MenuProps } from './Menu'
export { default as Menu } from './Menu'


import { MessageProps } from './Message'
export { default as Message } from './Message'


import { ModalProps } from './Modal'
export { default as Modal } from './Modal'


import { PaginationProps,SizeListProps  } from './Pagination'
export { default as Pagination } from './Pagination'


import { PopoverProps,PopoverConfirmProps } from './Popover'
export { default as Popover } from './Popover'


import { ProgressProps } from './Progress'
export { default as Progress } from './Progress'


import { RadioProps,RadioGroupProps } from './Radio'
export { default as Radio } from './Radio'


import { RateProps } from './Rate'
export { default as Rate } from './Rate'


import { SelectProps } from './Select'
export { default as Select } from './Select'


import { SliderProps } from './Slider'
export { default as Slider } from './Slider'


import { SpinProps } from './Spin'
export { default as Spin } from './Spin'


import { StickyProps } from './Sticky'
export { default as Sticky } from './Sticky'


import { SwitchProps } from './Switch'
export { default as Switch } from './Switch'


import { TableProps } from './Table'
export { default as Table } from './Table'


import { TabsProps,TabsPanelProps,TabsLinkProps } from './Tabs'
export { default as Tabs } from './Tabs'


import { TagProps,TagInputProps  } from './Tag'
export { default as Tag } from './Tag'


import { TextareaProps } from './Textarea'
export { default as Textarea } from './Textarea'


import { TooltipProps } from './Tooltip'
export { default as Tooltip } from './Tooltip'


import { TransferProps } from './Transfer'
export { default as Transfer } from './Transfer'


import { TreeProps } from './Tree'
export { default as Tree } from './Tree'


import { TreeSelectProps } from './TreeSelect'
export { default as TreeSelect } from './TreeSelect'


import { UploadProps,UploadImageProps,UploadImageHandlerProps,UploadButtonProps } from './Upload'
export { default as Upload } from './Upload'


export namespace Type {

    export type Alert = AlertProps

    export type Breadcrumb<Item> = BreadcrumbProps<Item>

    export type Button = ButtonProps

    export type ButtonGroup = ButtonGroupProps 

    export type Card = CardProps

    export type CardHeader = CardHeaderProps

    export type CardBody = CardBodyProps

    export type CardFooter = CardFooterProps

    export type CardSubmit = CardSubmitProps

    export type CardAccordion<T> = CardAccordionProps<T>

    export type CardGroup = CardGroupProps

    export type CardGroupItem<T> = CardGroupItemProps<T>

    export type Carousel = CarouselProps

    export type Cascader<Item, Value> = CascaderProps<Item, Value>

    export type Checkbox<T> = CheckboxProps<T>

    export type CheckboxGroup<Data, T> = CheckboxGroupProps<Data, T>

    export type DatePicker<T > = DatePickerProps<T >

    export type Divider = DividerProps

    export type Dropdown = DropdownProps

    export type EditableArea = EditableAreaProps

    export type Form<Value> = FormProps<Value>

    export type FormItem = FormItemProps

    export type FormSubmit = FormSubmitProps

    export type FormReset = FormResetProps

    export type FormField<Value> = FormFieldProps<Value>

    export type FormFieldSet<Value> = FormFieldSetProps<Value>

    export type FormFlow = FormFlowProps 

    export type Gap = GapProps

    export type Grid = GridProps

    export type IconCom = IconComProps

    export type Image = ImageProps

    export type ImageGroup = ImageGroupProps 

    export type Input<Value> = InputProps<Value>

    export type InputNumber<Value> = InputNumberProps<Value>

    export type InputPassword<Value > = InputPasswordProps<Value >

    export type Menu<Item, Value> = MenuProps<Item, Value>

    export type Message = MessageProps

    export type Modal = ModalProps

    export type Pagination = PaginationProps

    export type SizeList = SizeListProps 

    export type Popover = PopoverProps

    export type PopoverConfirm = PopoverConfirmProps

    export type Progress = ProgressProps

    export type Radio<Item > = RadioProps<Item >

    export type RadioGroup<Value, Item> = RadioGroupProps<Value, Item>

    export type Rate = RateProps

    export type Select<Item, Value> = SelectProps<Item, Value>

    export type Slider<Value> = SliderProps<Value>

    export type Spin = SpinProps

    export type Sticky = StickyProps

    export type Switch = SwitchProps

    export type Table<Value, TRD> = TableProps<Value, TRD>

    export type Tabs = TabsProps

    export type TabsPanel = TabsPanelProps

    export type TabsLink = TabsLinkProps

    export type Tag = TagProps

    export type TagInput = TagInputProps 

    export type Textarea<Value> = TextareaProps<Value>

    export type Tooltip = TooltipProps

    export type Transfer<Item, Value> = TransferProps<Item, Value>

    export type Tree<Item, Value> = TreeProps<Item, Value>

    export type TreeSelect<Value, Data> = TreeSelectProps<Value, Data>

    export type Upload<T> = UploadProps<T>

    export type UploadImage<T> = UploadImageProps<T>

    export type UploadImageHandler = UploadImageHandlerProps

    export type UploadButton<T> = UploadButtonProps<T>

}

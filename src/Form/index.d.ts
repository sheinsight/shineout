import * as React from 'react'
import { StandardProps } from '../@types/common'
import { ButtonProps } from '../Button'
import { RuleParamsType } from '../Rule'

type ReactNode = React.ReactNode;

export interface Base {
  [formItemName: string]: any;
}

export interface RuleParams<Value = {}> {
  [propName: string]: RuleParamsType<Value>
}

export interface FieldSetChildrenFunc<Value = any> {
  list: any;
  value: Value;
  onChange: (value: Value) => void;
  onRemove: () => void;
  index: number;
  onInsert: (value: Value) => void;
  onAppend: (value: Value) => void;
}


export interface FieldChildrenFunc<Value = any> {
  value: Value;
  error: Error;
  onChange: (value: Value) => void;
}

export interface FormProps<Value> extends StandardProps {
  /**
   * Form value
   *
   * Form值
   *
   * default:
   */
  value?: Value,

  /**
   * The formdata helper class, which is created automatically inside a Form without setting it, usually does not need to be set.
   *
   * formdata 辅助类，不设置Form内部会自动创建，通常情况下不需要设置。
   *
   * default:
   */
  datum?: object;

  /**
   * When disabled is true, all the elements in the form are disabled.
   *
   * 是否禁用，为 true 时，表单内所有元素 disabled 都为 true
   *
   * default: false
   */
  disabled?: boolean;

  /**
   * When inline is true, the form is horizontal layout
   *
   * 是否水平布局
   *
   * default: false
   */
  inline?: boolean;

  /**
   * the default value is right.
   *
   * 默认为右边对齐。
   *
   * default: 'right'
   */
  labelAlign?: 'top' | 'right' | 'left';

  /**
   * the default value is top.
   *
   * 默认顶部对齐
   *
   * default: 'top'
   */
  labelVerticalAlign?: 'top' | 'middle' | 'bottom';

  /**
   * The width of label. It is invalid when labelAlign is 'top'.
   *
   * 标签宽度，labelAlign 为 'top' 时无效。
   *
   * default: 140px
   */
  labelWidth?: string | number;

  /**
   * mode, with useMode
   *
   * 模式，和 useMode 配合使用
   *
   * default:
   */
  mode?: string;

  /**
   * callback function, executed when the value is changing
   *
   * 表单内组件值变化函数
   *
   * default:
   */
  onChange?: (data: Value) => void;

  /**
   * callback when the error happens
   *
   * 异常回调处理
   *
   * default:
   */
  onError?: (err: Error) => void;

  /**
   * the function for Form Submission.  When the internal validation fails, it will not be triggered.
   *
   * 表单提交函数。表单内部校验失败时不会触发。
   *
   * default:
   */
  onSubmit?: (data: Value) => void;

  /**
   * When removeUndefined is true, remove undefined value on submit.
   *
   * 是否删除值为 undefined 的字段，默认值为删除
   *
   * default: true
   */
  removeUndefined?: boolean;

  /**
   * validation rules, see details in the Rules
   *
   * 校验规则，详见 Rules
   *
   * default:
   */
  rules?: Base;

  /**
   * When the verification fails, whether to scroll to the first verification failure component, when the value is a number, it means the offset relative to the top
   *
   * 校验失败时是否滚动到第一个校验失败组件，该值为数字时，表示相对于顶部的偏移量
   *
   * default: false
   */
  scrollToError?: boolean | number;

  /**
   * ms, the interval between two submissions(Prevent repeat submission)
   *
   * ms, 两次提交间隔时长（防止重复提交）
   *
   * default: 1000
   */
  throttle?: number;

  /**
   * validate after set value
   *
   * 设置 value 后是否自动校验
   *
   * default: false
   */
  initValidate?: boolean;

  /**
   * bind form ref, Can call some form methods
   *
   * 绑定 form 的引用, 可以调用某些 form 的方法
   *
   * default: -
   */
  formRef?: (form: any) => void;

}

export interface FormItemProps extends StandardProps {

  /**
   * When it is undefined, the tag does not be rendered or occupy space. If there is no content, but it needs to be occupied, you can use an empty string ''.
   *
   * 未定义时，标签不会render，也不会占位。如果无内容需要占位，使用空字符串 ''。
   *
   * default: undefined
   */
  label?: string | ReactNode;

  /**
   * the default value is left.
   *
   * 默认为左边对齐。
   *
   * default:
   */
  labelAlign?: 'top' | 'right';

  /**
   * The width of label. It is invalid when labelAlign is 'top'.
   *
   * 标签宽度，labelAlign 为 'top' 时无效。
   *
   * default: 140px
   */
  labelWidth?: string | number;

  /**
   * Required tags for pure display. Do not trigger validation
   *
   * 必填标记，纯展示用，不会触发校验
   *
   * default: false
   */
  required?: boolean;

  /**
   * Prompting information
   *
   * 提示文案
   *
   * default:
   */
  tip?: string;

}

export interface FormFieldProps<Value> {

  /**
   * bind name, render while the name change
   *
   * 绑定校验字段名。当值变化后，触发绑定的字段校验。
   *
   * default:
   */
  bind?: string[];

  /**
   * React components that support value and onChange or function. The function object attribute is as follows: value: The value obtained from the parent Form or Form.Block by name. error: the error information of data validation. type is Error. onChange: The callback when the value is changing.
   *
   * 支持 value 和 onChange 的 React 组件，或者函数，函数object属性如下。value: 根据 name 从上级 Form 或 Form.Block 获取的值。error：数据校验错误信息，类型为 Error。onChange: 值改变回调函数
   *
   * default: required
   */
  children?: ((opts: FieldChildrenFunc<Value>) => ReactNode) | ReactNode;

  /**
   * default value
   *
   * 默认值
   *
   * default:
   */
  defaultValue?: string | number;

  /**
   * The name of a Form that accesses data
   *
   * Form 存取数据的名称
   *
   * default: none
   */
  name?: string;

  /**
   * Validation rules
   *
   * 校验规则
   *
   * default: none
   */
  rules?: RuleParamsType<Value>;

}

export interface FormFieldSetProps<Value> {

  /**
   * When children type is not function, handle a set data type of object
   *
   * When children type is function, handle a group of data type of array. options property:
   *
   * list: all data of name.
   *
   * value: a single piece of data for the value obtained by name.
   *
   * onChange: a callback when the value is changing.
   *
   * onRemove: a callback when a child component is removed.
   *
   * index: the current index.
   *
   * onInsert: Insert a piece of data before the current item.
   *
   * onAppend: Insert a piece of data after the current item.
   *
   * children 不为 function，用来处理 object 类型数据，children 内的 name 会拼接 FieldSet name，如 FieldSet name 为 'a', children 元素name 为 b，children 实际处理的数据为 a.b;
   *
   * children 为 function 时，用来处理数组数据。options 属性为
   *
   * list: name 下的全部数据。
   *
   * value: 根据name获取的值的单条数据。
   *
   * onChange: 子组件数据改变回调。
   *
   * onRemove: 子组件删除回调。
   *
   * index: 当前项索引。
   *
   * onInsert: 在当前项之前插入一条数据。
   *
   * onAppend: 在当前项之后附加一条数据。
   *
   * default: required
   */
  children?: ((opts: FieldSetChildrenFunc<Value>) => ReactNode) | ReactNode;

  /**
   * Default value
   *
   * 默认值
   *
   * default:
   */
  defaultValue?: string | number;

  /**
   * content with empty
   *
   * 数据为空时展示内容。（仅在children为function时有效）
   *
   * default:
   */
  empty?: (onInsert: Value) => ReactNode;

  /**
   * The name that accesses data from from
   *
   * 从 Form 中存取数据的名称
   *
   * default: required
   */
  name?: string;

  /**
   * Validation rules
   *
   * 校验规则
   *
   * default: none
   */
  rules?: RuleParamsType<Value>;

}

export interface FormFlowProps {

  /**
   * datum is the object of Datum.Form.
   *
   * datum 为 Datum.Form 对象
   *
   * default: required
   */
  children?: (datum: any) => ReactNode;

  /**
   * Specifying which fields to change trigger the Flow update.
   *
   * names 为空时，Form 内任意值变化会触发 Flow 更新；不为空时，只监听指定字段变化
   *
   * default: none
   */
  names?: string[];

}

export interface FormSubmitProps extends ButtonProps { }

export interface FormResetProps extends ButtonProps { }

declare class FormFlow extends React.Component<FormFlowProps, {}> {
  render(): JSX.Element;
}

declare class FormFieldSet<Value> extends React.Component<FormFieldSetProps<Value>, {}> {
  render(): JSX.Element;
}

declare class FormField<Value> extends React.Component<FormFieldProps<Value>, {}> {
  render(): JSX.Element;
}

declare class FormItem extends React.Component<FormItemProps, {}> {
  render(): JSX.Element;
}

declare class FormButton extends React.Component<ButtonProps, {}> {
  render(): JSX.Element;
}

declare class FormSubmit extends React.Component<FormSubmitProps, {}> {
  render(): JSX.Element;
}

declare class FormReset extends React.Component<FormResetProps, {}> {
  render(): JSX.Element;
}


declare class Form<Value> extends React.Component<FormProps<Value>, {}> {
  static Item: typeof FormItem;

  static Field: typeof FormField;

  static FieldSet: typeof FormFieldSet;

  static Flow: typeof FormFlow;

  static Button: typeof FormButton;

  static Submit: typeof FormSubmit;

  static Reset: typeof FormReset;

  render(): JSX.Element;
}

export default Form

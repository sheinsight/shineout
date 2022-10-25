import { RuleParamsType } from "../Rule"
import { FormItemStandardProps, ListItemStandardProps, ObjectType } from "../@types/common"
import { ValidType } from "./types"

interface RuleObject {
  [name: string]: RuleParamsType<any> | RuleObject
}
export interface ValidFunc {
  (v: any, formValue: ObjectType, type: ValidType): Promise<any>
  (type: ValidType): Promise<any>
}

export interface FormDatumOptions<V extends {}> {
  removeUndefined?: boolean
  rules?: RuleObject
  onChange?: (value: V) => void
  value?: V,
  error?: {[name: string]: string | Error}
  initValidate?: boolean
  defaultValue?: V
}


export interface ListDatumOptions<Item, Value>
  extends Pick<ListItemStandardProps<Item, Value>, 'format' | 'disabled'>,
    Pick<FormItemStandardProps<Value>, 'value' | 'onChange'> {
  separator?: string
  limit?: number
  distinct?: boolean,
  prediction?: (value: any, data: Item) => boolean
}

export interface DatumHocOptions<Props> {
  type: 'list' | 'form'
  key:  keyof Props & string
  limit: number,
  bindProps: (keyof Props)[],
  ignoreUndefined: boolean,
  pure: boolean
}

export interface DatumBaseProps {
  onChange?: unknown
  datum?: unknown
  disabled?: unknown
}

export interface DatumAddProps {
  onDatumBind?: (datum: ObjectType) => void
  initValidate?: boolean
  datum?: ObjectType
}

export type GetDatumProps<U>  = DatumAddProps & Omit<U, keyof DatumAddProps>
export type GetDatumListProps<U, DataItem, Value, Keys extends keyof ListDatumOptions<DataItem, Value>> = DatumAddProps & Pick<ListDatumOptions<DataItem, Value>, Keys> & Omit<U, keyof DatumAddProps>


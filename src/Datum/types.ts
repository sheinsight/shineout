// FLow chagne
export const changeSubscribe = (name: string) => `__CHANGE_SUBSCRIBE_${name}__`

// setError
export const errorSubscribe = (name: string) => `__ERROR_SUBSCRIBE_${name}__`

// value chagne
export const updateSubscribe = (name: string) => `__UPDATE_SUBSCRIBE_${name}__`

export const CHANGE_TOPIC = '__CHANGE_TOPIC__'

export const VALIDATE_TOPIC = '__VALIDATE_TOPIC__'

export const RESET_TOPIC = '__RESET_TOPIC__'

export const FORCE_PASS = '__VALIDATE_FORCE_PASS__'

export const IGNORE_VALIDATE = '__IGNORE_VALIDATE__'

export const ERROR_TYPE = '__UPDATE_ERROR_TYPE__'

export const REMOVE_ERROR = '__REMOVE_ERROR_TYPE__'

export const WITH_OUT_DISPATCH = '__WITH_OUT_DISPATCH__'

export const IGNORE_BIND = '__IGNORE_BIND__'

export const SUBMIT_TOPIC = '__SUBMIT_TOPIC__'

export type ValidType = typeof IGNORE_BIND | typeof FORCE_PASS

export type PublishType = typeof FORCE_PASS | typeof IGNORE_VALIDATE

export type ChangeType = typeof WITH_OUT_DISPATCH

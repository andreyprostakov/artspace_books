import { isArray  } from 'lodash'

export const objectToParams = (object, initialParams = '') => {
  var params = new URLSearchParams(initialParams)
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (isArray(value)) {
      value.forEach(entry => params.append(`${key}[]`, entry))
    } else if (value) {
      params.set(key, value)
    }
  })
  return params.toString()
}

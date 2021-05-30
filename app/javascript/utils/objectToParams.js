import { isArray  } from 'lodash'

export const objectToParams = (object) => {
  var params = new URLSearchParams()
  Object.keys(object).forEach(key => {
    const value = object[key]
    if (isArray(value)) {
      value.forEach(entry => params.append(`${key}[]`, entry))
    } else if (value) {
      params.append(key, value)
    }
  })
  return params.toString()
}

export const getProp = (src, prop) => {
  if (typeof prop !== 'string') return src[prop]
  const props = prop.split('.')
  if (props.length === 1) return src[props[0]]

  let res = src
  props.every(prop => {
    res = res[prop]
    return typeof res !== 'undefined' && res !== null
  })

  return res
}

export const get = (
  src,
  prop,
  defaultValue = null,
  cb = src => (typeof prop !== 'undefined' ? getProp(src, prop) || defaultValue : defaultValue)
) => (src ? cb(src) : defaultValue)

export const runSomeRight = fns => {
  let result = null

  fns.reverse().some(exp => {
    if (Array.isArray(exp)) {
      const [fn, condition] = exp
      if (condition) {
        result = fn()
        return true
      }

      return false
    }

    return exp
  })

  return result
}

export const curry = (fn, ...args) =>
  fn.length <= args.length ? fn(...args) : (...more) => curry(fn, ...args, ...more)

export const isNotEmpty = src => (typeof src === 'string' ? src !== '' : !!src)
export const hasValue = curry((obj, key) => !!get(obj, key))

const prune = (obj, depth = 1) => {
  if (Array.isArray(obj) && obj.length > 0) {
    return (depth === 0) ? ['???'] : obj.map(e => prune(e, depth - 1))
  } else if (obj && typeof obj === 'object' && Object.keys(obj).length > 0) {
    return (depth === 0) ? {'???':''} : Object.keys(obj).reduce((acc, key) => ({ ...acc, [key]: prune(obj[key], depth - 1)}), {})
  } else {
    return obj
  }
}

export const stringify = (obj, depth = 1, space) => JSON.stringify(prune(obj, depth), null, space)
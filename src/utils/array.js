
export function groupBy (array, prop) {
  return array.reduce(function (groups, item) {
    const val = item[prop]
    groups[val] = groups[val] || []
    groups[val].push(item)
    return groups
  }, {})
}

export function containsObject (obj, list) {
  return list.some(function (elem) {
    return JSON.stringify(elem) === JSON.stringify(obj)
  })
}

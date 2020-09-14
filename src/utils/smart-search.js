export function simpleSearch (items, query, props) {
  if (!query) return items
  return items.filter(item => {
    let i = props.length
    while (i--) {
      if (item[props[i]] && item[props[i]].toLowerCase().includes(query.toLowerCase())) return true
    }
    return false
  })
}

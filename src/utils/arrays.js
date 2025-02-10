
export function getDistinctValues(field, source) {
  const result = []

  source.forEach((item) => {
    if (!result.includes(item[field]))
      result.push(item[field])
  })

  result.sort()

  return result
}

export function getDistinctOptions(field, source, defaultOption = false) {
  const list = getDistinctValues(field, source)
  const result = list.reduce((acc, item) => {
    acc[item] = defaultOption

    return acc
  }, {})

  return result
}

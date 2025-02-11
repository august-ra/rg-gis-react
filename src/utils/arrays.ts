import type { FilterOptions, GisInfo, GisRecord, GisRecordKey } from "./types"


export function getDistinctValues(field: GisRecordKey, source: GisInfo): string[] {
  const result: string[] = []

  source.forEach((item: GisRecord) => {
    if (!result.includes(item[field] as string))
      result.push(item[field] as string)
  })

  result.sort()

  return result
}

export function getDistinctOptions(field: GisRecordKey, source: GisInfo, defaultOption: boolean = false): FilterOptions {
  const list: string[] = getDistinctValues(field, source)
  const result: FilterOptions = list.reduce((acc: FilterOptions, item: string) => {
    acc[item] = defaultOption

    return acc
  }, {})

  return result
}

import { useEffect, useState } from "react"
import "./App.css"

import EditPanel from "./components/EditPanel"
import LocalMap from "./components/LocalMap"

import { gisApi } from "./api/gisApi"
import type { FilterOptions, GisInfo, GisRecord } from "./utils/types"


export default function App() {
  const [mark, update] = useState(0)
  const [data, setData] = useState<GisInfo>([])
  const [current, setCurrent2] = useState<GisRecord | Record<string, unknown>>({})
  const [statuses] = useState<FilterOptions>({
    "новый":     false,
    "в работе":  false,
    "отклонено": false,
  })

  function setCurrent(item: GisRecord) {
    setCurrent2(item)

    Object.keys(statuses).forEach((key: string) => {
      statuses[key] = (key === item.status)
    })

    update(mark + 1)
  }

  useEffect(() => {
    const fn = async () => {
      let data = await gisApi.getGIS()
      setData(data)
    }

    fn()
  }, [])

  if (!data.length)
    return null

  return (
    <div style={{ display: "flex" }}>
      <LocalMap data={data} setCurrent={setCurrent} />
      <EditPanel current={current as GisRecord} statuses={statuses} />
    </div>
  )
}

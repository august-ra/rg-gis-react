import { useEffect, useState } from "react"
import "./App.css"

import EditPanel from "./components/EditPanel"
import LocalMap from "./components/LocalMap"

import { gisApi } from "./api/gisApi"


export default function App() {
  const [data, setData] = useState([])
  const [current, setCurrent] = useState({})
  const [statuses] = useState({
    "новый":     false,
    "в работе":  false,
    "отклонено": false,
  })

  useEffect(() => {
    const fn = async () => {
      let data = await gisApi.getGIS()
      setData(data)
    }

    fn()
  }, [])

  return (
    <div style={{ display: "flex" }}>
      {
        data.length
          && (
            <LocalMap data={data} setCurrent={setCurrent} />
          )
      }

      <EditPanel current={current} statuses={statuses} />
    </div>
  )
}

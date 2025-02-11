import { useEffect, useState } from "react"
import "./App.css"

import EditPanel from "./components/EditPanel"
import LocalMap from "./components/LocalMap"

import { gisApi } from "./api/gisApi"


export default function App() {
  const [mark, update] = useState(0)
  const [data, setData] = useState([])
  const [current, setCurrent2] = useState({})
  const [statuses] = useState({
    "новый":     false,
    "в работе":  false,
    "отклонено": false,
  })

  function setCurrent(item) {
    setCurrent2(item)

    Object.keys(statuses).forEach((key) => {
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

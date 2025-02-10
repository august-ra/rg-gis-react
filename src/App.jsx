import { useEffect, useState } from "react"
import "./App.css"

import LocalMap from "./components/LocalMap"

import { gisApi } from "./api/gisApi"


function App() {
  const [data, setData] = useState([])

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
            <LocalMap data={data} />
          )
      }
    </div>
  )
}

export default App

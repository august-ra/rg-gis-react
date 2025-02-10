import { useState } from "react"

import { gisApi } from "../api/gisApi"


export default function EditPanel({ current, statuses }) {
  const [mark, update] = useState(0)

  function setStatus(key) {
    gisApi.addGIS(current._id, { ...current, status: key })

    current.status = key

    Object.keys(statuses).forEach((key) => {
      statuses[key] = (key === current.status)
    })

    update(mark + 1)
  }

  return (
    <div className="edit-panel">
      {
        current._id
          && (
            <>
              <h3 style={{ marginBottom: 0 }}>Метка {current._id.substring(3)}</h3>
              <p><strong>Адрес:</strong><br />{current.address}</p>
              <p><strong>Адрес в Яндекс:</strong><br />{current.address_from_yandex}</p>
              <p><strong>Координаты:</strong><br />{current.x}, {current.y}</p>

              <h4>Статус</h4>
              <ul style={{ listStyle: "none", paddingInline: 0 }}>
                {
                  Object.keys(statuses).map((key) => (
                    <li key={key}>
                      <label>
                        <input type="radio" name="status"
                               value={statuses[key]} checked={statuses[key]}
                               onChange={() => setStatus(key)} />
                        {key}
                      </label>
                    </li>
                  ))
                }
              </ul>
            </>
          )
      }
    </div>
  )
}

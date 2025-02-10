import { useState } from "react"
import { YMaps, Map, Clusterer, Placemark, FullscreenControl, TypeSelector, ListBox, ListBoxItem } from "@pbe/react-yandex-maps"

import { getDistinctOptions } from "../utils/arrays"


export default function LocalMap({ data }) {
  const [mark, update] = useState(false)
  const [areas, setAreas] = useState(getDistinctOptions("area", data))
  const [kinds, setKinds] = useState(getDistinctOptions("kind", data, true))
  const [statuses, setStatuses] = useState({
    "новый":     true,
    "в работе":  true,
    "отклонено": false,
  })

  function getFilterButton(data, caption) {
    return (
      <ListBox key={caption} data={{ content: caption }}>
        <ListBoxItem data={{ content: "отметить все" }} state={{ selected: false }} options={{ selectOnClick: false }} onClick={() => onClickTop(data, true)} />
        <ListBoxItem data={{ content: "снять все" }} state={{ selected: false }} options={{ selectOnClick: false }} onClick={() => onClickTop(data, false)} />
        <ListBoxItem options={{ selectOnClick: false, type: "separator" }} />
        {
          Object.keys(data).map((item) => (
            <ListBoxItem key={item} data={{ content: item }} state={{ selected: data[item] }} options={{ selectOnClick: true }} onClick={() => onClick(data, item)} />
          ))
        }
      </ListBox>
    )
  }

  function onClick(collection, item) {
    collection[item] = !collection[item]

    update(!mark)
  }

  function onClickTop(collection, option) {
    Object.keys(collection).forEach((item) => {
      collection[item] = option
    })

    update(!mark)
  }

  return (
    <>
      <YMaps query={{ apikey: "d5867896-9ed6-4b6b-8dae-75c36596c079" }}>
        <div>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100vw" height="100vh">
            {
              getFilterButton(statuses, "Статусы")
            }{
              getFilterButton(kinds, "Типы помещений")
            }{
              getFilterButton(areas, "Округа")
            }

            <FullscreenControl />
            <TypeSelector />
          </Map>
        </div>
      </YMaps>
   </>
  )
}

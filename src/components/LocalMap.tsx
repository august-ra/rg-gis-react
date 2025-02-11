import { useState } from "react"
import { YMaps, Map, Clusterer, Placemark, FullscreenControl, TypeSelector, ListBox, ListBoxItem } from "@pbe/react-yandex-maps"

import { getDistinctOptions } from "../utils/arrays"
import type { FilterOptions, GisInfo, GisRecord } from "../utils/types"


interface Props {
  data: GisInfo
  setCurrent: (item: GisRecord) => void
}

export default function LocalMap({ data, setCurrent }: Props) {
  const [mark, update] = useState(false)
  const [areas] = useState(getDistinctOptions("area", data))
  const [kinds] = useState(getDistinctOptions("kind", data, true))
  const [statuses] = useState<FilterOptions>({
    "новый":     true,
    "в работе":  true,
    "отклонено": false,
  })

  function getColor(item: GisRecord): string {
    if (item.status === "новый")
      return "#1e98ff"
    else if (item.status === "в работе")
      return "#16bb6f"
    else if (item.status === "отклонено")
      return "#ff531e"

    return "#1e98ff"
  }

  function getFilterButton(data: FilterOptions, caption: string) {
    return (
      <ListBox key={caption} data={{ content: caption }}>
        <ListBoxItem data={{ content: "отметить все" }} state={{ selected: false }} options={{ selectOnClick: false }} onClick={() => onClickTop(data, true)} />
        <ListBoxItem data={{ content: "снять все" }} state={{ selected: false }} options={{ selectOnClick: false }} onClick={() => onClickTop(data, false)} />
        <ListBoxItem options={{ selectOnClick: false, type: "separator" }} />
        {
          Object.keys(data).map((item: string) => (
            <ListBoxItem key={item} data={{ content: item }} state={{ selected: data[item] }} options={{ selectOnClick: true }} onClick={() => onClick(data, item)} />
          ))
        }
      </ListBox>
    )
  }

  function onClick(collection: FilterOptions, item: string) {
    collection[item] = !collection[item]

    update(!mark)
  }

  function onClickTop(collection: FilterOptions, option: boolean) {
    Object.keys(collection).forEach((item: string) => {
      collection[item] = option
    })

    update(!mark)
  }

  const uniquePoint: Record<string, number> = {}
  const options = {
    preset: "islands#invertedVioletClusterIcons",
    groupByCoordinates: false,
    maxZoom: 20,
  }

  return (
    <>
      <YMaps query={{ apikey: "d5867896-9ed6-4b6b-8dae-75c36596c079" }}>
        <div>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="calc(100vw - 250px)" height="100vh">
            <Clusterer options={options}>
              {
                data.map((item: GisRecord) => {
                  const properties = {
                    balloonContentHeader: item._id.substring(3),
                    balloonContentBody : item.address,
                  }

                  const options = {
                    iconColor:             getColor(item),
                    hideIconOnBalloonOpen: false,
                  }

                  if (!areas[item.area] || !kinds[item.kind] || !statuses[item.status])
                    return null

                  const key: string = `${item.x};${item.y}`

                  if (uniquePoint[key]) {
                    item.x += uniquePoint[key] * 0.00002
                    ++uniquePoint[key]
                  } else {
                    uniquePoint[key] = 1
                  }

                  return <Placemark key={item._id} modules={["geoObject.addon.balloon"]}
                                    geometry={[item.x, item.y]}
                                    properties={properties} options={options} onClick={() => setCurrent(item)} />
                })
              }
            </Clusterer>

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

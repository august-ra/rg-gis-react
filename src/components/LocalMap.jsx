import { YMaps, Map, Clusterer, Placemark, FullscreenControl, TypeSelector, ListBox, ListBoxItem } from "@pbe/react-yandex-maps"


export default function LocalMap({ data }) {
  return (
    <>
      <YMaps query={{ apikey: "d5867896-9ed6-4b6b-8dae-75c36596c079" }}>
        <div>
          <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} width="100vw" height="100vh">
            <FullscreenControl />
            <TypeSelector />
          </Map>
        </div>
      </YMaps>
   </>
  )
}

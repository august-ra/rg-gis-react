import { get, ref, set } from "firebase/database"
import { db } from "./firebaseConfig"


export const gisApi = {

  // reading methods

  async getGIS() {
    try {
      const path     = "gis"
      const snapshot = await get(ref(db, path))

      if (!snapshot.exists())
        return []

      const data = Object.values(snapshot.val())
      data.forEach((item) => {
        item.kind = item.kind.trim().toLowerCase()
        item.status = item.status === "new" ? "новый" : item.status
      })

      return data
    } catch (error) {
      console.log(error)
      return []
    }
  },

  // writing methods

  async addGIS(id, data) {
    const path = `gis/${id}`

    await set(ref(db, path), data)
  },
}

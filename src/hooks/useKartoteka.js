import React, { useState } from 'react'
import KartotekaRepository from 'src/repositories/KartotekaRepository'

export default function useKartoteka() {
  const [kartotekaList, setkartotekaList] = useState([])

  return {
    kartotekaList,
    setkartotekaList: id => {
      setkartotekaList(id)
    },
    getAccountsList: async () => {
      let kartotekaList = await KartotekaRepository.getKartoteka()
      if (kartotekaList) {
        console.log(kartotekaList.data)
        setkartotekaList(kartotekaList.data)
      }
    }
  }
}

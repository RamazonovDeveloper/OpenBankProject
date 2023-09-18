import React, { useState } from 'react'
import EIMZO from 'src/lib/Eimzo'

export default function useEimzo() {
  const EIMZOClient = new EIMZO()

  return {
    append_pkcs7_attached: async (pkcs7_64, loadKeyId) => {
      const create = await EIMZOClient.appendPkcs7Attached(pkcs7_64, loadKeyId)

      return create
    },
    createPkcs7: async (loadKey, date) => {
      console.log(date)

      const create = await EIMZOClient.createPkcs7(
        loadKey.id,
        loadKey.cert,
        date
          ? data => {
              console.log('dataaaa', data)
            }
          : null
      )

      return create
    },

    loadKey: async itm => {
      const loadKey = await EIMZOClient.loadKey(itm)
        .then(keyRes => {
          return keyRes
        })
        .catch(err => {
          return err
        })

      if (!loadKey) {
        return {
          type: 'stc_key',
          message: 'Неверный пароль'
        }
      }

      return loadKey
    }
  }
}

import React, { useEffect } from 'react'

export default function EImzo({ itm }) {
  useEffect(() => {
    console.log('useee')

    // if (itm) {
    //     setError(null)

    //     // need refactoring ..
    //     if (false) {
    //       const create = await EIMZOClient.createPkcs7()
    //     } else {
    //       setLoadKeySatus({ status: true, message: 'Введите пароль ключа' })

    //       console.log('loadKey START')

    //       let keyResID

    //       const loadKey = await EIMZOClient.loadKey(itm)
    //         .then(keyRes => {
    //           console.log('keyRes', keyRes)
    //           keyResID = keyRes.id

    //           return keyRes
    //         })
    //         .catch(err => {
    //           console.log('Oh noooo!!')
    //           console.log(err)
    //         })

    //       if (!loadKey) {
    //         setError('stc_key', {
    //           type: 'stc_key',
    //           message: 'Неверный пароль'
    //         })

    //         return
    //       }

    //       setLoadKeySatus({ status: false, message: null })

    //       // const reader = new FileReader()
    //       // reader.onloadend = () => {
    //       //   console.log('reader.result', reader.result)

    //       //   // Logs data:<type>;base64,wL2dvYWwgbW9yZ...
    //       // }

    //       // reader.readAsDataURL(file)

    //       // let fileLocal = localStorage.getItem('file')

    //       const create = await EIMZOClient.createPkcs7(loadKey.id, loadKey.cert, null)
    //       setCurrentHash(create)
    //       console.log('hash', create)

    //       // let pkcs7_64 = localStorage.getItem('hash')

    //       // console.log('pkcs7_64, keyResID', pkcs7_64, keyResID)
    //       // const append_pkcs7_attached = await EIMZOClient.appendPkcs7Attached(pkcs7_64, keyResID)
    //       // console.log('append_pkcs7_attached', append_pkcs7_attached)

    //       // setHash(create)

    //       // let companyInfo = await Company.companyInfo({ hash: create })

    //       // let companyInfo = await auth.register({ hash: create })
    //       // console.log('companyInfo => ', companyInfo)

    //       // // setError('stc_key', 'RELOADING')

    //       // if (companyInfo) {
    //       //   if (companyInfo.status === 404) {
    //       //     router.replace(`/register`)

    //       //     return
    //       //   }

    //       //   if (companyInfo.data.success) {
    //       //     console.log('success')
    //       //     localStorage.setItem('companyInfo', JSON.stringify(companyInfo.data.data))
    //       //     router.replace(`/${companyInfo.data.data.slug}/login`)
    //       //   } else {
    //       //     console.log('error', companyInfo.data)
    //       //     setLoadKeySatus({ status: true, message: companyInfo.data.message })
    //       //     console.log('AAAAA', companyInfo.data.message)
    //       //     setError('stc_key', {
    //       //       type: 'stc_key',
    //       //       message: companyInfo.data.message
    //       //     })
    //       //   }
    //       // }
    //     }
    //   } else {
    //     setError('stc_key', {
    //       type: 'stc_key',
    //       message: 'Пожалуйста, выберите ключ ЭЦП для входа.'
    //     })
    //   }
  }, [])

  return {}
}

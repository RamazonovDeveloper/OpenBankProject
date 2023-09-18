import React, { useState } from 'react'
import TemplatesRepository from 'src/repositories/TemplatesRepository'

export default function useTemplate() {
  const [templates, setTemplates] = useState(null)
  const [templateData, setTemplateData] = useState(null)
  const [newTemplate, setNewTemplate] = useState(null)

  return {
    templates,
    templateData,
    newTemplate,
    setTemplates: data => {
      setTemplates(data)
    },
    setNewTemplate: data => {
      setNewTemplate(data)
    },
    getTemplates: async () => {
      const data = await TemplatesRepository.getTemplates()
      if (data) {
        setTemplates(data.data)
      }
    },
    getTemplateById: async id => {
      const singleData = await TemplatesRepository.getTemplateById(id)
      if (singleData) {
        console.log('singleData.data', singleData)

        setTemplateData(singleData)
      }
    },
    addTemplate: async data => {
      let templateData = await TemplatesRepository.addTemplate(data)

      // setErrors(null)
      // if (user) {
      //   if (!user.success) {
      //     setErrors(user.message)
      //   } else {
      //     setMessage(user.message)

      //     setCreatedSuccessfully(!createdSuccessfully)
      //   }

      //   return user
      // }
    }
  }
}

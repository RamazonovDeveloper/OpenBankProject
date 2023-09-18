import React, { useState } from 'react'
import userProfile from 'src/repositories/ProfileRepository'

export default function useProfile() {
  const [profile, setProfile] = useState(null)

  return {
    profile,
    setProfile: data => {
      setProfile(data)
    },
    viewProfile: async () => {
      let profile = await userProfile.viewProfile()
      if (profile) {
        console.log('photo', profile)
        if (!profile.photo?.startsWith('http')) {
          profile.photo = 'http://' + profile.photo
        }
        setProfile(profile)
      }
    },
    editProfile: async (data, imageFile) => {
      console.log('start', data)
      let photo = imageFile && imageFile.pictureAsFile
      let profile = await userProfile.updateProfile(data, photo)
      console.log('end')
      console.log(profile)

      // if (profile) {
      //   setProfile(profile)
      // }
    }
  }
}

import React, { useState } from 'react'
import UsersRepository from 'src/repositories/UsersRepository'

export default function useUsers() {
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)
  const [message, setMessage] = useState(null)
  const [rmItemStatus, setRmItemStatus] = useState(false)
  const [deletedItem, setDeletedItem] = useState(null)
  const [createdSuccessfully, setCreatedSuccessfully] = useState(false)

  return {
    loading,
    users,
    errors,
    message,
    rmItemStatus,
    deletedItem,
    createdSuccessfully,
    setUsers: data => {
      setUsers(data)
    },
    setRmItemStatus: status => {
      setRmItemStatus(!status)
    },
    setMessage: data => {
      setMessage(data)
    },
    getUsers: async () => {
      setLoading(true)
      let profile = await UsersRepository.getUsers()
      setUsers(profile)
      setLoading(false)
    },
    addUser: async data => {
      let user = await UsersRepository.addUser(data)
      setErrors(null)
      console.log("I'm going to use ad user to employees");
      console.log(user);
      if (user) {
        if (!user.success) {
          setErrors(user.message)
        } else {

          setMessage(user.message || "Bad request !!!")
          setCreatedSuccessfully(!createdSuccessfully)
        }

        return user
      }
    },
    deleteUser: async id => {
      setDeletedItem(id)

      if (id && rmItemStatus) {
        let user = await UsersRepository.deleteUser(id)
        console.log('user ', user)
        if (user.success) {
          setMessage(user.message)

          let profile = await UsersRepository.getUsers()
          setUsers(profile)

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        }
      }

      setRmItemStatus(!rmItemStatus)
    },
    editUser: async data => {
      console.log('EDIT USER', data)

      let user = await UsersRepository.editUser(data)
      setErrors(null)
      if (user) {
        if (!user.success) {
          setErrors(user.message)
        } else {
          setMessage(user.message)
          setCreatedSuccessfully(!createdSuccessfully)
          
        }

        return user
      }
    }
  }
}

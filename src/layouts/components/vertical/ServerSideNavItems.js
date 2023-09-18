// ** React Imports
import { useEffect, useState } from 'react'

// ** Axios Import
import axios from 'axios'

// Repositories
import PermissionRepository, { baseUrl } from 'src/repositories/PermissionRepository'


const ServerSideNavItems = () => {
  // ** State
  const [menuItems, setMenuItems] = useState([])

  async function getMenuItems() {
    let menuArray = await PermissionRepository.getMenuItems()
    setMenuItems(menuArray)
  }
  
  useEffect(() => {
    getMenuItems()
  }, [])

  return { menuItems }
}

export default ServerSideNavItems

// ** React Imports
import { useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** Config Import
import { buildAbilityFor } from 'src/configs/acl'

// ** Component Import
import NotAuthorized from 'src/pages/401'
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'
import authConfig from 'src/configs/auth'

const AclGuard = props => {
  // ** Props
  const { aclAbilities, children, guestGuard } = props
  const [ability, setAbility] = useState(undefined)

  // ** Hooks
  const auth = useAuth()
  const router = useRouter()

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>
  }

  // User is logged in, build ability for the user based on his role
  // zet_commented
  // if (auth.user && auth.user.role && !ability) {
  //   setAbility(buildAbilityFor(auth.user.role, aclAbilities.subject))
  // }

  // Check the access of current user and render pages
  // if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    // return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
  // }
    if(localStorage.getItem(authConfig.storageTokenKeyName)){
      return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>
    }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  )
}

export default AclGuard

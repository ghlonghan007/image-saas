import { auth, signOut } from '@/auth'
import { SignOut } from '@/components/auth/sign-out'
import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDACT_PATH } from '@/routes'

const SettingsPage = async () => {
  const session = await auth()

  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server'
           await signOut()
        }}
        
      > <button type="submit"> signOut</button></form>
     
    </div>
  )
}

export default SettingsPage

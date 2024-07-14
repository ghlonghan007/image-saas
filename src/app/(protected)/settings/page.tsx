import { auth, signOut } from '@/auth'
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
      >
        <button>logout</button>
      </form>
    </div>
  )
}

export default SettingsPage

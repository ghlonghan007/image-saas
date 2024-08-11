
import React from 'react'

import { IconLogo } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'

export const Header: React.FC = async() => {
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center  z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <IconLogo className={cn('w-5 h-5')} />
          <span className="sr-only">Morphic</span>
        </a>
      </div>
      <div className="flex gap-0.5">
      <LoginButton model='modal'>
        <Button variant="secondary" size={'lg'}> 登入 </Button>
      </LoginButton>
      </div>
    </header>
  )
}

export default Header

<<<<<<< HEAD
'use client'
=======
'use server'
>>>>>>> 57ad6b1 (用户问答自己的数据库)
import React from 'react'
import { IconLogo } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
<<<<<<< HEAD
import { RandomAvatar } from "react-random-avatars";
import { auth } from '@/auth'
export const Header:React.FC = async() => {
  // const session = await auth()
=======

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { auth, signOut } from '@/auth'
import { SignOut } from './auth/sign-out'
import { RandomUserAvatar } from '@/components/RandomUserAvatar'

export const Header = async () => {
  const session = await auth()
  console.log(session)
>>>>>>> 57ad6b1 (用户问答自己的数据库)
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <IconLogo className={cn('w-5 h-5')} />
          <span className="sr-only">Morphic</span>
        </a>
      </div>

      <div className="flex gap-0.5">
<<<<<<< HEAD
      <LoginButton model='modal'>
        <Button variant="secondary" size={'lg'}> 登入 </Button>
      </LoginButton>
            <RandomAvatar name={ 'defult'} size={40} />
=======
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                {session.user.image ? (
                  <AvatarImage
                    src={session.user.image}
                    alt={session.user.name ?? 'User'}
                  />
                ) : (
                  <RandomUserAvatar
                    name={session.user.name ?? 'User'}
                    size={40}

                  />
                )}
                <AvatarFallback>
                  {session.user.name?.charAt(0) ?? 'U'}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {session.user.name ?? 'User'}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SignOut className="" text="登出" />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <LoginButton model="modal">
            <Button variant="secondary" size={'lg'}>
              登入
            </Button>
          </LoginButton>
        )}
>>>>>>> 57ad6b1 (用户问答自己的数据库)
      </div>
    </header>
  )
}

export default Header

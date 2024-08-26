'use server'
import React from 'react'
import { IconLogo } from '@/components/ui/icon'
import { cn } from '@/lib/utils'
import { LoginButton } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'

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
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <IconLogo className={cn('w-8 h-8')} />
          <span className="sr-only">Morphic</span>
        </a>
      </div>

      <div className="flex gap-0.5">
        {session?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
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
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{session.user.name ?? 'User'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <SignOut className="w-full text-left" text="登出" />
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
      </div>
    </header>
  )
}

export default Header
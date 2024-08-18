// 'use client'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FaGitlab } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { signIn } from '@/auth'
import { socialLogin } from '@/lib/actions/login'

export const Social = () => {

  return (
    <div className="flex items-center w-full gap-x-4">
      <Button
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={() => socialLogin('github')}
      >
        <div>
          <FaGithub size={30} />
        </div>
      </Button>
      <Button
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={() => socialLogin('gitlab')}
      >
        <FaGitlab size={30}></FaGitlab>
      </Button>
      {/* <form
        action={async () => {
          'use server';
          // 登录完成后，重定向到user页面
          await signIn('github', { redirectTo: '/user' });
        }}
      >
        <Button>github登录</Button>
      </form> */}
    </div>
  )
}

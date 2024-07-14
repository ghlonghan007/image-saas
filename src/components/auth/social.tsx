'use client'
import { Button } from '@/components/ui/button'
import { FaGithub } from 'react-icons/fa'
import { FaGitlab } from 'react-icons/fa'
export const Social = () => {
  return (
    <div className="flex items-center w-full gap-x-4">
      <Button
        size={'lg'}
        className="w-full"
        variant={'outline'}
        onClick={() => {}}
      >
        <div>
          <FaGithub size={30} />
        </div>
      </Button>
      <Button size={'lg'} className="w-full" variant={'outline'}>
        <FaGitlab size={30}></FaGitlab>
      </Button>
    </div>
  )
}

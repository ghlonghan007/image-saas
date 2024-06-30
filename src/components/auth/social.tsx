'use client'
import { Button } from "@/components/ui/button"
import {FaGithub} from "react-icons/fa"

export  const Social = ()=>{
  return (
    <div className="flex items-center w-full gap-x-4">
      <Button 
        size={"lg"}
        className="w-full"
        variant={'outline'}
        onClick={()=>{}}
      >
        <FaGithub className="h-5 w-5"></FaGithub>
        
      </Button>
      <Button 
        size={"lg"}
        className="w-full"
        variant={'outline'}
      >
        <FaGithub className="h-5 w-5"></FaGithub>
        
      </Button>
    </div>
  )
}
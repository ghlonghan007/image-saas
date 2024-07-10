
import { FaCheckCircle } from "react-icons/fa";

interface FormSuccessProps {
  message: string | undefined
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null
  return (
    <div className="bg-emerald-400/15 p-3 rounded-md flex
    items-center gap-2 text-sm text-emerald-500">
      <FaCheckCircle className="w-5 h-5" />
      <p>{message}</p>
    </div>
  )
}

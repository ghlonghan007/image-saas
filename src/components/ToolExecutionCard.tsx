import React from 'react'

// Define a spinner component for loading state
const Spinner = () => (
  <svg
    className="w-6 h-6 animate-spin text-gray-900"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 0 1 15.832-4.104L16.184 8.33A4 4 0 1 0 11.12 16.1l-1.452-.007L7.7 16.993A8 8 0 0 1 4 12z"
    ></path>
  </svg>
)

// Define a check mark component for the completed state
const CheckMark = () => (
  <svg
    className="w-6 h-6 text-green-500"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M20.285 5.715a1 1 0 00-1.413 0L10 14.586 5.128 9.715a1 1 0 00-1.415 1.413l5.5 5.5a1 1 0 001.415 0l9.5-9.5a1 1 0 000-1.414z"
    ></path>
  </svg>
)

// Define an X mark component for the failed state
const XMark = () => (
  <svg
    className="w-6 h-6 text-red-500"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
    />
  </svg>
)

interface ToolCallCardProps {
  isLoading: boolean;
  toolName: string | undefined;
  isFailed: boolean;
}

const ToolCallCard: React.FC<ToolCallCardProps> = ({ isLoading, toolName, isFailed }) => {
  let message = ''
  let Icon = isLoading ? Spinner : (isFailed ? XMark : CheckMark)

  if (isLoading) {
    message = toolName === 'addResource' ? '添加向量中,请稍后' : '查询中'
  } else if (isFailed) {
    message = '调用失败'
  } else {
    message = toolName === 'addResource' ? '添加完成,请稍后' : '查询完成'
  }

  return (
    <span className="flex items-center ml-2">
      <Icon />
      <span className="ml-2">{message}</span>
    </span>
  )
}

export default ToolCallCard
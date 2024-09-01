import React from 'react'

// Define the props for the Button component
export type ButtonProps = {
  label: string
  icon: React.ReactNode
  onClick: () => void
}

// Define the button component
export const Button: React.FC<ButtonProps> = ({ label, icon, onClick }) => {
  return (
    <button
      className="flex items-center space-x-2 px-6 py-3 border rounded-lg shadow-md hover:bg-gray-200"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

import React from 'react'
import { Activity } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-2 bg-primary-600 rounded-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Snake ID</h1>
            <p className="text-gray-600">Identificação de Serpentes com IA</p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
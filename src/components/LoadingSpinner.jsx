import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="card text-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-primary-600 rounded-full animate-pulse"></div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Analisando a imagem...
          </h3>
          <p className="text-gray-600">
            Nossa IA está identificando a espécie da serpente
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner
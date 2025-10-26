import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Camera, AlertCircle } from 'lucide-react'

const ImageUpload = ({ onImageUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file) {
      onImageUpload(file)
    }
  }, [onImageUpload])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    rejectedFiles
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const hasRejectedFiles = rejectedFiles && rejectedFiles.length > 0

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <Camera className="w-16 h-16 text-primary-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Identifique uma Serpente
        </h2>
        <p className="text-gray-600">
          Faça upload de uma foto e nossa IA identificará a espécie para você
        </p>
      </div>

      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive && !isDragReject 
            ? 'border-primary-400 bg-primary-50' 
            : isDragReject
            ? 'border-red-400 bg-red-50'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <Upload className={`w-12 h-12 mx-auto mb-4 ${
          isDragActive && !isDragReject 
            ? 'text-primary-600' 
            : isDragReject
            ? 'text-red-500'
            : 'text-gray-400'
        }`} />
        
        {isDragActive && !isDragReject ? (
          <p className="text-primary-600 font-medium">
            Solte a imagem aqui...
          </p>
        ) : isDragReject ? (
          <p className="text-red-500 font-medium">
            Tipo de arquivo não suportado
          </p>
        ) : (
          <div>
            <p className="text-gray-700 font-medium mb-2">
              Arraste uma imagem aqui ou clique para selecionar
            </p>
            <p className="text-sm text-gray-500">
              Suporta: JPG, PNG, GIF, BMP, WebP (máx. 10MB)
            </p>
          </div>
        )}
      </div>

      {hasRejectedFiles && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700 font-medium">Erro no upload:</p>
          </div>
          {rejectedFiles.map((file, index) => (
            <p key={index} className="text-red-600 text-sm mt-1">
              {file.file.name}: {file.errors[0]?.message}
            </p>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Dicas para melhor identificação:</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use fotos com boa iluminação e foco</li>
          <li>• Mostre o corpo todo da serpente, se possível</li>
          <li>• Evite fotos muito distantes ou borradas</li>
          <li>• Fotografe de um ângulo que mostre padrões e cores</li>
        </ul>
      </div>
    </div>
  )
}

export default ImageUpload
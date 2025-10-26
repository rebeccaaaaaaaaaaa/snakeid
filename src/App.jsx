import React, { useState } from 'react'
import Header from './components/Header'
import ImageUpload from './components/ImageUpload'
import IdentificationResult from './components/IdentificationResult'
import LoadingSpinner from './components/LoadingSpinner'
import APIConfiguration from './components/APIConfiguration'
import DebugInfo from './components/DebugInfo'
import { identifySnake } from './services/snakeIdentification'

function App() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [identificationResult, setIdentificationResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [debugData, setDebugData] = useState(null)

  const handleImageUpload = async (file) => {
    const startTime = Date.now()
    setLoading(true)
    setError(null)
    setIdentificationResult(null)
    setDebugData(null)
    
    try {
      // Criar URL para preview da imagem
      const imageUrl = URL.createObjectURL(file)
      setUploadedImage(imageUrl)
      
      console.log('Iniciando identificação...')
      
      // Identificar a serpente
      const result = await identifySnake(file)
      const processingTime = Date.now() - startTime
      
      console.log('Resultado da identificação:', result)
      
      setIdentificationResult(result)
      setDebugData({
        fileInfo: {
          name: file.name,
          size: file.size
        },
        processingTime
      })
      
    } catch (err) {
      setError('Erro ao identificar a serpente. Tente novamente.')
      console.error('Erro na identificação:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setUploadedImage(null)
    setIdentificationResult(null)
    setError(null)
    setLoading(false)
    setDebugData(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!uploadedImage ? (
            <ImageUpload onImageUpload={handleImageUpload} />
          ) : (
            <div className="space-y-6">
              {/* Imagem enviada */}
              <div className="card">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Imagem Enviada
                  </h2>
                  <button
                    onClick={handleReset}
                    className="btn-secondary text-sm"
                  >
                    Nova Análise
                  </button>
                </div>
                <div className="flex justify-center">
                  <img
                    src={uploadedImage}
                    alt="Serpente para identificação"
                    className="max-w-full max-h-96 rounded-lg shadow-md object-contain"
                  />
                </div>
              </div>

              {/* Loading */}
              {loading && <LoadingSpinner />}

              {/* Erro */}
              {error && (
                <div className="card border-l-4 border-red-500 bg-red-50">
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {/* Resultado */}
              {identificationResult && (
                <>
                  <IdentificationResult result={identificationResult} />
                  <DebugInfo result={identificationResult} debugData={debugData} />
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Configuração de APIs */}
      <APIConfiguration 
        onConfigurationChange={(config) => {
          console.log('Configuração atualizada:', config)
        }}
      />

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
            Snake ID - Identificação de Serpentes com IA © 2025
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
import React from 'react'
import { Info, Eye, Zap } from 'lucide-react'

const DebugInfo = ({ result, debugData }) => {
  if (!debugData) return null

  return (
    <div className="card border-l-4 border-blue-500 bg-blue-50">
      <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
        <Info className="w-5 h-5 mr-2" />
        🔍 Informações de Debug
      </h3>
      
      <div className="space-y-3 text-sm">
        {/* API Utilizada */}
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-blue-600" />
          <span className="font-medium">API Utilizada:</span>
          <span className="bg-blue-100 px-2 py-1 rounded text-blue-800">
            {result.source || 'OpenAI Vision'}
          </span>
        </div>

        {/* Características Detectadas */}
        {result.detectedFeatures && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Características Detectadas:</span>
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <ul className="list-disc list-inside space-y-1">
                {result.detectedFeatures.map((feature, index) => (
                  <li key={index} className="text-blue-800">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Identificação Features */}
        {result.identificationFeatures && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Eye className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Características de Identificação:</span>
            </div>
            <div className="bg-blue-100 p-2 rounded">
              <ul className="list-disc list-inside space-y-1">
                {result.identificationFeatures.map((feature, index) => (
                  <li key={index} className="text-blue-800">{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Informações do Arquivo */}
        {debugData.fileInfo && (
          <div>
            <span className="font-medium">Arquivo:</span>
            <span className="ml-2 text-gray-600">
              {debugData.fileInfo.name} ({Math.round(debugData.fileInfo.size / 1024)}KB)
            </span>
          </div>
        )}

        {/* Tempo de Processamento */}
        {debugData.processingTime && (
          <div>
            <span className="font-medium">Tempo de processamento:</span>
            <span className="ml-2 text-gray-600">{debugData.processingTime}ms</span>
          </div>
        )}

        {/* Consenso entre APIs */}
        {result.consensus && (
          <div>
            <span className="font-medium">Consenso:</span>
            <span className="ml-2 text-gray-600">
              {result.consensus.successfulAPIs}/{result.consensus.totalAPIs} APIs concordaram
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 p-2 bg-yellow-100 rounded text-xs text-yellow-800">
        💡 <strong>Dica:</strong> Para melhor precisão, use imagens com boa iluminação e foque nas características distintivas da serpente (chocalho, padrões, formato da cabeça).
      </div>
    </div>
  )
}

export default DebugInfo
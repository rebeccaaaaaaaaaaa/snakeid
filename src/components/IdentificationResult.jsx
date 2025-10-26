import React from 'react'
import { AlertTriangle, Shield, MapPin, Info, Ruler, Palette } from 'lucide-react'

const IdentificationResult = ({ result }) => {
  const {
    species,
    scientificName,
    confidence,
    venomous,
    description,
    habitat,
    size,
    colors,
    distribution,
    dangerLevel,
    firstAid
  } = result

  const getDangerColor = (level) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'low': return 'text-green-600 bg-green-100 border-green-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getDangerText = (level) => {
    switch (level) {
      case 'high': return 'Alto Risco'
      case 'medium': return 'Risco Moderado'
      case 'low': return 'Baixo Risco'
      default: return 'Desconhecido'
    }
  }

  return (
    <div className="space-y-6">
      {/* Identificação Principal */}
      <div className="card">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{species}</h2>
            <p className="text-lg text-gray-600 italic">{scientificName}</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Confiança</div>
            <div className="text-2xl font-bold text-primary-600">{confidence}%</div>
          </div>
        </div>

        {/* Status de Perigo */}
        <div className={`p-4 rounded-lg border ${getDangerColor(dangerLevel)} mb-4`}>
          <div className="flex items-center space-x-3">
            {venomous ? (
              <AlertTriangle className="w-6 h-6" />
            ) : (
              <Shield className="w-6 h-6" />
            )}
            <div>
              <p className="font-semibold">
                {venomous ? 'Serpente Venenosa' : 'Serpente Não Venenosa'}
              </p>
              <p className="text-sm">
                Nível de perigo: {getDangerText(dangerLevel)}
              </p>
            </div>
          </div>
        </div>

        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Características */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Info className="w-5 h-5 mr-2 text-primary-600" />
            Características
          </h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Ruler className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-500">Tamanho:</span>
                <span className="ml-2 text-gray-900">{size}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Palette className="w-4 h-4 text-gray-500" />
              <div>
                <span className="text-sm text-gray-500">Cores:</span>
                <span className="ml-2 text-gray-900">{colors}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-primary-600" />
            Habitat e Distribuição
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500 block">Habitat:</span>
              <span className="text-gray-900">{habitat}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500 block">Distribuição:</span>
              <span className="text-gray-900">{distribution}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primeiros Socorros (se venenosa) */}
      {venomous && firstAid && (
        <div className="card border-l-4 border-red-500 bg-red-50">
          <h3 className="text-lg font-semibold text-red-900 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            ⚠️ Primeiros Socorros em Caso de Mordida
          </h3>
          <div className="text-red-800 space-y-2">
            {firstAid.map((instruction, index) => (
              <p key={index} className="flex items-start">
                <span className="font-semibold mr-2">{index + 1}.</span>
                {instruction}
              </p>
            ))}
          </div>
          <div className="mt-4 p-3 bg-red-100 rounded-lg">
            <p className="text-red-900 font-semibold text-sm">
              🚨 IMPORTANTE: Procure atendimento médico imediatamente!
            </p>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="card bg-gray-50 border border-gray-200">
        <p className="text-sm text-gray-600">
          <strong>Disclaimer:</strong> Esta identificação é baseada em IA e pode não ser 100% precisa. 
          Para identificação definitiva, consulte um especialista em herpetologia. Em caso de acidente 
          com serpentes, procure atendimento médico imediatamente.
        </p>
      </div>
    </div>
  )
}

export default IdentificationResult
import React, { useState, useEffect } from 'react'
import { Settings, Key, CheckCircle, XCircle, Eye, EyeOff } from 'lucide-react'
import { configureAPIs, testAPIConnectivity } from '../services/snakeIdentification'

const APIConfiguration = ({ onConfigurationChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [config, setConfig] = useState({
    openaiApiKey: '',
    googleVisionApiKey: '',
    useMockData: false // Padrão: usar APIs reais
  })
  const [showKeys, setShowKeys] = useState({
    openai: false,
    google: false
  })
  const [connectivity, setConnectivity] = useState(null)
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    // Carregar configuração salva no localStorage
    const savedConfig = localStorage.getItem('snakeId_apiConfig')
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig)
        setConfig(parsed)
        configureAPIs(parsed)
      } catch (error) {
        console.error('Erro ao carregar configuração salva:', error)
      }
    }
  }, [])

  const handleConfigChange = (key, value) => {
    const newConfig = { ...config, [key]: value }
    setConfig(newConfig)
    
    // Salvar no localStorage
    localStorage.setItem('snakeId_apiConfig', JSON.stringify(newConfig))
    
    // Aplicar configuração
    configureAPIs(newConfig)
    
    // Notificar componente pai
    if (onConfigurationChange) {
      onConfigurationChange(newConfig)
    }
  }

  const handleTestConnectivity = async () => {
    setTesting(true)
    try {
      const results = await testAPIConnectivity()
      setConnectivity(results)
    } catch (error) {
      console.error('Erro ao testar conectividade:', error)
    } finally {
      setTesting(false)
    }
  }

  const toggleKeyVisibility = (apiType) => {
    setShowKeys(prev => ({
      ...prev,
      [apiType]: !prev[apiType]
    }))
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-colors z-50"
        title="Configurar APIs de IA"
      >
        <Settings className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Settings className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Configuração de APIs de IA
                </h2>
                <p className="text-gray-600 text-sm">
                  Configure suas chaves de API para identificação real
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Modo de Simulação */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="useMockData"
                checked={config.useMockData}
                onChange={(e) => handleConfigChange('useMockData', e.target.checked)}
                className="w-4 h-4 text-primary-600"
              />
              <label htmlFor="useMockData" className="font-medium text-blue-900">
                Usar dados simulados (para desenvolvimento)
              </label>
            </div>
            <p className="text-blue-700 text-sm mt-2">
              Quando ativado, usa dados fictícios em vez de APIs reais.
              Desative para usar suas próprias chaves de API.
            </p>
          </div>

          {/* Configuração OpenAI */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Key className="w-5 h-5 mr-2 text-primary-600" />
              OpenAI GPT-4 Vision
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showKeys.openai ? 'text' : 'password'}
                  placeholder="sk-..."
                  value={config.openaiApiKey}
                  onChange={(e) => handleConfigChange('openaiApiKey', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={config.useMockData}
                />
                <button
                  type="button"
                  onClick={() => toggleKeyVisibility('openai')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={config.useMockData}
                >
                  {showKeys.openai ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Melhor opção para identificação detalhada. Obtenha sua chave em{' '}
                <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" 
                   className="text-primary-600 hover:underline">
                  platform.openai.com
                </a>
              </p>
            </div>
          </div>

          {/* Configuração Google Vision */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Key className="w-5 h-5 mr-2 text-primary-600" />
              Google Vision AI
            </h3>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type={showKeys.google ? 'text' : 'password'}
                  placeholder="AIza..."
                  value={config.googleVisionApiKey}
                  onChange={(e) => handleConfigChange('googleVisionApiKey', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg pr-12 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={config.useMockData}
                />
                <button
                  type="button"
                  onClick={() => toggleKeyVisibility('google')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={config.useMockData}
                >
                  {showKeys.google ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-gray-600 text-sm">
                Boa para detecção geral de objetos. Configure no{' '}
                <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer"
                   className="text-primary-600 hover:underline">
                  Google Cloud Console
                </a>
              </p>
            </div>
          </div>

          {/* iNaturalist Info */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-900 mb-2 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              iNaturalist API
            </h3>
            <p className="text-green-700 text-sm">
              Gratuita e sempre disponível. Usa a base de dados científica do iNaturalist
              para identificação baseada em características.
            </p>
          </div>

          {/* Teste de Conectividade */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-900">
                Status das APIs
              </h3>
              <button
                onClick={handleTestConnectivity}
                disabled={testing}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {testing ? 'Testando...' : 'Testar Conectividade'}
              </button>
            </div>

            {connectivity && (
              <div className="space-y-2">
                {Object.entries(connectivity).map(([api, status]) => (
                  <div key={api} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium capitalize">
                      {api === 'inaturalist' ? 'iNaturalist' : api === 'openai' ? 'OpenAI' : 'Google Vision'}
                    </span>
                    <div className="flex items-center space-x-2">
                      {status.available ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`text-sm ${status.available ? 'text-green-700' : 'text-red-700'}`}>
                        {status.available ? 'Disponível' : status.error}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Instruções */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">📝 Instruções:</h4>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Para desenvolvimento: deixe "usar dados simulados" ativado</li>
              <li>• Para produção: configure pelo menos uma API e desative simulação</li>
              <li>• OpenAI Vision oferece os melhores resultados</li>
              <li>• iNaturalist é gratuita mas menos precisa</li>
              <li>• As configurações são salvas automaticamente no navegador</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default APIConfiguration
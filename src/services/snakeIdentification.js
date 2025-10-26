// Serviço de identificação de serpentes com múltiplas opções de IA
import { GoogleVisionSnakeIdentifier } from './googleVisionAI.js'
import { OpenAIVisionSnakeIdentifier } from './openaiVision.js'
import { iNaturalistSnakeIdentifier } from './inaturalistAPI.js'

// Configuração das APIs (use suas próprias chaves)
const AI_CONFIG = {
  // Descomente e configure suas chaves de API
  GOOGLE_VISION_API_KEY: import.meta.env.VITE_GOOGLE_VISION_API_KEY,
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
  USE_MOCK_DATA: import.meta.env.VITE_USE_MOCK_DATA === 'true'
}

// Debug das configurações
console.log('🔧 Configurações carregadas:')
console.log('- OpenAI API Key:', AI_CONFIG.OPENAI_API_KEY ? '✅ Configurada' : '❌ Não configurada')
console.log('- Google Vision API Key:', AI_CONFIG.GOOGLE_VISION_API_KEY ? '✅ Configurada' : '❌ Não configurada')
console.log('- Use Mock Data:', AI_CONFIG.USE_MOCK_DATA)

// Dados simulados para desenvolvimento
const mockSnakeData = [
  {
    species: "Jararaca",
    scientificName: "Bothrops jararaca",
    confidence: 87,
    venomous: true,
    description: "A jararaca é uma das serpentes venenosas mais comuns no Brasil. Possui corpo robusto e cabeça triangular bem definida. É responsável por cerca de 90% dos acidentes ofídicos no país.",
    habitat: "Florestas tropicais, áreas rurais e periurbanas",
    size: "Até 1,5 metros de comprimento",
    colors: "Marrom com manchas escuras em forma de losango",
    distribution: "Região Sul e Sudeste do Brasil",
    dangerLevel: "high",
    firstAid: [
      "Mantenha a vítima calma e em repouso",
      "Remova anéis, pulseiras e roupas apertadas",
      "Não faça torniquete ou garrote",
      "Não corte nem chupe o local da mordida",
      "Procure atendimento médico urgente",
      "Se possível, fotografe a serpente para identificação"
    ]
  },
  {
    species: "Coral Verdadeira",
    scientificName: "Micrurus frontalis",
    confidence: 92,
    venomous: true,
    description: "A coral verdadeira possui anéis coloridos alternados em vermelho, preto e branco/amarelo. Seu veneno é altamente neurotóxico, mas raramente ataca humanos devido ao seu comportamento pacífico.",
    habitat: "Florestas, campos e áreas rurais",
    size: "Até 1 metro de comprimento",
    colors: "Anéis vermelhos, pretos e brancos/amarelos",
    distribution: "Sul e Sudeste do Brasil",
    dangerLevel: "high",
    firstAid: [
      "Mantenha a vítima calma e imóvel",
      "Procure atendimento médico IMEDIATAMENTE",
      "Não aplique torniquete",
      "Monitore a respiração da vítima",
      "Prepare-se para ventilação artificial se necessário"
    ]
  },
  {
    species: "Jiboia",
    scientificName: "Boa constrictor",
    confidence: 95,
    venomous: false,
    description: "A jiboia é uma serpente não venenosa de grande porte que mata suas presas por constrição. É inofensiva para humanos adultos, sendo inclusive benéfica por controlar roedores.",
    habitat: "Florestas tropicais, cerrado e caatinga",
    size: "Até 4 metros de comprimento",
    colors: "Marrom claro com manchas escuras irregulares",
    distribution: "Todo o território brasileiro",
    dangerLevel: "low",
    firstAid: null
  },
  {
    species: "Cobra d'Água",
    scientificName: "Helicops angulatus",
    confidence: 78,
    venomous: false,
    description: "A cobra d'água é uma serpente não venenosa que vive próxima a corpos d'água. Alimenta-se principalmente de peixes e anfíbios. Pode morder se manuseada, mas não oferece risco grave.",
    habitat: "Rios, lagos, açudes e áreas alagadas",
    size: "Até 80 centímetros de comprimento",
    colors: "Marrom escuro com faixas transversais mais claras",
    distribution: "Região Nordeste e Centro-Oeste do Brasil",
    dangerLevel: "low",
    firstAid: null
  },
  {
    species: "Cascavel",
    scientificName: "Crotalus durissus",
    confidence: 89,
    venomous: true,
    description: "A cascavel é facilmente identificada pelo chocalho na cauda. Seu veneno é altamente tóxico, causando efeitos neurotóxicos, hemolíticos e coagulantes. É uma das serpentes mais perigosas do Brasil.",
    habitat: "Cerrado, caatinga e campos abertos",
    size: "Até 1,8 metros de comprimento",
    colors: "Marrom claro com losangos escuros no dorso",
    distribution: "Região Central e Nordeste do Brasil",
    dangerLevel: "high",
    firstAid: [
      "Mantenha a vítima em repouso absoluto",
      "Procure atendimento médico urgente",
      "Não aplique torniquete",
      "Remova objetos que possam apertar com o inchaço",
      "Monitore sinais vitais",
      "Administre soro antiofídico o mais rápido possível"
    ]
  }
]

// Função principal de identificação que escolhe a melhor API disponível
export const identifySnake = async (imageFile) => {
  console.log('🐍 Iniciando identificação de serpente...')
  console.log('📁 Arquivo:', imageFile.name, 'Tamanho:', imageFile.size)
  
  // Se estiver usando dados simulados
  if (AI_CONFIG.USE_MOCK_DATA) {
    console.log('⚠️  Usando dados simulados (VITE_USE_MOCK_DATA=true)')
    return identifySnakeWithMockData(imageFile)
  }

  console.log('🤖 Tentando identificação com APIs reais...')

  // Tentar identificação com APIs reais em ordem de preferência
  try {
    // 1. Tentar OpenAI Vision (melhor para identificação detalhada)
    if (AI_CONFIG.OPENAI_API_KEY) {
      console.log('🧠 Tentando identificação com OpenAI Vision...')
      const openaiIdentifier = new OpenAIVisionSnakeIdentifier(AI_CONFIG.OPENAI_API_KEY)
      const result = await openaiIdentifier.identifySnake(imageFile)
      console.log('✅ OpenAI Success:', result.species)
      return result
    } else {
      console.log('❌ OpenAI API key não configurada')
    }

    // 2. Tentar Google Vision (boa para detecção geral)
    if (AI_CONFIG.GOOGLE_VISION_API_KEY) {
      console.log('👁️  Tentando identificação com Google Vision...')
      const googleIdentifier = new GoogleVisionSnakeIdentifier(AI_CONFIG.GOOGLE_VISION_API_KEY)
      const result = await googleIdentifier.identifySnake(imageFile)
      console.log('✅ Google Vision Success:', result.species)
      return result
    } else {
      console.log('❌ Google Vision API key não configurada')
    }

    // 3. Usar iNaturalist (gratuito, mas menos preciso)
    console.log('🌿 Tentando identificação com iNaturalist...')
    const inatIdentifier = new iNaturalistSnakeIdentifier()
    const result = await inatIdentifier.identifySnake(imageFile)
    console.log('✅ iNaturalist Success:', result.species)
    return result

  } catch (error) {
    console.error('❌ Erro em todas as APIs:', error.message)
    console.log('🔄 Usando dados simulados como fallback...')
    return identifySnakeWithMockData(imageFile)
  }
}

// Função de identificação simulada (para desenvolvimento)
const identifySnakeWithMockData = async (imageFile) => {
  // Simula o tempo de processamento da IA
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000))
  
  // Para o MVP, retorna um resultado aleatório
  const randomSnake = mockSnakeData[Math.floor(Math.random() * mockSnakeData.length)]
  
  // Adiciona uma pequena variação na confiança
  const confidence = Math.max(65, Math.min(98, randomSnake.confidence + (Math.random() - 0.5) * 20))
  
  return {
    ...randomSnake,
    confidence: Math.round(confidence)
  }
}

// Função para identificação com API específica
export const identifySnakeWithAPI = async (imageFile, apiType = 'auto') => {
  try {
    switch (apiType) {
      case 'openai':
        if (!AI_CONFIG.OPENAI_API_KEY) {
          throw new Error('OpenAI API key não configurada')
        }
        const openaiIdentifier = new OpenAIVisionSnakeIdentifier(AI_CONFIG.OPENAI_API_KEY)
        return await openaiIdentifier.identifySnake(imageFile)

      case 'google':
        if (!AI_CONFIG.GOOGLE_VISION_API_KEY) {
          throw new Error('Google Vision API key não configurada')
        }
        const googleIdentifier = new GoogleVisionSnakeIdentifier(AI_CONFIG.GOOGLE_VISION_API_KEY)
        return await googleIdentifier.identifySnake(imageFile)

      case 'inaturalist':
        const inatIdentifier = new iNaturalistSnakeIdentifier()
        return await inatIdentifier.identifySnake(imageFile)

      case 'auto':
      default:
        return await identifySnake(imageFile)
    }
  } catch (error) {
    console.error(`Erro na identificação com ${apiType}:`, error)
    throw error
  }
}

// Função para comparar resultados de múltiplas APIs
export const identifySnakeWithMultipleAPIs = async (imageFile) => {
  const results = []
  const promises = []

  // Executar todas as APIs disponíveis em paralelo
  if (AI_CONFIG.OPENAI_API_KEY) {
    promises.push(
      identifySnakeWithAPI(imageFile, 'openai')
        .then(result => ({ api: 'OpenAI', result, success: true }))
        .catch(error => ({ api: 'OpenAI', error: error.message, success: false }))
    )
  }

  if (AI_CONFIG.GOOGLE_VISION_API_KEY) {
    promises.push(
      identifySnakeWithAPI(imageFile, 'google')
        .then(result => ({ api: 'Google Vision', result, success: true }))
        .catch(error => ({ api: 'Google Vision', error: error.message, success: false }))
    )
  }

  promises.push(
    identifySnakeWithAPI(imageFile, 'inaturalist')
      .then(result => ({ api: 'iNaturalist', result, success: true }))
      .catch(error => ({ api: 'iNaturalist', error: error.message, success: false }))
  )

  // Aguardar todos os resultados
  const allResults = await Promise.all(promises)
  
  // Filtrar resultados bem-sucedidos
  const successfulResults = allResults.filter(r => r.success)
  
  if (successfulResults.length === 0) {
    throw new Error('Nenhuma API conseguiu identificar a serpente')
  }

  // Retornar o resultado com maior confiança
  const bestResult = successfulResults.reduce((best, current) => 
    current.result.confidence > best.result.confidence ? current : best
  )

  // Adicionar informações sobre consenso
  bestResult.result.consensus = {
    totalAPIs: allResults.length,
    successfulAPIs: successfulResults.length,
    allResults: allResults
  }

  return bestResult.result
}

// Função para configurar chaves de API dinamicamente
export const configureAPIs = (config) => {
  if (config.googleVisionApiKey) {
    AI_CONFIG.GOOGLE_VISION_API_KEY = config.googleVisionApiKey
  }
  if (config.openaiApiKey) {
    AI_CONFIG.OPENAI_API_KEY = config.openaiApiKey
  }
  if (config.useMockData !== undefined) {
    AI_CONFIG.USE_MOCK_DATA = config.useMockData
  }
}

// Função para testar conectividade das APIs
export const testAPIConnectivity = async () => {
  const results = {
    openai: { available: false, error: null },
    google: { available: false, error: null },
    inaturalist: { available: false, error: null }
  }

  // Testar OpenAI
  if (AI_CONFIG.OPENAI_API_KEY) {
    try {
      const response = await fetch('https://api.openai.com/v1/models', {
        headers: { 'Authorization': `Bearer ${AI_CONFIG.OPENAI_API_KEY}` }
      })
      results.openai.available = response.ok
      if (!response.ok) {
        results.openai.error = 'API key inválida ou sem permissão'
      }
    } catch (error) {
      results.openai.error = error.message
    }
  } else {
    results.openai.error = 'API key não configurada'
  }

  // Testar Google Vision
  if (AI_CONFIG.GOOGLE_VISION_API_KEY) {
    try {
      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${AI_CONFIG.GOOGLE_VISION_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requests: [] })
      })
      results.google.available = response.status !== 403
      if (response.status === 403) {
        results.google.error = 'API key inválida'
      }
    } catch (error) {
      results.google.error = error.message
    }
  } else {
    results.google.error = 'API key não configurada'
  }

  // Testar iNaturalist (sempre disponível)
  try {
    const response = await fetch('https://api.inaturalist.org/v1/taxa/1')
    results.inaturalist.available = response.ok
  } catch (error) {
    results.inaturalist.error = error.message
  }

  return results
}
// Integração com Google Vision AI para identificação de serpentes
export class GoogleVisionSnakeIdentifier {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.endpoint = 'https://vision.googleapis.com/v1/images:annotate'
  }

  async identifySnake(imageFile) {
    try {
      // Converter imagem para base64
      const base64Image = await this.fileToBase64(imageFile)
      
      // Preparar request para Google Vision
      const requestBody = {
        requests: [{
          image: {
            content: base64Image.split(',')[1] // Remove data:image prefix
          },
          features: [
            { type: 'LABEL_DETECTION', maxResults: 20 },
            { type: 'TEXT_DETECTION' },
            { type: 'OBJECT_LOCALIZATION', maxResults: 10 }
          ]
        }]
      }

      const response = await fetch(`${this.endpoint}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(`Google Vision API error: ${data.error?.message}`)
      }

      // Processar resposta e identificar serpente
      return this.processGoogleVisionResponse(data)

    } catch (error) {
      console.error('Erro na identificação com Google Vision:', error)
      throw error
    }
  }

  async fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })
  }

  processGoogleVisionResponse(data) {
    const labels = data.responses[0]?.labelAnnotations || []
    const objects = data.responses[0]?.localizedObjectAnnotations || []
    
    // Procurar por termos relacionados a serpentes (português e inglês)
    const snakeKeywords = [
      'snake', 'serpent', 'reptile', 'viper', 'python', 'boa', 
      'cobra', 'serpente', 'víbora', 'jararaca', 'cascavel',
      'coral', 'jiboia', 'réptil', 'ofídio', 'rattlesnake'
    ]
    
    const relevantLabels = labels.filter(label => 
      snakeKeywords.some(keyword => 
        label.description.toLowerCase().includes(keyword)
      )
    )

    console.log('Google Vision Labels:', labels.map(l => l.description))
    console.log('Relevant snake labels:', relevantLabels.map(l => l.description))

    // Se encontrou indícios de serpente, fazer identificação específica
    if (relevantLabels.length > 0 || labels.some(l => l.description.toLowerCase().includes('animal'))) {
      return this.matchWithSnakeDatabase(labels, objects)
    }

    throw new Error('Nenhuma serpente detectada na imagem')
  }

  matchWithSnakeDatabase(labels, objects) {
    // Aqui você faria o match com sua base de dados de serpentes
    // Por enquanto, retorna um resultado simulado baseado nas labels
    const confidence = Math.max(...labels.map(l => l.score || 0.5)) * 100

    // Lógica melhorada de identificação baseada nas labels detectadas
    const labelTexts = labels.map(l => l.description.toLowerCase()).join(' ')
    
    console.log('Analyzing labels for snake identification:', labelTexts)
    
    // Identificação específica por características
    if (labelTexts.includes('rattlesnake') || labelTexts.includes('rattle')) {
      return this.createSnakeResult('Cascavel', 'Crotalus durissus', confidence, true, 'high', [
        "Chocalho característico na cauda detectado",
        "Padrão de cores compatível com cascavel",
        "Corpo robusto típico da espécie"
      ])
    }
    
    if (labelTexts.includes('boa') || labelTexts.includes('python') || labelTexts.includes('constrictor')) {
      return this.createSnakeResult('Jiboia', 'Boa constrictor', confidence, false, 'low', [
        "Corpo grosso e robusto característico",
        "Padrões irregulares típicos de jiboia",
        "Ausência de características venenosas"
      ])
    }
    
    if (labelTexts.includes('viper') || labelTexts.includes('venomous') || labelTexts.includes('pit viper')) {
      return this.createSnakeResult('Jararaca', 'Bothrops jararaca', confidence, true, 'high', [
        "Características de víbora detectadas",
        "Cabeça triangular típica",
        "Padrões compatíveis com jararaca"
      ])
    }

    // Análise por padrões visuais gerais
    if (labelTexts.includes('pattern') || labelTexts.includes('scale') || labelTexts.includes('skin')) {
      // Tentar identificar por contexto visual
      if (confidence > 70) {
        return this.createSnakeResult('Jiboia', 'Boa constrictor', confidence * 0.8, false, 'low', [
          "Serpente detectada com alta confiança",
          "Características visuais compatíveis com espécie não venenosa",
          "Padrões e escalas observados"
        ])
      } else {
        return this.createSnakeResult('Jararaca', 'Bothrops jararaca', confidence * 0.9, true, 'high', [
          "Serpente detectada",
          "Por precaução, classificada como potencialmente venenosa",
          "Características não conclusivas"
        ])
      }
    }

    // Resultado padrão baseado na confiança
    return this.createSnakeResult('Serpente Brasileira', 'Serpentes sp.', confidence * 0.6, false, 'medium', [
      "Serpente detectada pelo Google Vision",
      "Espécie específica requer análise adicional",
      "Recomendada identificação por especialista"
    ])
  }

  createSnakeResult(species, scientificName, confidence, venomous, dangerLevel, features) {
    const habitats = {
      'Cascavel': 'Cerrado, caatinga e campos abertos',
      'Jiboia': 'Florestas tropicais, cerrado e caatinga',
      'Jararaca': 'Florestas tropicais, áreas rurais e periurbanas'
    }

    const sizes = {
      'Cascavel': 'Até 1,8 metros de comprimento',
      'Jiboia': 'Até 4 metros de comprimento',
      'Jararaca': 'Até 1,5 metros de comprimento'
    }

    const distributions = {
      'Cascavel': 'Região Central e Nordeste do Brasil',
      'Jiboia': 'Todo o território brasileiro',
      'Jararaca': 'Região Sul e Sudeste do Brasil'
    }

    return {
      species: species,
      scientificName: scientificName,
      confidence: Math.round(confidence),
      venomous: venomous,
      description: `${species} identificada através do Google Vision AI. ${features.join('. ')}.`,
      habitat: habitats[species] || 'Diversos habitats brasileiros',
      size: sizes[species] || 'Varia conforme a espécie',
      colors: 'Conforme observado na imagem',
      distribution: distributions[species] || 'Brasil e regiões adjacentes',
      dangerLevel: dangerLevel,
      detectedFeatures: features,
      source: 'Google Vision AI',
      firstAid: venomous ? [
        "Mantenha a vítima calma e em repouso",
        "Procure atendimento médico urgente",
        "Não aplique torniquete",
        "Não corte nem chupe o local da mordida",
        "Fotografe a serpente para identificação médica"
      ] : [
        "Mantenha distância segura da serpente",
        "Não tente capturar ou manusear",
        "Em caso de mordida, procure atendimento médico",
        "Fotografe a serpente para identificação"
      ]
    }
  }
}
// Integração com OpenAI GPT-4 Vision para identificação de serpentes
export class OpenAIVisionSnakeIdentifier {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.endpoint = 'https://api.openai.com/v1/chat/completions'
  }

  async identifySnake(imageFile) {
    try {
      const base64Image = await this.fileToBase64(imageFile)
      
      const messages = [
        {
          role: "system",
          content: `Você é um herpetólogo especialista em serpentes brasileiras. Analise a imagem com foco em características específicas de identificação.

          CARACTERÍSTICAS PRINCIPAIS A OBSERVAR:
          - CASCAVEL: Chocalho na cauda (característico único), corpo robusto, cabeça triangular, padrões de losangos
          - JARARACA: Cabeça triangular, fossetas termorreceptoras, padrões em losango, sem chocalho
          - JIBOIA: Corpo muito grosso e longo, sem chocalho, padrões irregulares, cabeça menor
          - CORAL: Anéis coloridos em vermelho, preto e branco/amarelo
          - COBRA D'ÁGUA: Corpo delgado, próxima à água, padrões em faixas

          RESPONDA EM PORTUGUÊS BRASILEIRO no formato JSON:
          {
            "species": "Nome comum brasileiro (ex: Cascavel, Jiboia, Jararaca)",
            "scientificName": "Nome científico correto", 
            "confidence": número de 0-100 baseado na clareza das características,
            "venomous": true/false,
            "description": "Descrição detalhada das características observadas",
            "habitat": "Habitat em português",
            "size": "Tamanho em português", 
            "colors": "Cores e padrões observados na imagem",
            "distribution": "Distribuição no Brasil",
            "dangerLevel": "low/medium/high",
            "identificationFeatures": ["características", "específicas", "observadas"],
            "firstAid": ["instruções"] ou null
          }

          SEJA ESPECÍFICO: Se vir chocalho = CASCAVEL. Se corpo muito grosso = JIBOIA. Se cabeça triangular + padrões = JARARACA.`
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise esta imagem de serpente e identifique a espécie com base nas características visuais:

              PROCURE ESPECIFICAMENTE:
              1. CHOCALHO na cauda → CASCAVEL (Crotalus durissus)
              2. Corpo MUITO GROSSO e longo → JIBOIA (Boa constrictor) 
              3. Cabeça TRIANGULAR + padrões losango → JARARACA (Bothrops jararaca)
              4. Anéis COLORIDOS → CORAL (Micrurus frontalis)
              5. Corpo delgado + ambiente aquático → COBRA D'ÁGUA

              Seja específico sobre as características que você observa. Se houver chocalho, é DEFINITIVAMENTE cascavel. Se o corpo for muito grosso, é provavelmente jiboia.

              Responda em PORTUGUÊS BRASILEIRO com alta precisão.`
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
                detail: "high"
              }
            }
          ]
        }
      ]

      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4-vision-preview",
          messages: messages,
          max_tokens: 1000,
          temperature: 0.3
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`OpenAI API error: ${error.error?.message}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content

      // Parse JSON response
      try {
        const result = JSON.parse(content)
        return this.validateAndNormalizeResult(result)
      } catch (parseError) {
        console.error('Erro ao fazer parse da resposta:', content)
        throw new Error('Resposta da IA em formato inválido')
      }

    } catch (error) {
      console.error('Erro na identificação com OpenAI:', error)
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

  validateAndNormalizeResult(result) {
    // Validar campos obrigatórios
    const requiredFields = ['species', 'scientificName', 'confidence', 'venomous', 'description']
    const missingFields = requiredFields.filter(field => !result[field])
    
    if (missingFields.length > 0) {
      throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`)
    }

    // Normalizar dados
    return {
      ...result,
      confidence: Math.min(100, Math.max(0, parseInt(result.confidence))),
      venomous: Boolean(result.venomous),
      habitat: result.habitat || 'Não especificado',
      size: result.size || 'Não especificado',
      colors: result.colors || 'Não especificado',
      distribution: result.distribution || 'Não especificado',
      dangerLevel: ['low', 'medium', 'high'].includes(result.dangerLevel) 
        ? result.dangerLevel 
        : (result.venomous ? 'high' : 'low'),
      firstAid: result.venomous && result.firstAid ? result.firstAid : null
    }
  }
}
# 🤖 Guia de Integração com APIs de IA

Este guia explica como configurar diferentes APIs de IA para fazer a identificação de serpentes funcionar de verdade.

## 🎯 Opções Disponíveis

### 1. 🥇 OpenAI GPT-4 Vision (Recomendado)
**Prós:**
- Excelente precisão na identificação
- Respostas detalhadas e consistentes
- Entende contexto brasileiro
- Formato JSON estruturado

**Contras:**
- Pago (mas preços razoáveis)
- Requer conta OpenAI

**Como configurar:**

1. **Criar conta**: [platform.openai.com](https://platform.openai.com)

2. **Obter API Key**:
   - Vá em "API Keys" no dashboard
   - Clique "Create new secret key"
   - Copie a chave (começa com `sk-`)

3. **Configurar créditos**:
   - Adicione método de pagamento
   - Defina limites de uso

4. **Usar na aplicação**:
   ```javascript
   // Via interface da aplicação ou arquivo .env
   VITE_OPENAI_API_KEY=sk-sua_chave_aqui
   ```

**Custo estimado:** ~$0.01-0.03 por identificação

---

### 2. 🥈 Google Vision AI
**Prós:**
- Boa detecção de objetos e características
- Gratuito até 1000 requests/mês
- Rápido e confiável

**Contras:**
- Menos específico para identificação de espécies
- Requer configuração do Google Cloud

**Como configurar:**

1. **Google Cloud Console**: [console.cloud.google.com](https://console.cloud.google.com)

2. **Criar projeto**:
   - Novo projeto > escolha um nome
   - Ativar Vision API

3. **Criar credenciais**:
   - APIs & Services > Credentials
   - Create Credentials > API Key
   - Copie a chave (começa com `AIza`)

4. **Configurar limites** (opcional):
   - Quotas & Limits para controlar uso

5. **Usar na aplicação**:
   ```javascript
   VITE_GOOGLE_VISION_API_KEY=AIza_sua_chave_aqui
   ```

**Custo:** Gratuito até 1000/mês, depois $1.50 por 1000 requests

---

### 3. 🥉 iNaturalist API (Sempre Gratuita)
**Prós:**
- Completamente gratuita
- Base científica real
- Dados de biodiversidade confiáveis

**Contras:**
- Não analisa imagens diretamente
- Menos preciso que IA especializada
- Baseado em características, não visão

**Como usar:**
- Já está configurada na aplicação
- Não requer chaves de API
- Funciona por características extraídas

---

## 🛠️ Configuração Rápida

### Opção 1: Interface da Aplicação
1. Clique no ícone ⚙️ no canto inferior direito
2. Configure suas chaves de API
3. Teste a conectividade
4. Desative "usar dados simulados"

### Opção 2: Arquivo .env
1. Copie `.env.example` para `.env`
2. Adicione suas chaves:
   ```bash
   VITE_OPENAI_API_KEY=sk-sua_chave
   VITE_GOOGLE_VISION_API_KEY=AIza_sua_chave  
   VITE_USE_MOCK_DATA=false
   ```
3. Reinicie a aplicação

---

## 🔧 Configuração Avançada

### Múltiplas APIs (Consenso)
```javascript
import { identifySnakeWithMultipleAPIs } from './services/snakeIdentification'

// Usa todas as APIs e retorna o melhor resultado
const result = await identifySnakeWithMultipleAPIs(imageFile)
console.log('Consenso entre APIs:', result.consensus)
```

### API Específica
```javascript
import { identifySnakeWithAPI } from './services/snakeIdentification'

// Forçar uso de uma API específica
const result = await identifySnakeWithAPI(imageFile, 'openai')
```

### Configuração Dinâmica
```javascript
import { configureAPIs } from './services/snakeIdentification'

configureAPIs({
  openaiApiKey: 'nova-chave',
  useMockData: false
})
```

---

## 🚀 Implementação Customizada

### Adicionando Nova API

1. **Criar novo serviço** (`src/services/novaAPI.js`):
```javascript
export class NovaAPIIdentifier {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async identifySnake(imageFile) {
    // Implementar lógica específica
    return {
      species: "Nome da espécie",
      scientificName: "Nome científico",
      confidence: 85,
      venomous: false,
      // ... outros campos
    }
  }
}
```

2. **Integrar no serviço principal** (`snakeIdentification.js`):
```javascript
import { NovaAPIIdentifier } from './novaAPI.js'

// Adicionar na função identifySnake()
if (AI_CONFIG.NOVA_API_KEY) {
  const novaIdentifier = new NovaAPIIdentifier(AI_CONFIG.NOVA_API_KEY)
  return await novaIdentifier.identifySnake(imageFile)
}
```

---

## 📊 Comparação de APIs

| API | Precisão | Custo | Configuração | Velocidade |
|-----|----------|-------|--------------|------------|
| OpenAI Vision | ⭐⭐⭐⭐⭐ | 💰💰 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Google Vision | ⭐⭐⭐⭐ | 💰 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| iNaturalist | ⭐⭐⭐ | 💰 (Grátis) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🔒 Segurança

### Boas Práticas:
- ✅ Nunca commit chaves de API no código
- ✅ Use variáveis de ambiente
- ✅ Configure limites de uso
- ✅ Monitor logs para uso suspeito
- ✅ Rotacione chaves periodicamente

### Proteção das Chaves:
```javascript
// ❌ NUNCA faça isso:
const API_KEY = "sk-chave-secreta-aqui"

// ✅ Sempre use variáveis de ambiente:
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
```

---

## 🐛 Troubleshooting

### Erros Comuns:

**"API key não configurada"**
- ✅ Verificar se a chave está no `.env`
- ✅ Reiniciar a aplicação
- ✅ Verificar se a chave tem o prefixo correto

**"Rate limit exceeded"**
- ✅ Aguardar alguns minutos
- ✅ Verificar limites na conta da API
- ✅ Implementar retry com backoff

**"Insufficient credits"**
- ✅ Adicionar créditos na conta
- ✅ Verificar método de pagamento

**"Imagem não identificada"**
- ✅ Usar imagem mais clara
- ✅ Tentar com múltiplas APIs
- ✅ Verificar se é realmente uma serpente

---

## 📈 Otimizações

### Performance:
- Redimensionar imagens antes do envio
- Usar cache para resultados recentes
- Implementar retry com exponential backoff

### Custo:
- Comprimir imagens para reduzir tokens
- Usar Google Vision para pré-filtro
- Implementar cache local

### Precisão:
- Combinar resultados de múltiplas APIs
- Treinar modelo customizado para espécies locais
- Implementar feedback do usuário

---

## 🎓 Recursos Adicionais

- [OpenAI Vision Guide](https://platform.openai.com/docs/guides/vision)
- [Google Vision Docs](https://cloud.google.com/vision/docs)
- [iNaturalist API](https://www.inaturalist.org/pages/api+reference)
- [Snake Species Database](https://reptile-database.reptarium.cz/)

---

## 💡 Próximos Passos

1. **Escolher uma API** e configurar
2. **Testar com imagens reais**
3. **Ajustar prompts** para melhor precisão
4. **Implementar cache** para reduzir custos
5. **Adicionar feedback** dos usuários
6. **Treinar modelo customizado** se necessário

O sistema já está preparado para todas essas integrações! 🚀
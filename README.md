# Snake ID - Identificação de Serpentes com IA

Uma aplicação web moderna para identificação de serpentes através de fotos, utilizando inteligência artificial. Built with Vite + React + Tailwind CSS.

![Snake ID Demo](https://via.placeholder.com/800x400/22c55e/ffffff?text=Snake+ID+App)

## Funcionalidades

- **Upload de Imagens**: Interface drag-and-drop intuitiva para envio de fotos
- **Identificação com IA**: Análise automática das imagens para identificar espécies
- **Resultados Detalhados**: Informações completas sobre a serpente identificada
- **Alertas de Segurança**: Identificação de serpentes venenosas com instruções de primeiros socorros
- **Design Responsivo**: Interface otimizada para desktop e mobile
- **UI Moderna**: Design limpo e intuitivo com Tailwind CSS

## Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **File Upload**: React Dropzone
- **Build Tool**: Vite

## Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório** (ou use este diretório):
   ```bash
   cd snakeId
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**:
   - Abra seu navegador em `http://localhost:3000`

### Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera build de produção
npm run preview  # Preview do build de produção
npm run lint     # Executa linting do código
```

## Como Usar

1. **Faça Upload da Imagem**:
   - Arraste e solte uma foto de serpente na área indicada
   - Ou clique para selecionar um arquivo do seu dispositivo

2. **Aguarde a Análise**:
   - A IA processará a imagem automaticamente
   - O processo leva alguns segundos

3. **Visualize os Resultados**:
   - Veja a espécie identificada com nível de confiança
   - Confira informações detalhadas sobre habitat, tamanho e características
   - Para serpentes venenosas, consulte as instruções de primeiros socorros

## Configuração de IA (Futura)

Para integrar com serviços de IA reais, configure as variáveis de ambiente:

1. Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```

2. Configure suas chaves de API:
   ```env
   REACT_APP_AI_API_KEY=sua_chave_da_api
   REACT_APP_AI_API_URL=https://api.seu-servico-de-ia.com
   ```

## Estrutura do Projeto

```
snakeId/
├── public/                 # Arquivos públicos
├── src/
│   ├── components/         # Componentes React
│   │   ├── Header.jsx
│   │   ├── ImageUpload.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── IdentificationResult.jsx
│   ├── services/           # Serviços e APIs
│   │   └── snakeIdentification.js
│   ├── App.jsx            # Componente principal
│   ├── main.jsx           # Entry point
│   └── index.css          # Estilos globais
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Integração com IA

### **APIs Disponíveis**

1. **🥇 OpenAI GPT-4 Vision** (Recomendado)
   - Melhor precisão para identificação
   - Respostas detalhadas em português
   - ~$0.01-0.03 por identificação

2. **🥈 Google Vision AI**
   - Boa detecção de características visuais
   - Gratuito até 1000 requests/mês
   - Rápido e confiável

3. **🥉 iNaturalist API**
   - Completamente gratuita
   - Base científica real
   - Identificação por características

### **Como Ativar IA Real**

#### Opção 1: Interface da Aplicação
1. Clique no ícone de configurações no canto inferior direito
2. Configure suas chaves de API
3. Teste a conectividade
4. Desative "usar dados simulados"

#### Opção 2: Variáveis de Ambiente
1. Copie `.env.example` para `.env`
2. Configure suas chaves:
   ```env
   VITE_OPENAI_API_KEY=sk-sua_chave_openai
   VITE_GOOGLE_VISION_API_KEY=sua_chave_google
   VITE_USE_MOCK_DATA=false
   ```
3. Reinicie a aplicação: `npm run dev`

### 📋 **Guia Completo**
Veja o arquivo [SETUP_AI_APIS.md](SETUP_AI_APIS.md) para instruções detalhadas de como obter e configurar cada API.

### **Funcionalidades Avançadas**

```javascript
// Usar múltiplas APIs para consenso
import { identifySnakeWithMultipleAPIs } from './services/snakeIdentification'

// Forçar API específica  
import { identifySnakeWithAPI } from './services/snakeIdentification'

// Testar conectividade
import { testAPIConnectivity } from './services/snakeIdentification'
```

## Importante

> **Disclaimer**: Esta aplicação é para fins educacionais e de demonstração. A identificação atual é simulada. Para identificação real de serpentes, sempre consulte especialistas em herpetologia. Em caso de acidentes com serpentes, procure atendimento médico imediatamente.

## Primeiros Socorros

A aplicação fornece instruções básicas de primeiros socorros para casos de mordidas de serpentes venenosas:

1. Mantenha a vítima calma e em repouso
2. Procure atendimento médico imediatamente
3. Não aplique torniquete
4. Não corte nem chupe o local da mordida
5. Fotografe a serpente se possível (para identificação)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 📞 Contato

Para dúvidas ou sugestões sobre o projeto, abra uma issue no repositório.

---

**Snake ID** - Desenvolvido com carinho para educação e conscientização sobre serpentes brasileiras.
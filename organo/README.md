# 📚 Organo - Organizador de Leituras

![Thumbnail](./thumb.png)

> Um aplicativo moderno para gerenciar sua biblioteca pessoal de leituras com facilidade e elegância.

---

## 📖 Objetivo

O **Organo** é um aplicativo web desenvolvido em Angular que permite aos usuários cadastrar, organizar e gerenciar livros que estão lendo ou pretendem ler. A aplicação facilita o acompanhamento da leitura com informações detalhadas sobre cada livro, como título, autor, gênero, data de leitura e avaliação.

---

## ✨ Funcionalidades do Sistema

- 📝 **Cadastro de Livros**: Adicione novos livros inserindo informações completas (título, autor, imagem, gênero, data de leitura, classificação)
- 📋 **Listagem Organizada**: Visualize todos os livros cadastrados, automaticamente separados por gênero literário
- ⭐ **Sistema de Avaliação**: Avalie os livros com um sistema de estrelas
- 🎨 **Interface Responsiva**: Design moderno e amigável, otimizado para diferentes dispositivos
- 🏷️ **Categorização por Gênero**: Organize seus livros automaticamente por gênero literário
- 🖼️ **Gerenciamento de Imagens**: Adicione capas dos livros com URLs de imagens

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|---|---|---|
| **Angular** | 17.0.0 | Framework principal para construção da aplicação |
| **TypeScript** | 5.2.2 | Linguagem de tipagem utilizada no desenvolvimento |
| **RxJS** | 7.8.0 | Biblioteca reativa para programação assíncrona |
| **Angular Router** | 17.0.0 | Roteamento e navegação entre páginas |
| **Angular Forms** | 17.0.0 | Manipulação de formulários e validação |
| **Jest** | 29.7.0 | Framework de testes unitários |
| **Node.js** | 18+ | Ambiente de execução necessário |

---


## 💡 O Que Aprendemos

Este projeto foi desenvolvido como parte do curso **"Angular Moderno"** da Alura e demonstra os seguintes conceitos:

- ✅ **Componentes Angular**: Criação e reutilização de componentes standalone
- ✅ **Directives**: Uso de `*ngIf`, `*ngFor` para renderização condicional e de listas
- ✅ **Data Binding**: Binding bidirecional com `[(ngModel)]` e one-way binding
- ✅ **Services**: Criar e injetar serviços para compartilhar dados
- ✅ **Roteamento**: Configurar rotas e navegação entre páginas
- ✅ **Formulários Reativa**: Validação e manipulação de formulários
- ✅ **🧪 Testes Unitários com Jest** (Foco Principal): Testes com Jest e Angular Testing Utilities
- ✅ **Estilos CSS**: Componentes estilizados com CSS moderno
- ✅ **Angular 17**: Recursos e melhores práticas da versão 17

---

## 🚀 Como Instalar

### Pré-requisitos
- **Node.js** versão 18 ou superior
- **npm** (gerenciador de pacotes do Node)

### Passos de Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/marcionavarro/alura-angular-moderno.git
   cd organo
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm start
   ```
   ou
   ```bash
   ng serve
   ```

4. **Acesse a aplicação**
   - Abra o navegador e acesse: [http://localhost:4200](http://localhost:4200)

---

## 🔗 Recursos Adicionais

- 🎨 **Design Figma**: [Acesse o protótipo do projeto](https://www.figma.com/file/GYv8FnRc51ZDfGmi2zzaQb/Organo-%7C-Angular?type=design&node-id=134-128&mode=design)
- 📚 **Documentação Angular**: [angular.io](https://angular.io)
- 🧪 **Jest Testing**: [jestjs.io](https://jestjs.io)

---

## 🧪 Testes com Jest (Foco Principal do Curso)

Este projeto utiliza **Jest** como framework de testes, e é um dos principais focos do curso **Angular Moderno** da Alura.

### Executar Testes

```bash
npm test
```

### Estrutura de Testes

Os testes cobrem os principais componentes e serviços da aplicação:

```
src/
├── app/
│   ├── componentes/
│   │   ├── avaliacao-estrelas/
│   │   │   └── avaliacao-estrelas.componente.spec.ts
│   │   ├── cabecalho/
│   │   │   └── cabecalho.component.spec.ts
│   │   └── rodape/
│   │       └── rodape.component.spec.ts
│   ├── paginas/
│   │   └── formulario/
│   │       └── formulario.component.spec.ts
│   └── services/
│       └── livro.service.spec.ts
```

### Cobertura de Testes

Para verificar a cobertura de testes:

```bash
npm test -- --coverage
```

Isso gera um relatório em `coverage/lcov-report/index.html` mostrando:
- Linhas cobertas
- Funções cobertas
- Branches cobertos
- Statements cobertos

### Recursos de Testes

- 📚 **Setup Jest**: Veja `setup-jest.ts` para configurações de ambiente
- 📋 **Snapshots**: Testes de snapshot em `__snapshots__/` dirs
- 🔍 **Debugging**: Execute com `--detectOpenHandles` para debug

---

Este projeto é um projeto educacional da plataforma **Alura** e segue os princípios de compartilhamento de conhecimento.

---

## 👨‍💻 Autor

**Márcion Navarro**
-  [https://www.marcionavarro.com.br](https://www.marcionavarro.com.br)

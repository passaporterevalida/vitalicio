# RevalidaQuest

## Visão Geral

O RevalidaQuest é uma plataforma gamificada para estudo e preparação para exames, com funcionalidades de missões, conquistas, desafios, estatísticas e integração com pagamentos.

## Onboarding Rápido

### Instalação e Execução

```sh
# Clone o repositório
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

### Estrutura do Projeto

- `src/components/` — Componentes reutilizáveis da interface
- `src/hooks/` — Hooks customizados para lógica compartilhada
- `src/pages/` — Páginas principais da aplicação
- `src/data/` — Dados estáticos e mocks
- `src/utils/` — Funções utilitárias
- `src/styles/` — Estilos globais e utilitários
- `supabase/functions/` — Funções serverless (backend)
- `supabase/migrations/` — Migrações do banco de dados

### Rodando Testes

```sh
# (Se aplicável) Execute os testes automatizados
npm test
```

> **Nota:** Caso não existam testes, consulte a seção "Testes" abaixo para orientações de como começar.

## Tecnologias Utilizadas
- React + TypeScript
- Vite
- Tailwind CSS
- Supabase
- Stripe (pagamentos)

## Testes

O projeto ainda não possui testes automatizados. Recomenda-se utilizar [Jest](https://jestjs.io/) e [Testing Library](https://testing-library.com/) para componentes React. Exemplos de testes podem ser adicionados em `src/components/__tests__` e `src/utils/__tests__`.

## Padrão de Nomenclatura

- Componentes: PascalCase (ex: `UserProfileCard.tsx`)
- Hooks: camelCase iniciado por "use" (ex: `useAuth.ts`)
- Funções utilitárias: camelCase

## Comentários e Contribuição

Comente trechos críticos do código e siga o padrão de nomenclatura acima. Para contribuir, abra um PR seguindo as boas práticas do projeto.

---

# (Conteúdo Lovable original abaixo)

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e7e4855e-cd32-45e3-b342-10f9e45fb84d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e7e4855e-cd32-45e3-b342-10f9e45fb84d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e7e4855e-cd32-45e3-b342-10f9e45fb84d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

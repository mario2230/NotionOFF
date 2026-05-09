````markdown id="6bkr21"
# Notion Lite

Aplicativo de organização pessoal inspirado no Notion, desenvolvido com Ionic, Vue 3 e Capacitor.  
O projeto utiliza SQLite local para persistência de dados offline em múltiplas plataformas.

---

## Funcionalidades

- Autenticação de usuários
- Cadastro e login com senha criptografada
- Criação e gerenciamento de páginas
- Editor baseado em blocos
- Checklist interativa
- Persistência local com SQLite
- Funcionamento offline
- Navegação com Ionic Tabs
- Tema responsivo com suporte a modo escuro

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| Ionic Vue | Interface mobile |
| Vue 3 Composition API | Estrutura da aplicação |
| Capacitor | Integração multiplataforma |
| SQLite | Banco de dados local |
| TypeScript | Desenvolvimento tipado |
| Vue Router | Navegação |
| CSS Variables | Sistema de tema |

---

## Estrutura do Projeto

```txt
src/
├── components/
├── database/
│   ├── db.ts
│   ├── migrations.ts
│   └── services/
├── router/
├── theme/
├── views/
├── App.vue
└── main.ts
````

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/notion-lite.git
```

Acesse a pasta do projeto:

```bash
cd notion-lite
```

Instale as dependências:

```bash
npm install
```

---

## Executando o Projeto

Modo desenvolvimento:

```bash
ionic serve
```

Build web:

```bash
npm run build
```

---

## Executando no Android

Adicionar plataforma:

```bash
npx cap add android
```

Sincronizar arquivos:

```bash
npx cap sync
```

Abrir no Android Studio:

```bash
npx cap open android
```

---

## Executando no iOS

Adicionar plataforma:

```bash
npx cap add ios
```

Sincronizar arquivos:

```bash
npx cap sync
```

Abrir no Xcode:

```bash
npx cap open ios
```

---

## Banco de Dados

O projeto utiliza:

* `@capacitor-community/sqlite`
* `jeep-sqlite`
* `sql.js`

O banco é inicializado automaticamente durante o bootstrap da aplicação.

Tabelas principais:

* usuarios
* paginas
* blocos

---

## Tema

As variáveis globais estão localizadas em:

```txt
src/theme/variables.css
```

Cor principal utilizada:

```css
--ion-color-new: #6366F1;
```

---

## Arquitetura

O projeto segue separação por camadas:

* Views
* Services
* Database
* Components
* Router

A conexão SQLite utiliza um serviço centralizado (`DatabaseService`) para gerenciamento único da conexão.

---

## Status

Projeto em desenvolvimento.

```
```

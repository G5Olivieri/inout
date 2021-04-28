# Passo #1

# ANTES DE TUDO

# Sincronizando repositório

```bash
$ git checkout master
```

```bash
$ git pull
```

Adiciona ou remove branches do repositório local
```bash
$ git fetch --prune
```

# Criando branch para trabalhar

Adicionando nova funcionalidades

```bash
$ git checkout -b "feat/"
```

Corrigindo bugs

```bash
$ git checkout -b "fix/"
```

Adicionando documentação

```bash
$ git checkout -b "docs/"
```

```bash
$ git checkout -b "feat/adicionar-tela-de-criacao-de-produto"
or
$ git checkout -b "feat/add-create-product-screen"
```

# Criação do projeto frontend

Vamos fazer um projeto React
seguindo esse [tutorial](https://pt-br.reactjs.org/docs/create-a-new-react-app.html#create-react-app)

```bash
$ npx create-react-app frontend --template typescript
```

Depois removemos os arquivos que não iríamos usar, dexando somente 
App.tsx e index.tsx

# Atualizando sua branch com a master

# Sistema de entrada e saída de mercadorias

## Descrição

Um sistema WEB para ter mais controle sobre a entrada em saída de mercadorias
de uma loja, inicialmente comércio.
Objetivo inicial é ser um papel de anotações servindo com um guia com
menos falhas que processo manual.

## Reultado esperado

A nossa primeira entrega funcional é entrada e saída de produtos.
Precisa anotar a pessoa que inseriu e removeu um produto, junto com a data.

- Login
- Admin do sistema
- Cadastro de pessoas
- Entrada de mercadoria
- Retirada de mercadoria

## Login

- Login
    - admin pré cadastrado
    - usuário criado pelo admin
    - Primeiro acesso
        - Tela de alterar senha

## Painel de admin

- Adicionar novo usuário
- Remover usuário
- Lista de usuários

## Produto

- Adicionar novo produto
- Remover produto
- Editar produto
- Listar produtos

### **Alerta**

```
Halls é um representação do produto, não define se existe ou não no inventário
1 pacote de bala Halls equivale a uma mercadoria no inventário do produto Halls
```

### Um produto tem:

- Um número identificador
- Um nome

## Entrada de mercadoria

- Entrada de mercadoria (Linkar a um produto)
- Saída de mercadoria
- Quantidade (inicialmente em unidade apenas)
- Lista de todas as mercadorias

## Ideias

### **Permitir diferentes unidade de quantidade de produto**

Exemplo:

```
5 bolas de halls = 15 halls
Entrou 1 caixa de bala halls = mercadoria
Sendo cada caixa 12 unidades a
unidade = 1 quantidade de mercadoria
caixa = 12 unidades
lote = 20 caixas
```

### **Ter um sistema de permissionamento multinível e multifuncionalidade**

Exemplo:

```
Vendedor só pode dar retirada de mercadoria
Um funcionário só pode adicionar produto mas não tem acesso as mercadorias
Um funcionário pode adicionar, remover e editor produto e mercadoria
Um funcionário pode ver tudo e editar nada
```

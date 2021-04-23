# Cenários

## Obs.:
- *===>* representa a aplicação da ação

## Comprar mercadorias
### Ação
Vinicius comprou 20 unidades de Zomo de Morango no dia 02/10 no valor de 30 reais. Subtrai o valor no caixa, cria um evento de transação de saída. 

- caixa: -10 ===> -40
- caixa: +00 ===> -30
- caixa: +20 ===> -10
- caixa: +30 ===> +00
- caixa: +50 ===> +20

## Entrega da mercadoria

### Ação
Vinicius vai fazer uma entrega na Praia Grande. Colocou 40 reais de gasolina e pagou 30 reais de pedágio

Atual ===> Gasolina ===> Pedágio
- caixa: +100 ===> +60 ===> +30

## Embalagem de embrulho

### Ação
Vinicius compra embalagens de 10 reais para embrulhar os seus produtos

- caixa: +100 ===> +90

## Venda de mercadorias

### Ação
Vinicius vendeu 2 unidades de Zomo de Morango no dia 03/10 no valor de 30 reais. Adiciona 30 no caixa, cria um evento de transação de entrada. 

- caixa: +00 ===> +30
- caixa: +10 ===> +40
- caixa: -10 ===> +20
- caixa: -30 ===> +00
- caixa: -40 ===> -10

## Devolução de dinheiro
Vinicius vendeu 2 unidades da Zomo de Morango no dia 03/10 por 20 reais, uma estava com defeito, então ele fez a transação de 10 reais para o cliente. Cria um evento de reembolso de venda.

Atual ===> Venda ===> Reembolso
- caixa: +30 ===> +50 ===> +40

## Doação para o caixa
Vinicius doa 30 reais para o caixa

- caixa: -30 ===> +00
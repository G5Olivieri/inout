# Cenários

## Obs.:
- *===>* representa a aplicação da ação


# Cenários

## Registra um novo produto
Vinicius vai registrar uma essência Zomo de morando no sistema. Ele digita o nome
Zomo de Morango no produto e adiciona as etiquetas "essência" e "zomo" ao produto.
O sistema irá criar o produto com o nome Zomo de Morango e com as etiquetas
"essência" e "zomo".

## Registra produto com nome já existente
O sistema contém o produto Zomo de Morango. Vinicius vai registrar uma essência
Zomo de Morango no sistema. Ele digita o nome Zomo de Morango no produto e
adiciona as etiquetas "essência" e "zomo" ao produto. O sistema irá informar
que o produto Zomo de Morango já existe e não irá fazer nenhuma alteração.

## Alterar o nome do produto
O sistema contém o produto Zomo de Morangi. Vinicius nota que digitou errado o
nome do produto, Vinicius altera o nome do produto para Zomo de Morango.
Sistema altera o nome de Zomo de morango

## Alterar o nome do produto para um nome que já existe
O sistema contém o produto Zomo de Morangi. Vinicius nota que digitou errado o
nome do produto, Vinicius altera o nome do produto para Zomo de Morango.
Sistema notifica que nome já existe e não faz nada

## Alterar o nome do produto que tinha mercadorias
O sistema contém o produto Zomo de Morangi. Vinicius nota que digitou errado o
nome do produto, Vinicius altera o nome do produto para Zomo de Morango.
Sistema altera o nome de Zomo de morango e agora as mercadorias estão com novo nome.

## Adiciona etiqueta num produto
Vinicius quer adicionar a etiqueta "fria" à essência Zomo de Morango, então ele
adiciona a etiqueta no produto. O sistema adiciona a nova etiqueta ao produto.

## Adiciona etiqueta já existente num produto
Vinicius quer adicionar a etiqueta "fria" à essência Zomo de Morango que já tem
a etiqueta "fria", então ele adiciona a etiqueta no produto. O sistema não faz
qualquer alteração no estado.

## Remove etiqueta num produto
Vinicius quer remover a etiqueta "fria" à essência Zomo de Morango que já tem a
etiqueta "fria", então ele remove a etiqueta no produto. O sistema remove a
etiqueta do produto Zomo de Morango.

## Comprou mercadorias de um produto que não existe
Vinicius comprou 2 caixas de essência Zomo de Morango, contendo 10 essências em
cada caixa, no dia 12/03. Ele vai adicionar essas mercadorias no sistema, mas o
produto ainda não existe, o sistema notifica que o produto Zomo de Morango será
criado. Coloca a quantidade de unidades que comprou. O sistema cria o produto sem
etiquetas, adiciona 20 unidades de Zomo de Morango no armazém e registra que 20
unidades do produto Zomo de Morango foram adicionadas pelo Vinicius no dia 12/03.
Agora o estoque contém 20 unidades do produto Zomo de Morango.

## Comprou mercadorias de um produto que existe, mas sem nenhuma unidade no armazém
Vinicius comprou 2 caixas de essência Zomo de Uva, contendo 10 essências em cada
caixa, no dia 12/03. Ele vai adicionar essas mercadorias no sistema, coloca a
quantidade de unidades que comprou. O sistema adiciona 20 unidades de Zomo de Uva
ao armazém e registra que 20 unidades do produto Zomo de Uva foram adicionadas
pelo Vinicius no dia 12/03. Agora o armazém contém 20 unidades do produto Zomo de Uva.

## Comprou mercadorias de um produto que existe, que já tinha unidades no armazém
O armazém tem 12 unidades de Zomo Uva. Vinicius comprou 2 caixas de essência Zomo
de Uva, contendo 10 essências em cada caixa, no dia 12/03. Ele vai adicionar
essas mercadorias no sistema, coloca a quantidade de unidades que comprou. O
sistema adiciona 20 unidades de Zomo de Uva ao estoque e registra que 20 unidades
do produto Zomo de Uva foram adicionadas pelo Vinicius no dia 12/03 no valor de
30 reais. Agora o estoque contém 32 unidades do produto Zomo de Uva.

## Vendeu mercadorias contida no estoque
O sistema tem 20 unidades de Zomo de Uva no estoque. Vinicius vendeu 2 unidades
de Zomo de Uva, vai registrar a saída no sistema, informa o sistema que 2 unidades
de Zomo de Uva saíram do estoque no dia 15/04 no valor de 30 reais. O sistema
então subtraí 2 unidades do produto Zomo de Uva e registra o evento de saída de
mercadorias do produto Zomo de Uva no dia 15/04 no valor de 30 reais.

## Vendeu mercadorias sem estoque
O sistema tem 0 unidades de Zomo de Uva no estoque. Vinicius vendeu 2 unidades de Zomo de Uva, vai registrar a saída no sistema, informa o sistema que 2 unidades de Zomo de Uva saíram do estoque no dia 15/04 no valor de 30 reais, o sistema lhe informa que o estoque de Zomo de Uva está vazio e se deseja prosseguir, Vinicius confirma. O sistema então subtraí 2 unidades do produto Zomo de Uva, registra o evento de saída de mercadorias do produto Zomo de Uva no dia 15/04 no valor de 30 reais.

## Vendeu mercadorias de um produto que não existe
O sistema não tem Zomo de Uva. Vinicius vendeu 2 unidades de Zomo de Uva, vai registrar a saída no sistema, informa o sistema que 2 unidades de Zomo de Uva saíram do estoque no dia 15/04 no valor de 30 reais, o sistema lhe informa que o produto irá ser criado, Vinicius confirma. O sistema cria o produto Zomo de Uva com 0 mercadorias e registra o evento de saída de mercadorias do produto Zomo de Uva no dia 15/04 no valor de 30 reais.

## A mercadoria veio danificado do fornecedor e não há devolução. 
Vinicius então informa o sistema que as mercadorias foram perdidas no dia 14/01 (pelo menos reportadas nesse dia). Sistema registra que as mercadorias foram perdidas no dia 14/01 e subtraí a unidade da mercadoria do estoque.

## Motoboy não entregou a mercadoria e fornecedor não irá mandar outra.
Vinicius então informa o sistema que as mercadorias foram perdidas no dia 14/01 (pelo menos reportadas nesse dia) e o valor de 50 reais. O sistema notifica a criação do produto e registra que as mercadorias foram perdidas no dia 14/01 no valor reais.

## Reenvio de mercadorias compradas com defeito
Vinicius comprou uma caixa de Zomo vencida. Fala com o fornecedor e o fornecedor envia outra. Registra que as mercadorias foram perdidas e adiciona observação que mercadorias serão reenviadas. O sistema registra que as mercadorias foram perdidas no dia. 
Vinicius recebeu as novas mercadorias, então adiciona no sistema a nova entrada de mercadorias sem valor, com obs de que é reenvio da perda anterior. Sistema adiciona unidades no estoque e registra o evento de entrada no dia no valor 0 reais.
 
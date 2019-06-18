# Popup de Seleção
**Popup** (modal) com seleção e filtro de opções com **Vue2 + Vuex**.

____

### Instalar e Executar
Instalar dependências: comando `npm i` \
Executar projeto: comando `npm run dev` ou executar o script `start.sh`

____

### Manual de uso

#### Selecionar Estado de Conservação
O botão **Selecionar**, abre o popup para seleção do **estado de conservação**.
Para selecionar um estado no popup, clicar sobre o mesmo.

#### Salvar Estado de Conservação
Após selecionar o estado, clicar em **Salvar**.
Ao salvar um estado, aparecerá as **informações** do mesmo, abaixo do botão Selecionar.

#### Remover Estado selecionado
Para remover o estado selecionado, existem duas formas: clicar no **x** que aparece ao lado da sua informação, ou abrir o popup e **de-selecionar** o estado selecionado.

#### Filtrar Estados de Conservação
O **Campo de busca** fica acima da lista de estados.
É possível filtrar os estados por número, código, ou descrição. Não precisa ser a palavra inteira, a busca é automática, basta começar a digitar.

#### Fechar popup de seleção
É possível fechar o popup pelo **X** no canto superior direito, ou clicando em **Cancelar**.
Quando fechado assim, o estado selecionado não é salvo/alterado.
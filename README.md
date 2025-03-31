# BitcoinApp

Aplicativo desenvolvido em React Native com integração com API e exibição dos dados em formato gráfico interativo e lista detalhada.

## Descrição

O BitcoinApp é uma ferramenta para visualizar cotações históricas do Bitcoin. Ele permite que os usuários acompanhem o preço atual, visualizem gráficos históricos e filtrem os dados por intervalos de tempo. O aplicativo é construído com React Native e utiliza o Expo para facilitar o desenvolvimento e a execução em diferentes plataformas (Android /iOS).

---

## Funcionalidades

- **Exibição do preço atual do Bitcoin**: Mostra o valor mais recente do Bitcoin.
- **Gráfico histórico de preços**: Apresenta um gráfico interativo com os dados históricos.
- **Lista de cotações históricas**: Exibe uma lista detalhada com os preços do Bitcoin em diferentes datas.
- **Filtros de intervalo de tempo**: Permite filtrar os dados por intervalos como 7 dias, 15 dias, 30 dias e 90 dias.
- **Atualização dinâmica**: Atualiza os dados automaticamente com base no intervalo selecionado.

---

## Estrutura do Código

### Função App

A função principal do aplicativo gerencia o estado e renderiza os componentes principais.

### Fluxo do Aplicativo

- O aplicativo inicia carregando os dados históricos do Bitcoin a partir da API da CoinDesk.
- Os dados são processados e armazenados no estado do aplicativo.
- O preço atual é exibido no componente CurrentPrice.
- O gráfico histórico é renderizado no componente HistoryGraphic.
- A lista de cotações é exibida no componente QuotationsList, com a possibilidade de filtrar os dados.

### Principais Componentes

- **CurrentPrice**:
Exibe o preço atual do Bitcoin.
Recebe o valor mais recente como prop (lastQuotation).

- **HistoryGraphic**:
Renderiza um gráfico com os dados históricos de preços.
Recebe os dados do gráfico como prop (infoDataGraphic).

- **QuotationsList**:
Exibe uma lista de cotações históricas.
Permite filtrar os dados por intervalos de tempo.
Recebe as transações como prop (listTransactions) e uma função para atualizar o intervalo (filterDay).

### Principais Funções

1. **addZero(number)**:
Adiciona um zero à esquerda para números menores que 10.
Usada para formatar datas.

2. **url(days)**:
Gera a URL para buscar os dados históricos de preços do Bitcoin.
Baseada no número de dias fornecido.

3. **getListCoins(url)**:
Faz uma requisição à API para buscar os dados históricos de preços.
Retorna uma lista formatada com as datas e valores.

4. **getPriceCoinsGraphic(url)**:
Faz uma requisição à API para buscar os dados históricos de preços.
Retorna apenas os valores dos preços para uso no gráfico.

---

## Estilos

O estilo do aplicativo é definido no objeto styles.

---

## Dependências

As seguintes dependências devem ser instaladas no projeto:

"dependencies": {
  "react": "18.2.0",
  "react-native": "0.74.5",
  "react-native-svg": "^15.8.0",
  "expo": "^48.0.0"
}

---

## Como Executar

### Instalar Dependências

npm install

### Iniciar o Projeto

npm start

---

## API Utilizada

### CoinDesk API

URL: [https://api.coindesk.com/v1/bpi/historical/close.json]

### Parâmetros

- start: Data de início no formato YYYY-MM-DD.
- end: Data de término no formato YYYY-MM-DD.

Exemplo de URL Gerada:
[https://api.coindesk.com/v1/bpi/historical/close.json?start=2024-09-01&end=2024-09-30]

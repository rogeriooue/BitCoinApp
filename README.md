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
- **Filtros de intervalo de tempo**: Altera localmente o período exibido sem fazer uma nova consulta à API.

---

## Estrutura do Código

### Função App

A função principal do aplicativo gerencia o estado e renderiza os componentes principais.

### Fluxo do Aplicativo

- O aplicativo inicia carregando 180 dias de dados históricos do Bitcoin a partir da API da CoinGecko.
- A resposta da API é convertida a partir dos timestamps Unix para datas no formato DD/MM/AAAA.
- Os filtros de 7, 15, 30, 90 e 180 dias são aplicados localmente sobre os dados já carregados.
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

1. **url(days)**:
Gera a URL para buscar os dados históricos de preços do Bitcoin.
Baseada no número de dias fornecido.

2. **formatDate(timestamp)**:
Converte um timestamp Unix em milissegundos para uma data no formato brasileiro DD/MM/AAAA.

3. **getMarketChart(apiUrl)**:
Faz uma única requisição aos dados de mercado, extrai o campo `prices` e separa os dados para o gráfico e para a lista de cotações.

---

## Estilos

O estilo do aplicativo é definido no objeto styles.

---

## Dependências

As versões das dependências devem ser verificadas no arquivo package.json.

---

## Como Executar

### Instalar Dependências

npm install

### Iniciar o Projeto

npm start

---

## API Utilizada

### CoinGecko Market Chart API

URL base:
[https://api.coingecko.com/api/v3/coins/bitcoin/market_chart]

### Parâmetros

- `vs_currency=usd`: Define o dólar americano como moeda de conversão.
- `days=180`: Solicita inicialmente 180 dias de histórico.
- `interval=daily`: Solicita dados com intervalo diário.

Exemplo de URL:
[https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily]

### Formato da resposta

A API retorna, entre outros campos, o campo `prices`. Cada item possui o timestamp Unix em milissegundos e o preço:

```json
{
  "prices": [
    [1787443200000, 77081.0229900092],
    [1787529600000, 77712.3200924702]
  ],
  "market_caps": [],
  "total_volumes": []
}
```

O aplicativo utiliza somente `prices`. O primeiro valor de cada item é convertido para data com `new Date(timestamp)` e formatado com `toLocaleDateString('pt-BR')`. O segundo valor é usado como preço no gráfico e na lista. Os campos `market_caps` e `total_volumes` são ignorados.

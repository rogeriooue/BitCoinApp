import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, StatusBar, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationsList from './src/components/QuotationsList';


function url(days) {
  return `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}&interval=daily`;
}

function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('pt-BR');
}

async function getMarketChart(apiUrl) {
  try {
    console.log('[BitcoinApp] Iniciando busca:', apiUrl);
    const response = await fetch(apiUrl);
    console.log('[BitcoinApp] Resposta recebida:', response.status);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const marketChart = await response.json();
    if (!Array.isArray(marketChart?.prices)) {
      throw new Error('Resposta da API sem uma lista de precos valida');
    }

    const prices = marketChart.prices
      .filter((price) => (
        Array.isArray(price)
        && price.length >= 2
        && Number.isFinite(Number(price[0]))
        && Number.isFinite(Number(price[1]))
      ))
      .map(([timestamp, value]) => [Number(timestamp), Number(value)]);

    if (prices.length === 0) {
      throw new Error('A API nao retornou precos validos');
    }

    console.log('[BitcoinApp] Precos recebidos:', prices.length);

    return {
      graphic: prices.map(([, value]) => value),
      quotations: prices.map(([timestamp, value]) => ({
        data: formatDate(timestamp),
        valor: value,
      })).reverse(),
    };
  } catch (error) {
    console.error("Error getMarketChart: ", error);
    throw error;
  }
}


export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(180);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState(null);

  const updateDay = useCallback((number) => {
    console.log('[BitcoinApp] Filtro de dias atualizado:', number);
    setDays(number);
  }, []);

  useEffect(() => {
    let isMounted = true;

    console.log('[BitcoinApp] Carregando cotacoes iniciais');
    getMarketChart(url(180)).then(({ graphic, quotations }) => {
      if (!isMounted) {
        return;
      }

      const lastPrice = graphic[graphic.length - 1] ?? null;

      console.log('[BitcoinApp] Estados preparados:', {
        grafico: graphic.length,
        cotacoes: quotations.length,
        ultimoPreco: lastPrice,
      });
      setCoinsList(quotations);
      setCoinsGraphicList(graphic);
      setPrice(lastPrice);
      setError(null);
    }).catch((requestError) => {
      console.error('[BitcoinApp] Falha ao carregar cotacoes:', requestError);

      if (isMounted) {
        setError('Nao foi possivel carregar as cotacoes.');
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <StatusBar
          backgroundColor="#f50d41"
          barStyle="light-content"
        />
        <CurrentPrice lastQuotation={price} />
        <HistoryGraphic infoDataGraphic={coinsGraphicList.slice(-days)} />
        <QuotationsList filterDay={updateDay} listTransactions={coinsList.slice(0, days)} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  error: {
    color: '#f50d41',
  },
});

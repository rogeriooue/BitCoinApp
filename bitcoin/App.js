import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, StatusBar, SafeAreaView, Platform } from 'react-native';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationsList from './src/components/QuotationsList';


function addZero(number) {
  if (number <= 9) {
    return "0" + number;
  }
  return number;
}

function url(days) {
  const date = new Date();
  const listLastDays = days;
  const endDate = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
  date.setDate(date.getDate() - listLastDays);
  const startDate = `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;

  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
}

async function getListCoins(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let returnApi = await response.json();
    let selectListQuotations = returnApi.bpi;
    const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
      return {
        data: key.split("-").reverse().join("/"),
        valor: selectListQuotations[key]
      }
    });
    let data = queryCoinsList.reverse();
    return data;
  } catch (error) {
    console.error("Error getListCoins: ", error);
    throw error;
  }
}

async function getPriceCoinsGraphic(url) {
  try {
    const responseG = await fetch(url);
    if (!responseG.ok) {
      throw new Error(`HTTP error! status: ${responseG.status}`);
    }
    let returnApiG = await responseG.json();
    let selectListQuotationsG = returnApiG.bpi;
    const queryCoinsListG = Object.keys(selectListQuotationsG).map((key) => {
      return selectListQuotationsG[key]
    });
    let dataG = queryCoinsListG;
    return dataG;
  } catch (error) {
    console.error("Error getPriceCoinsGraphic: ", error);
    throw error;
  }
}


export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(180);
  const [updateData, setUpdateData] = useState(true);
  const [price, setPrice] = useState(null);

  const priceQuotation = useCallback(() => {
    setPrice(coinsGraphicList[coinsGraphicList.length - 1]);
  }, [coinsGraphicList]);

  const updateDay = useCallback((number) => {
    setDays(number);
    setUpdateData(true);
  }, []);

  useEffect(() => {
    getListCoins(url(180)).then((data) => {
      setCoinsList(data);
    });

    getPriceCoinsGraphic(url(180)).then((dataG) => {
      setCoinsGraphicList(dataG);
      setPrice(dataG[dataG.length - 1]);
    });

    setUpdateData(false);

  }, [updateData]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar
        backgroundColor="#f50d41"
        barStyle="light-content"
      />
      <CurrentPrice lastQuotation={price} />
      <HistoryGraphic infoDataGraphic={coinsGraphicList.slice(-days)} />
      <QuotationsList filterDay={updateDay} listTransactions={coinsList.slice(0, days)} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
});

import React, { Fragment, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "./styles";
import QuotationsItems from "./QuotationsItems";


export default function QuotationsList(props) {
    const daysQuery = props.filterDay;
    const renderQuotation = useCallback(({ item }) => (
        <QuotationsItems valor={item.valor} data={item.data} />
    ), []);

    const quotationKey = useCallback(
        (item) => `${item.data}-${item.valor}`,
        [],
    );

    return (
        <Fragment>
            <View style={styles.filters}>
                <TouchableOpacity
                    style={styles.buttonQuery}
                    onPress={() => daysQuery(7)}
                >
                    <Text style={styles.textButtonQuery}>7D</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonQuery}
                    onPress={() => daysQuery(15)}
                >
                    <Text style={styles.textButtonQuery}>15D</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonQuery}
                    onPress={() => daysQuery(30)}
                >
                    <Text style={styles.textButtonQuery}>1M</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonQuery}
                    onPress={() => daysQuery(90)}
                >
                    <Text style={styles.textButtonQuery}>3M</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonQuery}
                    onPress={() => daysQuery(180)}
                >
                    <Text style={styles.textButtonQuery}>6M</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={props.listTransactions}
                renderItem={renderQuotation}
                keyExtractor={quotationKey}
            />
        </Fragment>
    );
}
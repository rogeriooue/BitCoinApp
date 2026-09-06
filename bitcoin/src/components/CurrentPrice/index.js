import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";


export default function CurrentPrice(props) {
    return (
        <View style={styles.headerPrice}>
            <Text style={styles.CurrentPrice}>
                USD ${props.lastQuotation?.toFixed(0) ?? "-"}
            </Text>
            <Text style={styles.textPrice}>last quote</Text>
        </View>
    );
}
import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";


export default function HistoryGraphic() {
    return (
        <View style={styles.contentGraphic}>
            <Text style={styles.CurrentPrice}>$ 0.00</Text>
            <Text style={styles.textPrice}>last quote</Text>
        </View>
    );
}
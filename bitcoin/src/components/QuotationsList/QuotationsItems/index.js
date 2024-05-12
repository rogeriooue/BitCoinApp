import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";


export default function QuotationsItems() {
    return (
        <View style={styles.mainContent}>
            <View style={styles.contextLeft}>
                <View style={styles.boxLogo}>
                    <Image
                        style={styles.bitcoinIcon}
                        source={require("../../../img/bitcoin.png")}
                    />
                    <Text style={styles.dayCotation}>12/05/2024</Text>
                </View>
                <View style={styles.contextRight}>
                    <Text style={styles.price}>$ 65000.00</Text>
                </View>
            </View>
        </View>
    );
}


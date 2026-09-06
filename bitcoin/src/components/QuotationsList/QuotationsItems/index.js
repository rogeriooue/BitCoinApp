import React, { memo } from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";


function QuotationsItems(props) {
    return (
        <View style={styles.mainContent}>
            <View style={styles.contextLeft}>
                <View style={styles.boxLogo}>
                    <Image
                        style={styles.bitcoinIcon}
                        source={require("../../../img/bitcoin.png")}
                    />
                    <Text style={styles.dayCotation}>{props.data}</Text>
                </View>
            </View>
            <View style={styles.contextRight}>
                <Text style={styles.price}>{Number(props.valor).toFixed(2)}</Text>
            </View>
        </View>
    );
}

export default memo(QuotationsItems);


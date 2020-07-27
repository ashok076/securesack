import React from "react";
import { View, TouchableOpacity, Text } from "react-native"

import styles from "./button.style"

const Button = ({ title, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
            <Text style={styles.title}> {title} </Text>
        </View>
    </TouchableOpacity>
)

export default Button;
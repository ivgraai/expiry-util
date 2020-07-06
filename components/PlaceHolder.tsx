import React from "react";
import { View, Image, Text } from "react-native";
import { styles } from "../constants/styles/PlaceHolder";

export default React.memo(function StyledButton(props: any) {
    return <View style={styles.view}>
        <Image source={require('../assets/images/placeholder.png')} style={styles.image} />
        <Text style={styles.text}>{props.text}</Text>
    </View> ;
})

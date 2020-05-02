import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, ImageBackground } from 'react-native';

const MealItem = props => {
    let TouchableComp = TouchableOpacity;

    if(Platform.OS === 'android' && Platform.Version >=21){
        TouchableComp = TouchableNativeFeedback;
    }

    return (
        <View style={styles.mealItem}>
            <TouchableComp style={{flex: 1}} onPress={props.onSelectMeal}>
                <View>
                    <View style={{...styles.mealRow, ...styles.mealHeader}}>
                        <ImageBackground source={{uri: props.image}} style={styles.bgImage}>
                            <Text style={styles.title}>{props.title}</Text>
                        </ImageBackground>
                    </View>
                    <View style={{...styles.mealRow, ...styles.mealDetail}}>
                        <Text>{props.duration}m</Text>
                        <Text>{props.complexity.toUpperCase()}</Text>
                        <Text>{props.affordability.toUpperCase()}</Text>
                    </View>
                </View>
            </TouchableComp>
        </View>
    );
};

const styles = StyleSheet.create({
    mealItem:{
        flex: 1,
        height: 200,
        width: '100%',
        backgroundColor: '#ccc'
    },
    bgImage:{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: 5,
        paddingHorizontal: 12,
        textAlign: 'center'
    },
    mealRow: {
        flexDirection: 'row'
    },
    mealHeader: {
        height: '90%'
    },
    mealDetail: {
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    }
});

export default MealItem;
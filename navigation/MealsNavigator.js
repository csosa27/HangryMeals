import React from 'react';
import { Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FilterScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const defaulStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
    },
    headerTitleStyle:{
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? Colors.tabTint : Colors.primaryColor,
    headerTitle: 'A Screen'
};

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealDetail: MealDetailScreen
},{
    defaultNavigationOptions: defaulStackNavOptions
});

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
},{
    defaultNavigationOptions: defaulStackNavOptions
});

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-restaurant' 
                        size={25} 
                        color={tabInfo.tintColor} 
                    /> //retrieves tintColor from tabInfo so I don't have to maintain 2 colors separately
                ); 
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily:'open-sans-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarLabel : 'Favorites!',
            tabBarIcon: (tabInfo) => {
                return (
                    <Ionicons 
                        name='ios-star' 
                        size={25} 
                        color={tabInfo.tintColor} 
                    />
                );
            },
            tabBarColor: Colors.tabBarTint,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily:'open-sans-bold'}}>Favorites</Text> : 'Favorites'
        }
    }
};

const MealsFavTabNavigator = 
    Platform.OS === 'android' ? 
        createMaterialBottomTabNavigator(tabScreenConfig, {
            activeColor: Colors.tabTint,
            shifting: true,
            barStyle: {
                backgroundColor: Colors.primaryColor
            }
        }) :
        createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'open-sans-bold'
                },
                activeTintColor: Colors.tabTint
            }
        });

const FiltersNavigator = createStackNavigator({
    Filters: FilterScreen
}, {
    defaultNavigationOptions: defaulStackNavOptions
});

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    },
    Filters: FiltersNavigator,
},
{
    contentOptions: {
        activeTintColor: Colors.tabTint,
        labelStyle: {
            fontFamily: 'open-sans-bold',
        }
    }
});

export default createAppContainer(MainNavigator);


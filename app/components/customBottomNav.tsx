import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

type CustomBottomTabProps = {
    children:JSX.Element[],
}

enum IconType {
    MatetrialIcon,
    FontAweomseIcon,
    Ionicon,
  }
  
  
  type iconProp = {
     icon: {
       value: { type: IconType.MatetrialIcon, name: keyof typeof MaterialIcons.glyphMap } |
              { type: IconType.FontAweomseIcon, name: keyof typeof FontAwesome.glyphMap } |
              { type: IconType.Ionicon, name: keyof typeof Ionicons.glyphMap };
       size: number;
     }
     
  }
type CustomBottomTabElementProps = {
    raw_icon : iconProp
}

const CustomBottomTab:React.FC<CustomBottomTabProps> = ({children})=>{
    //#region dead, but useful?
    // const usable_icon = icon.icon;
    // return (
    //     <View>
    //         {usable_icon.value.type === IconType.FontAweomseIcon && (
    //     <FontAwesome name={usable_icon.value.name} size={usable_icon.size} />
    //   )}
    //   {usable_icon.value.type === IconType.MatetrialIcon && (
    //     <MaterialIcons name={usable_icon.value.name} size={usable_icon.size} />
    //   )}
    //   {usable_icon.value.type === IconType.Ionicon && (
    //     <Ionicons name={usable_icon.value.name} size={usable_icon.size} />
    //   )}
    //         {children}
    //     </View>
    // )
    //#endregion
    return (
        <View style={BottomNavStyle.container}>
            <View style={BottomNavStyle.itemContainer}>
            {children}
            </View>
        </View>
    )
}

const CustomBottomTabElement:React.FC<iconProp> = ({icon})=>{
    const usable_icon = icon;
    return (
    <View>
        {usable_icon.value.type === IconType.FontAweomseIcon && (
    <FontAwesome name={usable_icon.value.name} size={usable_icon.size} />
  )}
  {usable_icon.value.type === IconType.MatetrialIcon && (
    <MaterialIcons name={usable_icon.value.name} size={usable_icon.size} />
  )}
  {usable_icon.value.type === IconType.Ionicon && (
    <Ionicons name={usable_icon.value.name} size={usable_icon.size} />
  )}
    </View>
    )
}

const BottomNavStyle = StyleSheet.create({
    container:{
        bottom:0,
    },
    itemContainer:{
        paddingTop:"100%",
        flexDirection:"row",
        justifyContent:"space-evenly"
    }
})

export {CustomBottomTab, CustomBottomTabElement, IconType, iconProp}
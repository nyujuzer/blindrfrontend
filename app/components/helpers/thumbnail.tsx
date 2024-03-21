import React from "react";
import { ImageStyle, TouchableOpacity } from "react-native";
import Player from "../Player";

const Thumbnail = ({url, style}:Iplayerprops, )=>{
    return (
        <TouchableOpacity
        style={style}
        onPress={()=>{
            console.log(url);
            
        }}>
            <Player
                style={{maxWidth: 300,}}
                url={url}
            />
        </TouchableOpacity>
    )
}

export default Thumbnail;
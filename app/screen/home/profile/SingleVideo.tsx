import React from "react";
import Player from "../../../components/Player";

const SingleVideoPlayer = ({url})=>{
    return(
        <>
        <Player url={url}/>
        </>
    )
}
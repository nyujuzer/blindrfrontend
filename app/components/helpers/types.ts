import { View } from "react-native"

type Tthumbnail={
    title:string,
    video_url:string,
    pk:string,
    thumbnail_url?:string,
}
type Tmessage = {
    sender:string,
    message:string
}
type TmessageUser = {
    pfpurl:string
    profileName:string
    lastText:string
    id:any,
    ephemeral:boolean
}
type TUser = {
    username: string,
    gender: String,
    age:number
}

    
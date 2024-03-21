import { StackNavigationProp } from '@react-navigation/stack';
import { ImageStyle } from 'react-native';
export {}
declare global{
    type RootStackParamList={
        Register:{}|undefined,
        Home:{}|undefined,
        Profile:{uid:string} | undefined,
        Finish:{}|undefined,
        Vid:{}|undefined,
        chatScreen:{otherId:string, ephemeral:boolean}| undefined
    }

    interface Iplayerprops {
        shouldplay?: boolean;
        style?: ImageStyle;
        url: string;
      }
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
    type TMessageUser = {
        pfpurl:string
        profileName:string
        lastText:string
        id:any
        ephemeral:boolean
    }
    type TUser = {
        username: string,
        gender: String,
        age:number
    }
}



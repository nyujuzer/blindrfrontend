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
type Tuser = {
    pfpurl:string
    profileName:string
    lastText:string
    id:any,
    ephemeral:boolean
}
  type RootStackParamList={
    Register:{}|undefined,
    Home:{}|undefined,
    Profile:{uid:string} | undefined,
    Finish:{}|undefined,
    Vid:{}|undefined,
    chatScreen:{otherId:string, ephemeral:boolean}| undefined
}
    
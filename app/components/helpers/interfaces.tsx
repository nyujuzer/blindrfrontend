interface AppropriateDatePickerProps {
    style: any;
    visibility: boolean;
    onPress: () => void;
    onChange: (value: string) => void;
  }
  interface xhtmlrequestdetails{
    ip : string
    route:string
    _onReadyStateChange:Function
    _requestType:'GET'|'POST'
    _body:object
    _headers: Record<string, string>;
  }
  
interface navProps {
    navigation: any;
  }
interface imageUploadProps{
    handleSelection:(img:any)=>void
    uid:string
}
  export {AppropriateDatePickerProps, xhtmlrequestdetails, navProps, imageUploadProps}
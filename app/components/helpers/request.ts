import { xhtmlrequestdetails } from "./interfaces"

class xhtmlrequestBuilder{
  private builder:xhtmlrequest
  constructor(){
    this.builder = new xhtmlrequest()
  }
  to(_ip:string) {
    this.builder.ip = _ip
    return this
  }
    setHeaders(headers: Record<string, string>) {
    this.builder._headers = { ...this.builder._headers, ...headers };
    return this;
  }
    atRoute(_route:string){
    this.builder.route = _route
    return this
  }
    asType(_requestType:'GET'|'POST'){
    this.builder._requestType = _requestType
    return this
  }
  onCompletion(_onReadyStateChange:Function) {
    this.builder._onReadyStateChange = _onReadyStateChange
    return this
  }
  message(_body:object){
    this.builder._body = _body
    return this
  }send() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 400) {
          const response = xhr.responseText;
          // Process the response as needed
          // Call the provided completion function if available
          if (typeof this.builder._onReadyStateChange === 'function') {
            this.builder._onReadyStateChange(response);
          }
        } else {
          // Handle error case
          console.log('error')
          console.log(xhr)
        }
      }
    };
    xhr.open(this.builder._requestType, this.builder.ip + this.builder.route, true);
    Object.entries(this.builder._headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
    if (this.builder._requestType === 'POST'){
      xhr.send(JSON.stringify((this.builder._body)));
    } else {
      xhr.send();
    }
  }
}


class xhtmlrequest implements xhtmlrequestdetails{
  ip : string
  route:string
  _onReadyStateChange:Function
  _requestType:'GET'|'POST'
  _body:object
  _headers: Record<string, string>;

  constructor(){
    this._headers = {};
  }
}

export default xhtmlrequestBuilder
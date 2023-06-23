interface xhtmlrequestdetails{
  ip : string
  route:string
  _onReadyStateChange:Function
  _requestType:'GET'|'POST'
  _body:object
  _headers: Record<string, string>;
}

class xhtmlrequestBuilder implements xhtmlrequestdetails{
  ip : string
  route:string
  _onReadyStateChange:Function
  _requestType:'GET'|'POST'
  _body:object
  _headers: Record<string, string>;

  constructor(){
    this._headers = {};
    return
  }
  to(_ip:string) {
    this.ip = _ip
    return this
  }
  setHeaders(headers: Record<string, string>) {
    this._headers = { ...this._headers, ...headers };
    return this;
  }
  atRoute(_route:string){
    this.route = _route
    return this
  }
  asType(_requestType:'GET'|'POST'){
    this._requestType = _requestType
    return this
  }
  onCompletion(_onReadyStateChange:Function) {
    this._onReadyStateChange = _onReadyStateChange
    return this
  }
  message(_body:object){
    this._body = _body
    console.log(this._body)
    return this
  }send() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 400) {
          const response = xhr.responseText;
          // Process the response as needed
          console.log(response);
          // Call the provided completion function if available
          if (typeof this._onReadyStateChange === 'function') {
            this._onReadyStateChange(response);
          }
        } else {
          // Handle error case
          console.error('Request failed:', xhr.status, xhr.statusText);
        }
      }
    };
    xhr.open(this._requestType, this.ip + this.route, true);
    Object.entries(this._headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });
    if (this._requestType === 'POST'){
      console.log(this._body)
      xhr.send(JSON.stringify((this._body)));
    } else {
      xhr.send();
    }
  }
}

export default xhtmlrequestBuilder
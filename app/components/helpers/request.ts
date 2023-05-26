import { ip } from "./conf"

function xhtmlRequest(route:string, userId:string):string{

    const xhtml = new XMLHttpRequest()
    xhtml.onreadystatechange = function () {
      if (this.readyState == 4) {
        return this.response
      }
    }
    xhtml.open("GET", ip + route)
      xhtml.setRequestHeader("id", userId)
      xhtml.send()
      return null;
  }
  export {xhtmlRequest}
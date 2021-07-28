let APIURL = "";

switch (window.location.hostname) {
  case "localhost" || "127.0.0.1":
    APIURL = "http://localhost:8080";
    break;
    case "fortheloveofbrie.herokuapp.com":
      APIURL = "https://fortheloveofbrie-server.herokuapp.com";
      break
}

export default APIURL;
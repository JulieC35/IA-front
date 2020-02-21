
export class ServeurService {

  static instance: any;
  url: string;
  socket: any;

  constructor() {

  }

  init(url: string) {
    this.url = url;
    if (!ServeurService.instance) {
      this.socket = new WebSocket(url);
      ServeurService.instance = this;
    }
    return ServeurService.instance;
  }

  static getInstance() {
    return ServeurService.instance;
  }


  waitOpen() {
    ServeurService.instance.onopen = () => {
      console.log('Server and client are connecting together !');
    };
  }

  sendMessage(message, callback) {
    this.socket.sendMessage(message, callback);
  }
}

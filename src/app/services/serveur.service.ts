import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class ServeurService {

  constructor(private router: Router) {

  }

  static instance: any;
  url: string;
  socket: any;

  static getInstance() {
    return ServeurService.instance;
  }

  init(url: string) {
    this.url = url;
    console.log(url);
    if (!ServeurService.instance) {
      this.socket = new WebSocket(url);
      console.log(this.socket);
      ServeurService.instance = this;
    }
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

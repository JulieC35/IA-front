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

  moveWait(event: any) {
    // tslint:disable-next-line:triple-equals
    if (event.data == '#Room created') {
      console.log(this);
      const id = this.url.split('room/')[1];
      console.log(id);
      console.log('Passé');
    } else {
      console.log(event.data);
      ServeurService.instance = null;
      console.log(event);
      console.log('Pas passé, instance: ' + ServeurService.instance);
    }
  }

  init(url: string) {
    this.url = url;
    if (!ServeurService.instance) {
      this.socket = new WebSocket(url);
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

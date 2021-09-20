import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WebService } from "./web.service";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  readonly ROOT_URL = 'http://localhost:3000/groups';
  constructor(private webService: WebService) { }

  public getGroups(userId: string){
    return this.webService.get(`groups/${userId}`);
  }

  // public createGroup(name: string, description: string, _userid: string){
    public createGroup(name: string, description: string, abcd: string){
    // alert('group service: ' + _userid);
    // alert('group service: ' + abcd);
    // return this.webService.post('groups', { name, description, _userid });
    return this.webService.post('groups', { name, description, abcd });
  }

  public getMessages(groupId: string){
      return this.webService.get(`groups/${groupId}/messages`);
  }

  public getMessageById(groupId: string, messageId: string){
    return this.webService.get(`groups/${groupId}/messages/${messageId}`);
  }

  public createMessage(groupId: string, messageText: string, image: string) {
      return this.webService.post(`groups/${groupId}/messages/`, { messageText, image });
  }

  public updateMessage(groupId: string, messageId: string, messageText: string, image: string) {
    return this.webService.put(`groups/${groupId}/messages/${messageId}`, { messageText, image });
}

  public deleteGroup(groupId: string) {
      return this.webService.delete(`groups/${groupId}/all`);
  }

  public deleteMessage(groupId: string, messageId: string){
      return this.webService.delete(`groups/${groupId}/messages/${messageId}`);
  }

  // setCompleted(groupId: string, message: message) {
  //     return this.webService.put(`groups/${groupId}/messages/${message._id}`, { completed: !message.completed });
  // }
// /**
//   public getGroupMessages(groupId): Observable<any> {
//     const url = this.ROOT_URL + groupId + '/messages';
//     return this.http.get(url);
//   }
// */
}

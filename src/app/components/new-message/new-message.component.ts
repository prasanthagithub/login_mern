import { Component, OnInit } from '@angular/core';
import { GroupService } from './../../services/group.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Message from './../../model/message.model';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  groupId: string;
  messageId: string;
  // message: Message;
  messageImage: string;
  messageText: string;
  editMessageText: string;
  editMessageImage: string;

  constructor(
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) => this.groupId = params.groupId);
  }

  ngOnInit(): void {
    this.messageId = this.route.snapshot.paramMap.get('id');

    if (this.messageId)
    {
      this.groupService.getMessageById(this.groupId, this.messageId)
          .subscribe((message: Message) => {
            this.messageText = message.messageText;
            this.messageImage = message.image;
      });
    }
  }

  addMessage(messageText: string, messageImage: string) {
    this.groupService.createMessage(this.groupId, this.messageText, messageImage)
        .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
  }

  updateMessage(messageText: string, messageImage: string) {
    this.groupService.updateMessage(this.groupId, this.messageId, this.messageText, messageImage)
        .subscribe(() => this.router.navigate(['../../'], { relativeTo: this.route }));
  }
}

import { Component, OnInit } from '@angular/core';
import { GroupService } from './../services/group.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Message from './../model/message.model';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.css']
})
export class MessageViewComponent implements OnInit {
  groupId: string;
  messageId: string;
  // message: Message;
  messageImage: string;
  messageText: string;

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

  backButton(){
    this.router.navigate(['/dashboard'])
  }
}

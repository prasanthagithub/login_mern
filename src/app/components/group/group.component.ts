import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GroupService } from './../../services/group.service';
import Group from './../../model/group.model';
import Message from './../../model/message.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
  providers: [GroupService]
})
export class GroupComponent implements OnInit {
  // public selectedGroup: null; // This will be used for edit and update operations
  // public groups: []; // This will be used for looping through the collection
  groups: Group[] = [];
  messages: Message[] = [];
  groupId: string;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const myUser = JSON.parse(localStorage.getItem('user'));
    const myUserId = myUser['id'];
    // alert('myUserId GC: ' + myUserId);

    this.groupService.getGroups(myUserId).subscribe((groups: Group[]) => this.groups = groups);
    // when we use httpclient module of angular we get a response back as observable which we will have to subscribe
    this.route.params.subscribe((params: Params) => {
      this.groupId = params.groupId;
      if (!this.groupId) { return; }
      this.groupService.getMessages(this.groupId)
          .subscribe((messages: Message[]) => this.messages = messages);
    });
}

  addMessageClick() {
    if (!this.groupId) {
      alert('Please select a Group to add message'); // this should be replaced by a Toast message or have a dedicated component
      return;
    }

    this.router.navigate(['./newMessage'], { relativeTo: this.route });
  }

  editMessage(message: Message) {
    this.router.navigate(['./editMessage', message._id], { relativeTo: this.route });
  }

  viewMessageClick(message: Message) {
    this.router.navigate(['./viewMessage', message._id], { relativeTo: this.route });
  }


  deleteMessage(message: Message) {
    this.groupService.deleteMessage(this.groupId, message._id)
        .subscribe((message: Message) => this.messages = this.messages.filter(m => m._id !== message._id));
  }

  deleteGroup(group: Group) {
    // You don't want to pass this.listId because this.listId refers to
    // the CURRENTLY SELECTED LIST, not necessarily the list that just got
    // its X button clicked...
    this.groupService.deleteGroup(group._id)
        .subscribe(() => this.groups = this.groups.filter(g => g._id !== group._id));
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from './../../services/group.service';
import Group from './../../model/group.model';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  constructor(
    private groupService: GroupService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addGroup(name: string, description: string) {
    const myUser = JSON.parse(localStorage.getItem('user'));
    const myUserId = myUser['id'];
    // alert('myUserId: ' + myUserId);
    // TODO: The userId is not getting saved in the DB. Have to fix it.
    this.groupService.createGroup(name, description, myUserId)
        .subscribe((group: Group) => this.router.navigate(['/groups', group._id]));
  }

}

import { Component, OnInit } from "@angular/core";
import { IUser } from "./user";
import { UsersService } from "./users.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  constructor(private _usersService: UsersService) {}

  /** List of filtered and sorted users that we want to show */
  filteredUsers: IUser[] = [];

  /** Indicates the current sort direction for full name */
  sortDirection: number = -1;

  toggleSort(): void {
    // reverse the sort direction
    this.sortDirection = this.sortDirection * -1;

    this.filteredUsers = this.filteredUsers.sort((a, b) => {
      // get the last name for both users
      let aLastName = a.name.substring(a.name.lastIndexOf(" ") + 1);
      let bLastName = b.name.substring(b.name.lastIndexOf(" ") + 1);

      // compare by last name only
      if (aLastName < bLastName) {
        return -1 * this.sortDirection;
      } else if (aLastName > bLastName) {
        return 1 * this.sortDirection;
      } else {
        return 0;
      }
    });
  }

  ngOnInit(): void {
    // Get the users data via the service on initialization
    this._usersService.getUsers().subscribe(
      users => {
        // Filter out all users with an extension in the phone number
        this.filteredUsers = users.filter(user => !user.phone.includes(" x"));
      },
      error => console.log(error)
    );
  }
}

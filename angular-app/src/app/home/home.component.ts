import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

// import { User } from '@app/_models';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    loading = false;
    users: any[];
    uservalue: any[];

    constructor(private userService: UserService, private authvalue: AuthenticationService) { }

    ngOnInit() {
        this.loading = false;
        this.uservalue = this.authvalue.currentUserValue;
        console.log(this.uservalue);
        // this.userService.getAll().pipe(first()).subscribe(users => {
        //     this.loading = false;
        //     this.users = users;
        // });
    }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  Users: any = [];
  constructor(private userService: UserService) {}

  ngOnInit() { }

  ionViewDidEnter() {
    this.userService.getUserList().subscribe((res) => {
      console.log(res)
      this.Users = res;
    })
  }

  deleteUser(user:any, i:any) {
    if (window.confirm('Desea eliminar el usuario?')) {
      this.userService.deleteUser(user.codigo)
        .subscribe(() => {
          this.Users.splice(i, 1);
          console.log('Usuario eliminado!')
        }
        )
    }
  }

}

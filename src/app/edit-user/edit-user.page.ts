import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/user.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  updateUserForm: FormGroup;
  id: any;



  constructor(

    private userAPI: UserService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {

    this.id = this.actRoute.snapshot.paramMap.get('id');

  }

  ngOnInit() {

    this.getUserData(this.id);
    this.updateUserForm = this.fb.group({
      codigo: [''],
      nombre: [''],
      telefono: [''],
    })

  }


  getUserData(id:string) {
    this.userAPI.getUser(id).subscribe(res => {
      this.updateUserForm.setValue({
        codigo: res['codigo'],
        nombre: res['nombre'],
        telefono: res['telefono']
      });
    });
  }


  updateForm() {
    if (!this.updateUserForm.valid) {
      return false;
    } else {
      this.userAPI.updateUser(this.id, this.updateUserForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateUserForm.reset();
          this.router.navigate(['/home']);
        })
        return true;
    }
  }


}

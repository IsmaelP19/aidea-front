import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ageValidator, emailValidator, maxLength, minLength, passwordValidator, phoneNumberValidator, requiredValidator } from './validators';
import { UserService } from './user.service';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  form!: FormGroup;

  formControls = [
    { name: 'first_name', placeholder: 'First name', type: 'text' },
    { name: 'last_name', placeholder: 'Last name', type: 'text' },
    { name: 'username', placeholder: 'Username', type: 'text' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'password', placeholder: 'Password', type: 'password' },
    { name: 'age', placeholder: 'Age', type: 'number' },
    { name: 'phone', placeholder: 'Phone', type: 'tel' },
    { name: 'occupation', placeholder: 'Occupation', type: 'text' }
  ]

  constructor(private userService: UserService, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [requiredValidator(), minLength(3), maxLength(20)]),
      email: new FormControl('', [requiredValidator(), emailValidator()]),
      password: new FormControl('', [requiredValidator(), passwordValidator()]),
      first_name: new FormControl('', [requiredValidator(), minLength(3), maxLength(20)]),
      last_name: new FormControl(''),
      age: new FormControl('', [ageValidator()]),
      phone: new FormControl('', [phoneNumberValidator()]),
      occupation: new FormControl('', [maxLength(50)]),
      is_superuser: new FormControl(false)
    });

  }

  getFirstErrorKey(fc: AbstractControl) {
    const keys = fc.errors ? Object.keys(fc.errors) : [];
    return keys.length > 0 ? keys[0] : '';
  }

  getFirstErrorValue(fc: AbstractControl) {
    const errorKey = this.getFirstErrorKey(fc);
    return fc.errors ? fc.errors[errorKey] : null;
  }

  sendForm() {

    this.userService.createUser(this.form.value).subscribe({
      next: user => {
        this.dialogService.openSnackBar('User created successfully', { duration: 2000 }).afterDismissed().subscribe(() => {
          this.form.reset({
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            age: '',
            phone: '',
            occupation: '',
            is_superuser: false
          });
        });
      },
      error: error => {
        console.error(error);
        this.dialogService.openSnackBar('An error occurred while creating the user. Try again later.', { duration: 2000 });
      }
    });

  }




}

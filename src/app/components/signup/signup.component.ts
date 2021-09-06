import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/common.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    signupForm!: FormGroup;

    constructor(private cs: CommonService) {
        this.initializeForm();
    }

    ngOnInit(): void {
    }

    initializeForm() {
        this.signupForm = new FormGroup({
            fullName: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    registerUser(form: any) {
        if (this.signupForm.valid) {
            let fullNameArray = form.value.fullName.split(" ");
            let lastNameArray = fullNameArray.slice(1);
            let signupData = {
                "first_name": fullNameArray[0],
                "last_name": lastNameArray.join(" "),
                "email": form.value.email,
                "password": form.value.password
            };
            this.cs.makePostRequest('user/signup', signupData).subscribe(
                (response: Response) => {
                    let msg: any = response;
                    localStorage.setItem('resendVerificationCode', msg.code);
                    localStorage.setItem("X-Auth-Token", msg.auth_token);
                    localStorage.setItem("user_email", form.value.email);
                },
                (error: any) => {
                    console.error(error.error);
                }
            );
        }
    }

}

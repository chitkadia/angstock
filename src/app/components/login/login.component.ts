import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;

    constructor(private cs: CommonService, private router: Router) {
        this.initializeForm();
    }

    ngOnInit(): void {
    }

    initializeForm() {
        this.loginForm = new FormGroup({
            email: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required)
        });
    }

    /**
     * Function is used to make API call of LOGIN API
     * username or email and password both data are sending in headers
     * @param form,NgForm,To get form data of Login Form
     * 
     * @return Authkey,String,It will be used to authenticate user of each and every API call 
     */
     login(form: any) {
        if(this.loginForm.valid){
            let loginCredetials = {
                "username":form.value.email,
                "password":form.value.password,
            };
            let convertToBase64 = btoa(loginCredetials.username+":"+loginCredetials.password);
            this.cs.setRequestHeader("user/login",  convertToBase64).subscribe(
                (response: any) => {
                    // let user = response.json();
                    let user: any = response;
                    console.log("user : ", user);
                    localStorage.setItem("X-Auth-Token", user.auth_token);
                    localStorage.setItem("user_email", form.value.email);
                    this.router.navigate(["/dashboard"]);
                },
                (error: any) => {
                    console.error(error.error);
                }
            );
        }
    }

}

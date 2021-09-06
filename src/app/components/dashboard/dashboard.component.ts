import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  email: string | null = localStorage.getItem("user_email");
  privateData: Array<any> = [];
  publicData: Array<any> = [];

  constructor(private cs: CommonService) {
    this.privateAPICall();
  }

  ngOnInit(): void {
  }

  privateAPICall() {
    this.cs.makeGetRequest("stock-management/get-invester-list")
    .subscribe(
      (response) => {
        console.log("Private Response : ", response);
          this.privateData = response.rows;
      },
      (error) => {
          console.error("Private Error : ", error);
      }
      );
  }

}

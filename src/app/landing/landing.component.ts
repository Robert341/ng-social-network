import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  pageLoading = true;
  logRegToggle = true;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getSession();
  }

  toggleForm(e) {
    this.logRegToggle = e;
  }

  getSession() {
    this._httpService.getUser().subscribe(res => {
      if (res.isLogged === true) {
        window.location.replace('/main');
      } else if (res.message === 'SERVER_ERROR') {
        window.alert('Server error! Could not get the session.');
      } else if (res.message === 'NO_SESSION') {
        //this.pageLoading = false;
      } else {
        window.alert('Unhandled error!');
      }
    });
  }

}

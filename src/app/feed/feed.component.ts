import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  pageLoading = true;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this._httpService.getUser().subscribe(res => {
      if (res.isLogged === true) {
        this.pageLoading = false;
      } else if (res.message === 'SERVER_ERROR') {
        window.alert('Server error! Could not get the session.');
      } else if (res.message === 'NO_SESSION') {
        window.location.replace('/');
      } else {
        window.alert('Unhandled error!');
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  pageLoading = false;
  logRegToggle = true;

  constructor() { }

  ngOnInit() {
  }

  toggleForm(e) {
    this.logRegToggle = e;
  }

}

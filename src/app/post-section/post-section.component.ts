import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../http.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-post-section',
  templateUrl: './post-section.component.html',
  styleUrls: ['./post-section.component.css']
})
export class PostSectionComponent implements OnInit {

  publishForm: FormGroup;
  inFocus = false;

  constructor(private _formBuilder: FormBuilder, private _httpService: HttpService) { }

  ngOnInit() {
    this.createPublishForm();
  }


  createPublishForm() {
    this.publishForm = this._formBuilder.group({
      message: [],
      images: [[]],
      videos: [[]],
      audios: [[]]
    });
  }

  activateInput(id) {
    $('#' + id).click();
  }

  changeAttachedFiles(filesName, e) {
    const files = e.target.files, temp = [];
    for (let i = 0; i < files.length; i++) {
      temp.push(files[i]);
    }
    this.publishForm.value[filesName] = this.publishForm.value[filesName].concat(temp);
  }

  publish() {
    console.log(this.publishForm.value);
  }

}

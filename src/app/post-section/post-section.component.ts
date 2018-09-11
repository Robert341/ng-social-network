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
  messageInFocus = false;

  constructor(private _formBuilder: FormBuilder, private _httpService: HttpService) { }

  ngOnInit() {
    this.createPublishForm();
  }


  createPublishForm() {
    this.publishForm = this._formBuilder.group({
      publishDate: [],
      message: [''],
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
    if (
      this.publishForm.value.message.length !== 0 ||
      this.publishForm.value.images.length !== 0 ||
      this.publishForm.value.videos.length !== 0 ||
      this.publishForm.value.audios.length !== 0
    ) {
      this.publishForm.value.publishDate = Date.now();
      this._httpService.publishPost(this.publishForm.value).subscribe(res => {
        console.log(res);
      });
    }
  }

}

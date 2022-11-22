import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../models/post.model';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {
    this.postForm = this._formBuilder.group({
      title: ['', Validators.required],
      description: [null, Validators.required],
      file: [null, Validators.required]
    });
  }
  title: any
  description: any
  file: any
  userId: any
  token: any
  tokentoken: string
  post: any
  id: number


  get f() {
    return this.postForm.controls;
  }

  getNameImg(event: any) {
    console.log(event)
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }
  submitBook() {
    if (!this.postForm.invalid) {
      this.title = this.postForm.value.title
      this.description = this.postForm.value.description
      // this.file = this.postForm.value.file
      this.post = { post: { title: this.title, description: this.description, file: this.file, date: Date(), like: 0, dislike: 0, } }
      this.http.post("http://localhost:3000/api/posts", this.post, {
        headers: {
          'Authorization': `Bearer ${this.tokentoken}`,
        },
        // observe: 'body',
      })
        .subscribe((res) => {
          console.log(res)
        })

    }
    console.log(this.post)

  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!);
    this.tokentoken = this.token.token
    this.userId = this.token.userId
  }

}
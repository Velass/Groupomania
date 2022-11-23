import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;
  imageService: any;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router,private sanitizer: DomSanitizer) {
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
  profilePicture: any;
  photo: any
  photoSafe: any

  get f() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!);
    this.tokentoken = this.token.token
    this.userId = this.token.userId
  }

  getNameImg(event: any) {
    console.log(event)
    // if (event.target.files.length > 0) {
    // }
    this.file = event.target.files[0].name;
    this.photo = event.target.files[0]
    console.log(this.file)
  }



  submitBook() {
    if (!this.postForm.invalid) {
      this.title = this.postForm.value.title
      this.description = this.postForm.value.description
      const data = new FormData();
      this.photoSafe = this.sanitizer.sanitize(SecurityContext.URL,this.photo.name)
      data.append('photo', this.photo, this.photo.name);
      data.append("photoName", this.photoSafe.replaceAll(" ","_").replace(/[^a-zA-Z ]/g, "") + "")
      data.append('title', this.title,);
      data.append('description', this.description,);
      console.log(data)
      // this.http.post("http://localhost:3000/api/posts",data);
      // this.file = this.postForm.value.files[0]
      // this.post = { post: { title: this.title, description: this.description, file: this.file, date: Date(), like: 0, dislike: 0,photo: this.photo } }
      // console.log(this.post)
      this.http.post("http://localhost:3000/api/posts", data, {
        headers: {
          'Authorization': `Bearer ${this.tokentoken}`,
        },
      })
        .subscribe((res) => {
          console.log(res)
          setTimeout(()=>{ this.router.navigate(['/postmenu']); }, 10)
        })

    }

  }




}

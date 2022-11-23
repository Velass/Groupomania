import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private _formBuilder: FormBuilder, private http: HttpClient,private router: Router) {
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
  profilePicture: string;

  get f() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!);
    this.tokentoken = this.token.token
    this.userId = this.token.userId
  }

  // getNameImg(event: any) {
  //   console.log(event)
  //   // if (event.target.files.length > 0) {
  //   // }
  //   this.file = event.target.files[0];
  //   console.log(event.target.files)
  // }

  handleProfilePictureInput(file: any) {
    console.log(file.target.files[0].name)
    this.getBase64(file.target.files[0])
      .subscribe((str: string) => this.profilePicture = str)
      console.log(this.profilePicture);
  }

  getBase64(event: any): Observable<string> {
    return new Observable<string>(sub => {
      const reader = new FileReader();
      reader.readAsDataURL(event);
      reader.onload = () => {
        sub.next(reader.result!.toString());
        sub.complete();
      };
      reader.onerror = error => {
        sub.error(error);
      };
    })
  }

  submitBook() {
    if (!this.postForm.invalid) {
      this.title = this.postForm.value.title
      this.description = this.postForm.value.description
      this.file = this.postForm.value.file
      this.post = { post: { title: this.title, description: this.description, file: this.file, date: Date(), like: 0, dislike: 0, } }
      this.http.post("http://localhost:3000/api/posts", this.post, {
        headers: {
          'Authorization': `Bearer ${this.tokentoken}`,
        },
      })
        .subscribe((res) => {
          console.log(res)
          setTimeout(()=>{ this.router.navigate(['/postmenu']); }, 50)
        })

    }
    console.log(this.post)

  }




}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-modify',
  templateUrl: './post-modify.component.html',
  styleUrls: ['./post-modify.component.scss']
})
export class PostModifyComponent implements  OnInit {
  postForm: FormGroup;
  imageService: any;

  constructor(private _formBuilder: FormBuilder, private http: HttpClient,private router: Router,private route: ActivatedRoute) {
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
  idPost: any

  get f() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!);
    this.tokentoken = this.token.token
    this.userId = this.token.userId
    this.idPost = this.route.snapshot.params._id;
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
      .subscribe((str: any) => this.profilePicture = str)
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
      this.post = { post: { title: this.title, description: this.description, file: this.file,} }
      this.http.put("http://localhost:3000/api/posts/"+ this.idPost, this.post, {
        headers: {
          'Authorization': `Bearer ${this.tokentoken}`,
        },
      })
        .subscribe((res) => {
          console.log(res)
          setTimeout(()=>{ this.router.navigate(['/postmenu']); }, 10)
        })

    }
    console.log(this.post)

  }


}


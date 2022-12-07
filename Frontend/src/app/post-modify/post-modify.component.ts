import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-post-modify',
  templateUrl: './post-modify.component.html',
  styleUrls: ['./post-modify.component.scss']
})
export class PostModifyComponent implements OnInit {
  postForm: FormGroup;
  imageService: any;
  type: string;
  textdescription: any;
  texttitle: any;
  getpost : any



  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
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
  photo: any
  photoSafe: any;
  postTitle: any
  postDescription: any;

  get f() {
    return this.postForm.controls;
  }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!);
    this.tokentoken = this.token.token
    this.userId = this.token.userId
    this.idPost = this.route.snapshot.params._id;
    this.postinfo()
   
  }

  getNameImg(event: any) {
    this.file = event.target.files[0].name;
    this.photo = event.target.files[0]
    this.type = event.target.files[0].type
    this.type = this.type.split('/')[1]
  }


  submitBook() {
    if (!this.postForm.invalid) {
      this.title = this.postForm.value.title
      this.description = this.postForm.value.description
      const data = new FormData();
      this.photoSafe = this.sanitizer.sanitize(SecurityContext.URL, this.photo.name)
      data.append('photo', this.photo, this.photo.name);
      data.append("photoName", this.photoSafe.replaceAll(" ", "_").replace(/[^a-zA-Z ]/g, "") + "." + this.type)
      data.append('title', this.title,);
      data.append('description', this.description,);
      this.http.put("http://localhost:3000/api/posts/" + this.idPost, data, {
        headers: {
          'Authorization': `Bearer ${this.tokentoken}`,
        },
      })
        .subscribe((res) => {
          setTimeout(() => { this.router.navigate(['/postmenu']); }, 10)
        })
       

    }

  }

  postinfo() {
    this.getpost = this.http.get("http://localhost:3000/api/posts/" + this.idPost, {
      headers: {
        'Authorization': `Bearer ${this.tokentoken}`,
      },
    })
  
      .subscribe((res) => {
        this.post = res
        this.postForm.get('description')?.patchValue(this.post.description)
        this.postForm.get('title')?.patchValue(this.post.title)

      })

      
      
      
  }

}


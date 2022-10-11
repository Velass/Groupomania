import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  get f() {
    return this.postForm.controls;
  }
  submitBook() {
    if (!this.postForm.invalid) {
      this.http.post("http://localhost:3000/api/posts", this.postForm.value)
      .subscribe((res) => {
        console.log(res)
      })

      console.log(this.postForm.value);
    }


  }

  ngOnInit(): void {
    console.log(this.postForm.controls)

  }

}

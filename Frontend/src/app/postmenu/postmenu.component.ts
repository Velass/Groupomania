import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { POST } from '../post-list/post-list';

@Component({
  selector: 'app-postmenu',
  templateUrl: './postmenu.component.html',
  styleUrls: ['./postmenu.component.scss']
})
export class PostmenuComponent implements OnInit {
  postSelected!: Post | undefined;
  postList: Post[] = POST;
  listOfPosts: any
 
  constructor(private http: HttpClient,
    private router: Router) {

  }

  token: any
  mapped : any

  ngOnInit() {
    this.token = JSON.parse(localStorage.getItem("token")!).token;
    this.useremail()
    this.listPost()

  }

  selectPost(post: Post) {

  }




  email = Array

  useremail() {
    const token = JSON.parse(localStorage.getItem("token")!);
    this.email = token.email
  }


  onlike(postId: string) {
    const id: Post | undefined = this.postList.find(Post => Post._id == parseInt(postId))
    // const target = event.target
    if (id) {
      console.log(`${id.title}`);
      this.postSelected = id

    } else {
      console.log("non")

    }

  }

  goPost(post: Post) {
    this.router.navigate(['/postmenu', post._id])
  }

  listPost() {
    this.http.get("http://localhost:3000/api/posts", {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .subscribe((res) => {
        this.listOfPosts = res
        console.log(this.listOfPosts)
       
      })
      
  }

}

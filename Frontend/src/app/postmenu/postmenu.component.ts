import { Component, OnInit, Input } from '@angular/core';
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



  ngOnInit() {
    
    this.useremail()

  }

  selectPost(post: Post) {

  }


  constructor(private router: Router) {

  }

  email = Array

  useremail(){
    const token = JSON.parse(localStorage.getItem("token")!);
    console.log(token)
    this.email = token.email
    console.log(this.email)
  }


  onlike(postId: string ) {
    const id: Post | undefined = this.postList.find(Post => Post.id == parseInt(postId))
    // const target = event.target
    if (id) {
      console.log(`${id.title}`);
      this.postSelected = id

    } else {
      console.log("non")

    }

  }

  goPost(post: Post) {
    this.router.navigate(['/postmenu', post.id])
  }
}




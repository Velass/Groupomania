import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';
import { Post } from '../models/post.model';
import { POST } from '../post-list/post-list';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  postList: Post[] | undefined;
  post: Post | undefined;
  
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.postList = POST;
    const postId: string|null = this.route.snapshot.paramMap.get('id');
    if(postId){
      this.post = this.postList.find(post => post.id == +postId)

    } else{
      this.post = undefined
    }
    
  }
  goPostList() {
    this.router.navigate(['/postmenu']);
  }
}

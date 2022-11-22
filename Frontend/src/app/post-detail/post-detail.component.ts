import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  post:any;
  postList: any
  token: any
  
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!).token;
    this.listPost() 
    // this.postList = POST;
    // console.log(this.post)
    // const postId: string|null = this.route.snapshot.paramMap.get('_id');
    // if(postId){
    //   this.post = this.postList.find(post => post._id == +postId)

    // } else{
    //   this.post = undefined
    // }
    
  }
  goPostList() {
    this.router.navigate(['/postmenu']);
  }

  listPost() {
    this.http.get("http://localhost:3000/api/posts", {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    })
      .subscribe((res) => {
        this.postList = res
        const postId: string|null = this.route.snapshot.paramMap.get('_id');
        // this.post = this.postList.find((post: { _id: string; }) =>post._id == postId)
        if(postId){
          this.post = this.postList.find((post: { _id: string; }) =>post._id == postId)
          // this.post = this.postList.find((post) =>post._id == +postId)
          // this.post = this.postList[0]._id.includes(postId)
          // this.post = this.postList.find((post: { _id: number; } ) => post._id == +postId)
          console.log(this.post)
          // console.log(this.postList[0]._id.includes(postId))
        } else{
          this.post = undefined
        }
      })
      
  }

}

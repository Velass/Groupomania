import { HttpClient } from '@angular/common/http';
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
  post: Post | any;
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
        this.post = res
        console.log(this.post)
        this.postList = POST;
        console.log(this.post)
        const postId: string|null = this.route.snapshot.paramMap.get('_id');
        console.log(postId)
        console.log(this.postList)
        if(postId){
          this.post = this.postList.find(post => post._id == +postId)
    
        } else{
          this.post = undefined
        }
       
        // for(var index in listOfPosts){
        // this.listOfPosts = { title: listOfPosts[index].title, description: listOfPosts[index].description, imageUrl: listOfPosts[index].imageUrl, date: new Date,like:listOfPosts[index].likes, dislike:listOfPosts[index].dislikes, id:listOfPosts[index]._id  }
      // }
      //  this.mapped = Object.keys(this.listOfPosts).map(key => ({type: key, value: this.listOfPosts[key]}))
      
      //  console.log( this.mapped)
      })
      
  }

}

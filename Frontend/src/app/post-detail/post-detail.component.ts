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
  userIdToken: string
  userIdPost: string
  idPost: string
  watchModifyAndDelete: boolean
  isAdmin: boolean
  like: boolean = false;
  dislike: boolean = false
  showDislike: boolean = true
  showLike: boolean = true
  liked: boolean = false;
  disliked: boolean = false;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.token = JSON.parse(localStorage.getItem("token")!).token;
    this.isAdmin = this.userIdToken = JSON.parse(localStorage.getItem("token")!).isAdmin;
    this.userIdToken = JSON.parse(localStorage.getItem("token")!).userId;
    this.listPost() 
    // this.buttonModifyAndDelete()
    // this.userIdPostAndToken = this.userIdPost === this.userIdToken == true
    // voir si il est possibvle de faire ca
    
   
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
        if(postId){
          this.post = this.postList.find((post: { _id: string; }) =>post._id == postId)
          this.userIdPost = this.post.userId
          this.idPost = this.post._id
          if (this.userIdPost == this.userIdToken ||this.isAdmin== true ) {
            this.watchModifyAndDelete = true
          }
          
        } else{
          this.post = undefined
        }
      })
      
  }


  delete(event: any){
    console.log(event)
    if (this.userIdPost === this.userIdToken ||this.isAdmin== true ) {
      this.http.delete(`http://localhost:3000/api/posts/${this.idPost}`,{
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      })
      .subscribe((res)=>{
        console.log(res)
        setTimeout(()=>{ this.router.navigate(['/postmenu']); }, 10)
      });
      
      
    } else {
      console.log("vous n'avez pas l'authorisation")
    }
    
  }

  modify(event: any){
    console.log(event)
    if (this.userIdPost === this.userIdToken ||this.isAdmin== true ) {
      setTimeout(()=>{ this.router.navigate(['/modify', this.idPost]); }, 10)
    }
  }

  onlike(event: any){
    const numberLike = document.getElementById("numberLike") as HTMLElement;
    if (event && this.like == false) {
      this.like = true
      this.liked = true
    } else if (event && this.like == true ){
      this.like = false
      this.liked = false
    }
    console.log(this.liked)
    if (this.liked == true) {
      this.showDislike = false;
      numberLike.style.color = "green"
      console.log("coucou")

      
    } else if(this.liked == false) {
      this.showDislike = true;
      numberLike.style.color = "black"
      console.log("coucou2")
    }

  }

  onDislike(event: any){
    const numberLike = document.getElementById("numberDislike") as HTMLElement;
    if (event && this.dislike == false) {
      this.dislike = true
      this.disliked = true
    } else if (event && this.dislike == true ){
      this.dislike = false
      this.disliked = false
    }
    console.log(this.disliked)
    if (this.disliked == true) {
      this.showLike = false;
      numberLike.style.color = "red"
      console.log("coucou")

      
    } else if(this.disliked == false) {
      this.showLike = true;
      numberLike.style.color = "black"
      console.log("coucou2")
    }

  }

}

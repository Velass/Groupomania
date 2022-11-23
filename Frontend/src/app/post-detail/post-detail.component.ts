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

  // buttonModifyAndDelete(){
  //   console.log(this.userIdPost)
  //   console.log(this.userIdToken)
  //   if (this.userIdPost == this.userIdToken ||this.isAdmin== true ) {
  //     this.watchModifyAndDelete = true
  //   }

  // }

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
        setTimeout(()=>{ this.router.navigate(['/postmenu']); }, 50)
      });
      
      
    } else {
      console.log("vous n'avez pas l'authorisation")
    }
    
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  post: any;
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
  postLike: any;
  postDislike: any;
  postRemoveLike: any;
  postRemoveDislike: any;
  postRes: any;
  getPost: any;
  userIdInUserLiked: any | undefined
  userIdInUserDisliked: any | undefined;
  numberLike: any | null | undefined;
  numberDislike: any | null | undefined;






  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void | null {
    this.token = JSON.parse(localStorage.getItem("token")!).token;
    this.isAdmin = this.userIdToken = JSON.parse(localStorage.getItem("token")!).isAdmin;
    this.userIdToken = JSON.parse(localStorage.getItem("token")!).userId;
    this.listPost()

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
        const postId: string | null = this.route.snapshot.paramMap.get('_id');
        if (postId) {
          this.post = this.postList.find((post: { _id: string; }) => post._id == postId)
          this.userIdPost = this.post.userId
          this.idPost = this.post._id
          console.log(this.post)
          this.userIdInUserLiked = this.post.usersLiked.find((element: any) => element == this.userIdToken)
          this.userIdInUserDisliked = this.post.usersDisliked.find((element: any) => element == this.userIdToken)

          if (this.userIdPost == this.userIdToken || this.isAdmin == true) {
            this.watchModifyAndDelete = true
          }

        } else {
          this.post = undefined
        }
        if (this.userIdInUserLiked ) {
          this.http.get(`http://localhost:3000/api/posts/${this.idPost}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,

            },
          })
            .subscribe((res) => {
              console.log(res)
              this.getPost = res
              this.showDislike = false;
              this.showLike = true
              this.numberLike = document.querySelector("#numberLike") as HTMLElement;
              this.numberLike.innerText = this.getPost.likes
              this.numberLike.style.color = "green"
              this.onlike(event)
            })

        }
        if (this.userIdInUserDisliked ) {
          this.http.get(`http://localhost:3000/api/posts/${this.idPost}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,

            },
          })
            .subscribe((res) => {
              console.log(res)
              this.getPost = res
              this.showLike = false;
              this.showDislike = true
              this.numberDislike = document.querySelector("#numberDislike") as HTMLElement;
              this.numberDislike.innerText = this.getPost.dislikes
              this.numberDislike.style.color = "red"
              console.log("ondislike")
              this.onDislike(event)
            })

        }
      })

  }


  delete(event: any) {
    console.log(event)
    if (this.userIdPost === this.userIdToken || this.isAdmin == true) {
      this.http.delete(`http://localhost:3000/api/posts/${this.idPost}`, {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      })
        .subscribe((res) => {
          console.log(res)
          setTimeout(() => { this.router.navigate(['/postmenu']); }, 10)
        });


    } else {
      console.log("vous n'avez pas l'authorisation")
    }

  }

  modify(event: any) {
    console.log(event)
    if (this.userIdPost === this.userIdToken || this.isAdmin == true) {
      setTimeout(() => { this.router.navigate(['/modify', this.idPost]); }, 10)
    }
  }

  onlike(event: any | null) {
    if (event && this.like == false) {
      this.like = true
      this.liked = true
    } else if (event && this.like == true) {
      this.like = false
      this.liked = false
    }

    if (this.liked == true || this.userIdInUserLiked == true) {
      this.showDislike = false;
      this.showLike = true
      this.numberLike = document.getElementById("numberLike");
      this.numberLike.style.color = "green"
      this.postLike = { userId: this.userIdToken, like: 1 }
      this.http.post(`http://localhost:3000/api/posts/${this.idPost}/like`, this.postLike, {
        headers: {
          'Authorization': `Bearer ${this.token}`,

        },
      })
        .subscribe((res: any) => {
          console.log(res)
          this.http.get(`http://localhost:3000/api/posts/${this.idPost}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,

            },
          })
            .subscribe((res) => {
              this.getPost = res
              this.numberLike.innerText = this.getPost.likes
              console.log("coucou")
            })
        })

    } else if (this.liked == false || this.userIdInUserLiked == false) {
      this.showDislike = true;
      this.showLike = true
      this.numberLike.style.color = "black"
      this.postRemoveLike = { userId: this.userIdToken, like: 0 }
      this.http.post(`http://localhost:3000/api/posts/${this.idPost}/like`, this.postRemoveLike, {
        headers: {
          'Authorization': `Bearer ${this.token}`,

        },
      })
        .subscribe((res) => {
          console.log(res)
          this.http.get(`http://localhost:3000/api/posts/${this.idPost}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,

            },
          })
            .subscribe((res) => {
              console.log(res)
              this.getPost = res
              this.numberLike.innerText = this.getPost.likes
            })
        })

    }

  }

  onDislike(event: any) {
    if (event && this.dislike == false) {
      this.dislike = true
      this.disliked = true
    } else if (event && this.dislike == true) {
      this.dislike = false
      this.disliked = false
    }

    if (this.disliked == true || this.userIdInUserDisliked == true) {
      this.showLike = false;
      this.showDislike = true
      this.numberDislike = document.getElementById("numberDislike");
      this.numberDislike.style.color = "red"
      this.postDislike = { userId: this.userIdToken, like: -1 }
      this.http.post(`http://localhost:3000/api/posts/${this.idPost}/like`, this.postDislike, {
        headers: {
          'Authorization': `Bearer ${this.token}`,

        },
      })
        .subscribe((res: any) => {
          console.log(res)
          this.http.get(`http://localhost:3000/api/posts/${this.idPost}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,

            },
          })
            .subscribe((res) => {
              this.getPost = res
              this.numberDislike.innerText = this.getPost.dislikes
              console.log("test")
            })
        })

    } else if (this.disliked == false || this.userIdInUserLiked == false) {
      this.showLike = true;
      this.showDislike = true
      this.numberDislike.style.color = "black"
      this.postRemoveDislike = { userId: this.userIdToken, like: 0 }
      this.http.post(`http://localhost:3000/api/posts/${this.idPost}/like`, this.postRemoveDislike, {
        headers: {
          'Authorization': `Bearer ${this.token}`,

        },
      })
        .subscribe((res) => {
          console.log(res)
          this.http.get(`http://localhost:3000/api/posts/${this.idPost}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,

            },
          })
            .subscribe((res) => {
              console.log(res)
              this.getPost = res
              this.numberDislike.innerText = this.getPost.dislikes
            })
        })

    }
  }

}

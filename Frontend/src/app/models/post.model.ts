export class Post {
    
    constructor(
        public title: string,
        public description: string,
        public date: Date,
        public like: number,
        public dislike: number,
        public imageUrl: string,
        public name : string,
        public id : number,) {

    }

}
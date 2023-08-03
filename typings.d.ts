export interface post {
    id: Key | null | undefined;
    _id: string; 
    publishedAt: string;
    title: string ;
    author:{
        name: string;
        image : string;
    };
    comments : Comment[]; 
    description : string;
    mainImage:{ 
        asset:{
            url:string;
        };
    };
    slug:{
        current: any;
        currernt: string;
    };
    body: [object];
}

export interface Comment {
    approved : boolean;
    comment : string ;
    email : string ;
    name : string;
    post : {
        _ref: string ;
        _type: string;

    };
    publishedAt : string;
    _id: string ;
    _rev: string;
    _type: string ;
    _updatedAt: string;
};
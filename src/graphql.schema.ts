export class CreateUserInput {
    lastName?: string;
}

export class Comment {
    id?: number;
    body?: string;
    parentIds?: number[];
    points?: number;
    postId?: number;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;

    abstract createComment(body: string, postId: number, parentIds?: number[]): Comment | Promise<Comment>;

    abstract createPost(title: string, body?: string): Post | Promise<Post>;
}

export class Post {
    id?: number;
    title?: string;
    body?: string;
    points?: number;
    comments?: Comment[];
}

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;

    abstract getPosts(): Post[] | Promise<Post[]>;

    abstract getPost(id?: number): Post | Promise<Post>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;

    abstract postCreated(): Post | Promise<Post>;
}

export class User {
    id?: number;
    lastName?: string;
}

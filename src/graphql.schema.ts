export class CreatePostInput {
    title?: string;
    body?: string;
}

export class CreateUserInput {
    lastName?: string;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;

    abstract createPost(createPostInput?: CreatePostInput): Post | Promise<Post>;
}

export class Post {
    id?: number;
    title?: string;
    body?: string;
    points?: string;
}

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;

    abstract posts(): Post[] | Promise<Post[]>;

    abstract post(id?: string): Post | Promise<Post>;

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

export class CreateUserInput {
    lastName?: string;
}

export abstract class IMutation {
    abstract createUser(createUserInput?: CreateUserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract getUsers(): User[] | Promise<User[]>;

    abstract temp__(): boolean | Promise<boolean>;
}

export abstract class ISubscription {
    abstract userCreated(): User | Promise<User>;
}

export class User {
    id?: number;
    lastName?: string;
}

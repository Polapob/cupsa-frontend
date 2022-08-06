type UserBodyTypes = Record<"first_name" | "last_name" | "nick_name", string>;

export type UpdateUserBodyTypes = Partial<UserBodyTypes>;

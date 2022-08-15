export type FriendResultTypes = Record<string, string>;

export interface IGetFriendsInterface {
  success: boolean;
  result: {
    data: FriendResultTypes;
    struct: {
      from: number;
      to: number;
      all: number;
    };
  };
}

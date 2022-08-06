export type FriendResultTypes = Record<string, string>;

export interface IGetFriendsInterface {
  success: boolean;
  result: FriendResultTypes;
}

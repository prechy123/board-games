export interface IUser {
  email: string;
  profilePictureUrl: string;
  username: string;
  playerId: string;
}

export interface PlayerState {
  : string | null;
  profilePictureUrl: string | null;
}

export interface AuthState extends IUser {
    isAuthenticated: boolean
  }
  
  export interface RootState {
    auth: AuthState;
    player: PlayerState[]
  }
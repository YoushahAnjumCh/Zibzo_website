export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  userName: string;
  userImage: File | null;
}

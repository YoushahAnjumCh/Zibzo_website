export class AuthModel {
  constructor(
    public email?: string,
    public userName?: string,
    public id?: number,
    public token?: string,
    public isUserAuthenticated: boolean = false
  ) {
    this.email = email;
    this.userName = userName;
    this.id = id;
    this.token = token;
    this.isUserAuthenticated = isUserAuthenticated;
  }
}

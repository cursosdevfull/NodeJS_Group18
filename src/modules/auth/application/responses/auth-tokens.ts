export class AuthTokens {
  private readonly accessToken: string;
  private readonly refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  get properties() {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }
}

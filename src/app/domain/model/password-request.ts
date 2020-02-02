
export class PasswordRequest {
  private readonly _currentPassword: string;
  private readonly _confirmationPassword: string;
  private readonly _newPassword: string;


  constructor(currentPassword: string, confirmationPassword: string, newPassword: string) {
    this._currentPassword = currentPassword;
    this._confirmationPassword = confirmationPassword;
    this._newPassword = newPassword;
  }

  get currentPassword(): string {
    return this._currentPassword;
  }

  get confirmationPassword(): string {
    return this._confirmationPassword;
  }

  get newPassword(): string {
    return this._newPassword;
  }
}

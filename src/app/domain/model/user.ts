import {Role} from './role';

export class User {
  private _id: string;
  private _name: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;
  private _pseudo: string;
  private _avatarUrl: string;
  private _token: string;
  private _picture: string;
  private _isAvatarUpdated: boolean; // TODO create a specific Avatar object
  private _roles: Array<Role>;


  constructor() {
    this.roles = new Array<Role>();
  }

  public copy(): User {
    const userCopy = new User();

    userCopy.id = this.id;
    userCopy.name = this.name;
    userCopy.firstName = this.firstName;
    userCopy.lastName = this.lastName;
    userCopy.email = this.email;
    userCopy.pseudo = this.pseudo;
    userCopy.avatarUrl = this.avatarUrl;
    userCopy.token = this.token;
    userCopy.picture = this.picture;
    userCopy.isAvatarUpdated = this.isAvatarUpdated;
    userCopy.roles = this.roles;

    return userCopy;
  }

  get roles(): Array<Role> {
    return this._roles;
  }

  set roles(value: Array<Role>) {
    this._roles = value;
  }

  get isAvatarUpdated(): boolean {
    return this._isAvatarUpdated;
  }

  set isAvatarUpdated(value: boolean) {
    this._isAvatarUpdated = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get pseudo(): string {
    return this._pseudo;
  }

  set pseudo(value: string) {
    this._pseudo = value;
  }

  get avatarUrl(): string {
    return this._avatarUrl;
  }

  set avatarUrl(value: string) {
    this._avatarUrl = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }

  get picture(): string {
    return this._picture;
  }

  set picture(value: string) {
    this._picture = value;
  }
}

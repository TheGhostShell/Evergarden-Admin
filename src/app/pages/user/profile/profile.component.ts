import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {User} from '../../../domain/model/user';
import {State} from '../../../ngrx/reducers';
import {AvatarUpdated, UserUpdated} from '../../../ngrx/actions/user.action';

function prim(boolVal: boolean): boolean {
  if (boolVal) {
    return true;
  } else {
    return false;
  }
}

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  private user: User = new User();
  private editPicture: boolean = false;
  private avatarFile: FileList;
  // TODO need to add generic placeholder image
  private previewUrl: string = '';

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.pipe(select(state => state.userKey.user)).subscribe(value => this.user = value);
  }

  edit(): void {
    this.editPicture = !this.editPicture;
    this.previewUrl = 'http://localhost:8080' + this.user.avatarUrl;
    const userCopy = this.user.copy();
    userCopy.isAvatarUpdated = false; // TODO its more complex we need to compare the name of file to cover all case
    this.store.dispatch(new UserUpdated(this.user));
  }

  changeAvatar(): void {
    this.store.dispatch(new AvatarUpdated({...this.avatarFile}));
  }

  preview(img: FileList) {
    if (img && img[0]) {
      const reader = new FileReader();
      reader.onload = ((e) => {
        this.previewUrl = e.target['result'];
        this.avatarFile = img;
        const userCopy = this.user.copy();
        userCopy.isAvatarUpdated = true;
        this.store.dispatch(new UserUpdated(userCopy));
      });

      reader.readAsDataURL(img[0]);
    }
  }
}

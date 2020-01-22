import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {UserData} from '../../../@core/data/users';
import {LayoutService} from '../../../@core/utils';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {Store} from '@ngrx/store';
import {State} from '../../../ngrx/reducers';
import {Login} from '../../../ngrx/actions/login.actions';
import {User} from '../../../domain/model/user';
import {Token} from '../../../domain/model/token';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  userPictureOnly: boolean = false;
  user: User;
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];
  currentTheme = 'default';
  userMenu = [
    {
      title: 'Profile',
      link: '/pages/user/profile',
      icon: {pack: 'fa', icon: 'user'},
    },
    {
      title: 'Log out',
      icon: {pack: 'fa', icon: 'sign-out-alt'},
    },
  ];
  private token: Token = new Token();
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
              private store: Store<State>,
              private router: Router) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.eva);

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.menuService.onItemClick()
      .subscribe((event) => {
        if (event.item.title === 'Log out') {
          this.authService.logout('email')
            .subscribe(value => this.router.navigate(['auth/login']));
        }
      });

    this.login();
    this.store.select(state => state.userKey.user).subscribe(value => this.user = value);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  private login(): void {
    this.authService.onTokenChange().subscribe(
      (token: NbAuthJWTToken) => {
        if (token.isValid()) {
          const newToken: Token = new Token();
          newToken.token = token.getValue();
          newToken.email = token.getPayload().email;
          newToken.userId = token.getPayload().id;
          this.store.dispatch(new Login(newToken));
        }
      },
    );
  }
}

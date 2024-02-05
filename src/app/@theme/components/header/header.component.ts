import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {UserData} from '../../../@core/data/users';
import {LayoutService} from '../../../@core/utils';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {selectAllUsers} from '../../../pages/users/users.selectors';
import {AppState} from '../../../pages/app-store/app-state';
import {User} from '../../../pages/users/users.entity';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  userPictureOnly: boolean = false;
  user: any;
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
  users: Partial<User>[] = [];
  userMenu = [{title: 'Log out'}];
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private router: Router,
              private store: Store<AppState>,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    const auth = localStorage.getItem('auth');

    if (!auth) {
      this.router.navigate(['/']);
      return;
    }

    console.log('auth', auth);
    console.log('JSON.parse(auth).username', JSON.parse(auth).username);

    this.user = {name: JSON.parse(auth)?.data?.user?.firstName + ' ' + JSON.parse(auth)?.data?.user?.lastName};

    // this.store.pipe(select(selectAllUsers))
    //   .subscribe({
    //     next: (data) => {
    //       this.users = data;
    //       console.log('this.users', this.users);
    //       const foundUser = this.users.find(user => user.email === JSON.parse(auth).username);
    //       this.user = {name: foundUser?.firstName + ' ' + foundUser?.lastName};
    //     },
    //   });

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

    this.menuService.onItemClick().subscribe(bag => {
      if (bag.item.title === 'Log out') {
        this.logout();
      }
    });
  }

  logout() {
    localStorage.clear();
    window.location.reload();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
}

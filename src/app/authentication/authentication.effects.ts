import {Inject, Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {AuthenticationService} from './authentication.service';
import {Config, CONFIG_TOKEN} from '../pages/utils/config';
import {Router} from '@angular/router';

@Injectable()
export class AuthenticationEffects {

  // @Effect()
  // login$ = this.actions$.pipe(
  //   ofType<LogInRequest>(AuthenticationActionsTypes.LogInRequest),
  //   mergeMap((action) => this.authenticationService.login(action.payload).pipe(
  //     tap((data) => {
  //
  //       // localStorage.setItem(this.config.authentication, data.results[0]).subscribe((dataSuccess) => {
  //       //     if (dataSuccess) {
  //       //       this.router.navigate(['/home/dashboard']);
  //       //     } else {
  //       //       console.log('login$ error');
  //       //     }
  //       //   }, error1 => {
  //       //     console.log('login$ errors', error1);
  //       //   });
  //
  //       localStorage.setItem(this.config.authentication, JSON.stringify(data.dtos[0]));
  //       this.router.navigate(['/pages/dashboard']);
  //     }, err => {
  //       console.log('login$ errors', err.error);
  //     }),
  //     map(admin => new LogIn(admin.dtos[0])),
  //     catchError((err) => of(new LogInError(err.error))),  // remap error
  //   )),
  // );
  //
  // @Effect()
  // logout$ = this.actions$.pipe(
  //   ofType<LogOutRequest>(AuthenticationActionsTypes.LogOutRequest),
  //   mergeMap(() => this.authenticationService.logout().pipe(
  //     tap((data) => {
  //       this.router.navigate(['/']);
  //     }, err => {
  //       console.log('logout$ err', err.error);
  //     }),
  //     map(() => new LogOut()),
  //     catchError((err) => of(new LogOutError(err.error))),  // remap error
  //   )),
  // );
  //
  // @Effect()
  // inits$ = defer(() => {
  //   console.log('defer auth');
  // });

  constructor(private actions$: Actions,
              @Inject(CONFIG_TOKEN) private config: Config,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }
}

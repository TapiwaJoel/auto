import {Component, Inject, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../pages/app-store/app-state';
import {selectAuthenticationState, selectAuthenticationSuccess} from '../authentication.selectors';
import {LogOutRequest} from '../authentication.actions';
import {Observable} from 'rxjs';
import {Config, CONFIG_TOKEN} from '../../pages/utils/config';
import {AuthenticationError} from '../authentication.error';

@Component({
  selector: 'ngx-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.css']
})
export class SignInModalComponent implements OnInit {
  success$: Observable<boolean>;

  constructor(protected ref: NbDialogRef<SignInModalComponent>,
              @Inject(CONFIG_TOKEN) private config: Config,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.success$ = this.store.pipe(select(selectAuthenticationSuccess));
    this.success$.subscribe((data: boolean) => {
      if (data) {
        this.ref.close();
      }
    });

    this.store.pipe(select(selectAuthenticationState)).subscribe((data) => {
      if (data.ids.length > 0 && data.error === AuthenticationError.AUTH_EXIST) {
        localStorage.setItem(this.config.authentication, JSON.stringify(data.entities[data.ids[0]]));
      }
    });
  }

  dismiss() {
    this.store.dispatch(new LogOutRequest());
  }
}

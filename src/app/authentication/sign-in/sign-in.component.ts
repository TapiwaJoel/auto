import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../pages/app-store/app-state';
import {NbComponentStatus, NbDialogService} from '@nebular/theme';
import {selectAuthenticationLoading} from '../authentication.selectors';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication.service';
import {Toast} from '../../pages/utils/toast';
import {loadUserRequest} from '../../pages/users/users.actions';

@Component({
  selector: 'ngx-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  loading$: Observable<boolean>;
  isSubmitting = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private toast: Toast,
              private authenticationService: AuthenticationService,
              private dialogService: NbDialogService,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectAuthenticationLoading));
    this.signInForm = this.fb.group({
      'username': new FormControl(null),
      'password': new FormControl(null),
    });
  }

  async onSubmit() {
    this.isSubmitting = true;
    this.authenticationService.login({
      ...this.signInForm.value,
    }).subscribe(async (loginResponse: any) => {
      console.log('loginResponse', loginResponse);
      localStorage.setItem('auth', JSON.stringify({...loginResponse, username: this.signInForm.value.username}));
      this.store.dispatch(loadUserRequest());
      this.router.navigate(['/pages']).then((data) => {
        this.isSubmitting = false;
      });
    }, error => {
      const title = 'Error';
      const content = `Invalid credentials`;
      const status: NbComponentStatus = 'danger';
      this.toast.makeToast(status, title, content);
      this.isSubmitting = false;
    });
  }
}

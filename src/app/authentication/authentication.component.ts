import {Component} from '@angular/core';

@Component({
  selector: 'ngx-authentication',
  template: `
    <nb-card>
      <nb-card-body style="width: 80vw; height: 80vh">
        <nb-layout style="background: white;">
          <!--          <nb-layout-column>Left column</nb-layout-column>-->
          <nb-layout-column>
            <router-outlet></router-outlet>
          </nb-layout-column>
          <!--          <nb-layout-column>Right column</nb-layout-column>-->
        </nb-layout>
      </nb-card-body>
    </nb-card>
  `,
})
export class AuthenticationComponent {
}


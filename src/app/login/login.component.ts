import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PasswordValidation, EmailValidation } from '../Common/Validations';
import { UiService } from '../Common/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError = '';
  redirectUrl;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private route: ActivatedRoute, private uiService: UiService ) {
    route.paramMap.subscribe(params => (this.redirectUrl = params.get('redirectUrl')));

  }

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    });
  }

  async login(submittedForm: FormGroup) {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password).subscribe(authStatus => {
        if (authStatus.isAuthenticated) {
          this.uiService.showToast(`Welcome! Role: ${authStatus.userRole}`);
          this.router.navigate([this.redirectUrl || '/manager']);
        }
      }, error => (this.loginError = error));
  }

}

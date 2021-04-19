import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthService } from '../../interfaces';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public signInForm: FormGroup;
  public usernameKey = 'userName';
  public passwordKey = 'password';
  private _isSubmitting = false;

  get isSubmitting(): boolean {
    return this._isSubmitting;
  }
  get usernameControl(): FormControl {
    return this.signInForm.get(this.usernameKey) as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signInForm.get(this.passwordKey) as FormControl;
  }

  constructor(
    private readonly _authService: IAuthService,
    private readonly _router: Router,
  ) {}

  public ngOnInit(): void {
    this.signInForm = new FormGroup({
      [this.usernameKey]: new FormControl(null, [Validators.required]),
      [this.passwordKey]: new FormControl(null, [Validators.required]),
    });
  }

  public login(): void {
    if (this.signInForm.valid) {
      const username = this.signInForm.get(this.usernameKey).value;
      const password = this.signInForm.get(this.passwordKey).value;

      this.signInForm.disable();
      this._isSubmitting = true;
      this._authService.login(username, password).subscribe(
        () => {
          const redirectUrl = this._authService.redirectAfterLoginUrl;

          if (redirectUrl) {
            this._router.navigateByUrl(redirectUrl);
          } else {
            this._router.navigateByUrl('/pages');
          }
        },
        () => {
          this.signInForm.enable();
          this._isSubmitting = false;
          this._router.navigateByUrl('/pages');
        },
      );
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  loading = false;

  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }
}

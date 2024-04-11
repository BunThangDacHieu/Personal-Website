import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Kiểm tra quyền Admin
    const isAdmin = this.authService.isAdmin();
    if (isAdmin) {
      // Nếu là Admin, cho phép truy cập
      return true;
    } else {
      // Nếu không phải Admin, chuyển hướng đến trang không được phép
      return this.router.createUrlTree(['/forbidden']);
    }
  }
}
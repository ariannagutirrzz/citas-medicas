import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    public authService: AuthService,
    private breakpointObserver: BreakpointObserver
  ) {
    console.log('Dashboard Component - AuthService:', this.authService);
    console.log('Dashboard Component - Current User:', this.authService.currentUserValue);
    console.log('Dashboard Component - Has Admin Role:', this.authService.hasRole('admin'));
    console.log('Dashboard Component - Has Paciente Role:', this.authService.hasRole('paciente'));
  }
} 
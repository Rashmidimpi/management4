import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router'
import { AuthStateService } from 'src/app/shared/auth-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isSignedIn: boolean | any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  
  constructor(private breakpointObserver: BreakpointObserver, public router: Router, public auth: AuthStateService) {}

  ngOnInit(){
   
    this.auth.userAuthState.subscribe(val => {
      this.isSignedIn = val
    });
      
  }

  logout() {
    localStorage.setItem("isLoggedin","false");
    this.isSignedIn = false;
    
    this.router.navigate(['signin']);
    
  }


}

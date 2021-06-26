import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-complete',
  templateUrl: './register-complete.page.html',
  styleUrls: ['./register-complete.page.scss'],
})
export class RegisterCompletePage implements OnInit {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  onLogOut() {
      this.afAuth.signOut().then(() => {
        console.log("Se cerro sesion ");
        this.afAuth.credential;
        this.router.navigateByUrl('/login');
      }).catch((error) => {
        console.log(error);
      });
  }

}

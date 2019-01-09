import * as firebase from 'firebase';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()

export class AuthService {
  token: string;
  errorMsgChanged = new Subject<string>();

  constructor(private router: Router) {}
  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
      response => {
        this.router.navigate(['/']);
      }).catch(
      error => console.log(error)
    )

  }

  signInUser(email: string, password: string){
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      response => {
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken()
          .then(
          (token: string) => this.token = token
        )
      }
    ).catch(
      error => {this.errorMsgChanged.next(error);}
    )
  }

  signOutUser() {
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
      (token: string) => this.token = token
    );
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }


}

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Database, ref, update, child, getDatabase, get, } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-valvula',
  templateUrl: './valvula.component.html',
  styleUrls: ['./valvula.component.css']
})
export class ValvulaComponent implements OnInit {
  dataUser: any;
  constructor(
    private router: Router,
    public database: Database,
    private afAuth: AngularFireAuth,
    ) {
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
      }else{
        this.router.navigate(['/login'])
      }
    })
  }
  public valveOpen: boolean = false;
  rele() {
    this.valveOpen = !this.valveOpen;
    update(ref(this.database, 'Consumodeagua/Valvula/'), {
      Estado: this.valveOpen
    });
  }
}
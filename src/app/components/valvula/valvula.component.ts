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
  public valveOpen: boolean = false;
  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        // Obtener el estado actual de la base de datos
        const dbRef = ref(this.database, 'Consumodeagua/Valvula/Estado');
        get(dbRef).then((snapshot) => {
          if (snapshot.exists()) {
            // Asignar el valor de la base de datos a la variable valveOpen
            this.valveOpen = snapshot.val();
          }
        });
      } else {
        this.router.navigate(['/login'])
      }
    })
  }
  rele() {
    this.valveOpen = !this.valveOpen;
    update(ref(this.database, 'Consumodeagua/Valvula/'), {
      Estado: this.valveOpen
    });
  }
}
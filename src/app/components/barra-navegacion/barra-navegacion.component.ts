import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Database, ref, update, child, getDatabase, get, } from '@angular/fire/database';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {
  dataUser: any;
  rol: string = "";
  id = "";
  constructor(
    private router: Router,
    public database: Database,
    private afAuth: AngularFireAuth,
  ) {
    this.usuarios = [];
    this.startTimer();
  }
  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        this.id = this.dataUser = user.uid;
        console.log(this.id);
        this.getUserRol(this.id); // obtener el rol del usuario actual
      }else{
        this.router.navigate(['/login'])
      }
    })
  }
  timeLeft = 60;
  interval: any;
  usuarios: any[];
  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 500)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  logout(){
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }
   // Función para obtener el rol del usuario
   getUserRol(userId: string) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Consumodeagua/Usuarios/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        this.rol = userData.rol;
        console.log(`El rol del usuario es: ${this.rol}`);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
}

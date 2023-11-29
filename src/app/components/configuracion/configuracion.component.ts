import { Component, OnInit } from '@angular/core';
import { Database, set, ref, update, onValue, remove, DataSnapshot, child, getDatabase, get, object } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent  implements OnInit {
  dataUser: any;
  rol: string = "";
  Nombre: string = "";
  ApellidoPaterno: string = "";
  ApellidoMaterno: string = "";
  CorreoElectronico: string = "";
  Direccion: string = "";
  FechaNacimiento: Date = new Date('2000-01-01T00:00:00');
  id = "";
  constructor(
    private router: Router,
    public database: Database,
    private afAuth: AngularFireAuth,
  ) 
  {//iniciador
    this.usuarios = [];
    this.getusers();
    this.startTimer();
  }
  timeLeft = 60;
  interval: any;
  usuarios: any[];
  startTimer() {
    this.interval = setInterval(() => {
      this.getusers(); //METODO PARA ACTUALIZAR DATOS DE WEBAPI
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
  //Mostrar
  getusers() {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Consumodeagua/Usuarios/${[]}`)).then((snapshot) => {
      if (snapshot.exists()) {
        this.usuarios = Object.keys(snapshot.val() || {}).map(k => snapshot.val()[k]);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        this.id = user.uid;
        this.getUserRol(this.id); // obtener el rol del usuario actual
        this.getusers(); // obtener los registros de consumo de agua
      }else{
        this.router.navigate(['/login'])
      }
    })
  }

// Función para obtener el rol del usuario
getUserRol(userId: string) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `Consumodeagua/Usuarios/${userId}`)).then((snapshot) => {
    if (snapshot.exists()) {
      const userData = snapshot.val();
      this.rol = userData.rol;
      this.Nombre = userData.Nombre;
      this.ApellidoPaterno = userData.ApellidoPaterno;
      this.ApellidoMaterno = userData.ApellidoMaterno;
      this.CorreoElectronico = userData.CorreoElectronico;
      this.Direccion = userData.Direccion;
      this.FechaNacimiento = userData.FechaNacimiento;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}
}

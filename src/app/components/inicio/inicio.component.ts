import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Database, set, ref, update, onValue, remove, DataSnapshot, child, getDatabase, get, object } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  dataUser: any;
  firstValor: any; // valor actual de la base de datos
  consumo: any[];
  timeLeft = 60;
  interval: any;
  constructor(
    private router: Router,
    public database: Database,
    private afAuth: AngularFireAuth,
  ) {
    this.consumo = [];
    this.getusers();
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      this.getusers(); //METODO PARA ACTUALIZAR DATOS DE WEBAPI

      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    }, 500);
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
//Mostrar
 getusers() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `Consumodeagua/SensordeFlujo/${[]}`)).then((snapshot) => {
    if (snapshot.exists()) {
      this.consumo = Object.keys(snapshot.val() || {}).map(k => snapshot.val()[k]);
      
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
      }else{
        this.router.navigate(['/login'])
      }
    })
  }
  getCaudalImagen(caudal: number) {
    if (caudal <= 0) {
      return '../../../assets/imagenes/Icono_SensorAgua_Grafica_fondo.png';
    } else if (caudal >= 0.1 && caudal <= 0.9) {
      return '../../../assets/imagenes/Icono_SensorAgua_Grafica_Verde.png';
    } else if (caudal >= 1 && caudal <= 1.9) {
      return '../../../assets/imagenes/Icono_SensorAgua_Grafica_Naranja.png';
    } else {
      return '../../../assets/imagenes/Icono_SensorAgua_Grafica_Rojo.png';
    }
  }
}
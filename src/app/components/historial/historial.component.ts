import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { retry, toArray } from 'rxjs';
import { Database, set, ref, update, onValue, remove, DataSnapshot, child, getDatabase, get, object } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  dataUser: any;
  rol: string = "";
  id = "";
  userid ="";
  timeLeft = 60;
  interval: any;
  usuarios: any[];
  usuariosall: any[];
  constructor(
    private router: Router,
    public database: Database,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService
  ) {//iniciador
    this.usuarios = [];
    this.usuariosall = [];
    this.startTimer();
  }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        this.id = user.uid;
        this.getUserRol(this.id); // obtener el rol del usuario actual
        this.getusers(); // obtener los registros de consumo de agua
      } else {
        this.router.navigate(['/login'])
      }
    })
  }


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

  // Función para obtener el rol del usuario
  getUserRol(userId: string) {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Consumodeagua/Usuarios/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        this.rol = userData.rol;
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  //Mostrar
  getusers() {
    if (!this.id) {
      console.error("ID de usuario no definido.");
      return;
    }

    const dbRef = ref(getDatabase());
    const historialRef = child(dbRef, 'Consumodeagua/Historial');

    // Filtro según el rol del usuario
    if (this.rol === 'administrador') {
      // Mostrar todos los registros
      get(historialRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.usuarios = Object.keys(snapshot.val() || {}).map(k => snapshot.val()[k]);
          //foreach
          var count = 0;
          this.usuarios.forEach(element => {
              const userId = element.userid;
              
            this.usuariosall[count] = Object.keys(element || {}).map(k => element[k]);
            count++;
          });
          count = 0;
        } else {
          console.log("No data available admin");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
    else {
      // Mostrar sólo los registros del usuario actual
      const usuarioRef = child(historialRef, this.id);
      get(usuarioRef).then((snapshot) => {
        if (snapshot.exists()) {
          this.usuarios = Object.keys(snapshot.val() || {}).map(k => snapshot.val()[k]);
        } else {
          console.log("No data available habitante");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }
  deleteUser(uid = "", id = ""): void {
    const registroRef = ref(this.database, 'Consumodeagua/Historial/' + uid + '/' + id);
    // eliminamos el registro
    remove(registroRef)
      .then(() => {
        this.toastr.success('¡El registro se eliminó con éxito!', 'Eliminación exitosa');
      })
      .catch((error) => {
        console.error(error);
        this.toastr.error('Hubo un error al eliminar el registro', 'Error');
      });
  }
  public OpenCrear: boolean = false;
  botonCreear() {
    this.OpenCrear = !this.OpenCrear;
  }
  public OpenEditar: boolean = false;
  botonEditar() {
    this.OpenEditar = !this.OpenEditar;
  }
  //Crear
  registerUser(value: any) {
    //Crear datos
    set(ref(this.database, 'Consumodeagua/Historial/' + value.uid + '/' + value.aid), {
      uid: value.uid,
      id: value.aid,
      Nombre: value.Nombre,
      Fecha: value.Fecha,
      Flujo: value.Flujo,
      Estado: value.Estado
    });
    this.toastr.success('¡El historial se registró con éxito!', 'Registro exitoso');
  }
    //Modificar
    modifyUser(value: any) {
      update(ref(this.database, 'Consumodeagua/Historial/' + value.aid), {
        id: value.aid,
        Nombre: value.Nombre,
        Fecha: value.Fecha,
        Flujo: value.Flujo,
        Estado: value.Estado
      });
      this.toastr.success('¡El historial se actualizó con éxito!', 'Actualización exitosa');
    }
}
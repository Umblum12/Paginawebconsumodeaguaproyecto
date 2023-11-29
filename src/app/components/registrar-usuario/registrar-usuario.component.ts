import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import { Database, set, ref, update, onValue, remove, DataSnapshot, child, getDatabase, get, object } from '@angular/fire/database';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {
  registrarUsuario: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private firebaseError: FirebaseCodeErrorService,
    public database: Database,
  ) {
    this.registrarUsuario = this.fb.group({
      Nombre: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoPaterno: ['', [Validators.required, Validators.minLength(3)]],
      ApellidoMaterno: ['', [Validators.required, Validators.minLength(3)]],
      Correo: ['', [Validators.required, Validators.email]],
      Direccion: ['', [Validators.required, Validators.minLength(3)]],
      FechaNacimiento: ['', Validators.required],
      Contrasena: ['', [Validators.required, Validators.minLength(8)]],
      Confirmarcontrasena: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  ngOnInit(): void {
  }
  registrar() {
    const Nombre = this.registrarUsuario.value.Nombre;
    const ApellidoPaterno = this.registrarUsuario.value.ApellidoPaterno;
    const ApellidoMaterno = this.registrarUsuario.value.ApellidoMaterno;
    const Correo = this.registrarUsuario.value.Correo;
    const Direccion = this.registrarUsuario.value.Direccion;
    const FechaNacimiento = this.registrarUsuario.value.FechaNacimiento;
    const Contrasena = this.registrarUsuario.value.Contrasena;
    const Confirmarcontrasena = this.registrarUsuario.value.Confirmarcontrasena;
    if (Contrasena !== Confirmarcontrasena) {
      this.toastr.error('¡Las contraseñas no coinciden!', 'Error');
      return;
    }
    this.loading = true;
    this.afAuth.createUserWithEmailAndPassword(Correo, Contrasena)
      .then((user) => {
        const aid = user.user?.uid;
        if (aid) {
          this.registerUser(aid, Nombre, ApellidoPaterno, ApellidoMaterno, Correo, Direccion, FechaNacimiento, Contrasena);
          this.verificarCorreo();
        } else {
          // Manejo del caso en que aid es undefined
          this.toastr.error('¡El ID de usuario es undefined!', 'Error ID');
        }
      }).catch((error) => {
        this.loading = false;
        this.toastr.error(this.firebaseError.CodeError(error.code), 'Error');
      })
  }
  verificarCorreo() {
    this.afAuth.currentUser
      .then((user) => user?.sendEmailVerification())
      .then(() => {
        this.loading = false;
        this.toastr.info('¡Se envio un correo de verificación!', 'Verificar correo');
        this.router.navigate(['/login']);
      });
  }
  //Registrar
  registerUser(
    aid: string,
    Nombre: string,
    ApellidoPaterno: string,
    ApellidoMaterno: string,
    Correo: string,
    Direccion: string,
    FechaNacimiento: Date,
    Contrasena: string
    ) {
    //Crear datos
    set(ref(this.database, 'Consumodeagua/Usuarios/' + aid), {
      UID: aid,
      Nombre: Nombre,
      ApellidoPaterno: ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno,
      CorreoElectronico: Correo,
      Direccion: Direccion,
      FechaNacimiento: FechaNacimiento,
      Contrasena: Contrasena,
      rol: "habitante"
    });
    this.toastr.success('¡El usuario se ha registrado con éxito!', 'Registro exitoso');
  }

  mostrarContrasena: boolean = false;
  mostrarContrasena1: boolean = false;

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
  toggleMostrarContrasena1(): void {
    this.mostrarContrasena1 = !this.mostrarContrasena1;
  }
}
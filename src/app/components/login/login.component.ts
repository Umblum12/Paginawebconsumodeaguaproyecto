import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/services/firebase-code-error.service';
import {  ElementRef , ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  dataUser: any;
  loginUsuario: FormGroup;
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router,
    private firebaseError: FirebaseCodeErrorService,
  ) {
    this.loginUsuario = this.fb.group({
      Correo: ['', [Validators.required, Validators.email]],
      Contrasena: ['', [Validators.required, Validators.minLength(8)]],
    })
  }
  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if (user && user.emailVerified) {
        this.dataUser = user;
        this.router.navigate(['/login'])
      }else{
        this.router.navigate(['/login'])
      }
    })
  }
  login() {
    const Correo = this.loginUsuario.value.Correo;
    const Contrasena = this.loginUsuario.value.Contrasena;
    this.loading = true;
    this.afAuth.signInWithEmailAndPassword(Correo, Contrasena).then((user) => {
      if (user.user?.emailVerified) {
        this.toastr.success('¡El usuario ha iniciado sesión con éxito!', 'Sesión iniciada');
        this.router.navigate(['/inicio']);
      } else {
        this.router.navigate(['/verificar-correo']);
      }
    }).catch((error) => {
      this.loading = false;
      this.toastr.error(this.firebaseError.CodeError(error.code), 'Error');
      console.log(error.code);
    })
  }


  @ViewChild('container', { static: false }) container!: ElementRef;

  onRegisterClick() {
    if (this.container) {
      this.container.nativeElement.classList.add('active');
    }
  }

  onLoginClick() {
    if (this.container) {
      this.container.nativeElement.classList.remove('active');
    }
  }
  isSignUpVisible: boolean = false;

  toggleSignUpVisibility() {
    this.isSignUpVisible = !this.isSignUpVisible;
  }

  mostrarContrasena: boolean = false;

  toggleMostrarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
}
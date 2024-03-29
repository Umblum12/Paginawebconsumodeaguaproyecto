import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from "@angular/forms";

//Componentes
import { InicioComponent } from './components/inicio/inicio.component';
import { ValvulaComponent } from './components/valvula/valvula.component';
import { HistorialComponent } from './components/historial/historial.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { BarraInformacionComponent } from './components/barra-informacion/barra-informacion.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';

import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { AcercadeComponent } from './components/acercade/acercade.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { ConsumoComponent } from './components/consumo/consumo.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    ValvulaComponent,
    HistorialComponent,
    LoginComponent,
    RegistrarUsuarioComponent,
    RecuperarPasswordComponent,
    VerificarCorreoComponent,
    BarraInformacionComponent,
    BarraNavegacionComponent,
    SpinnerComponent,
    ConfiguracionComponent,
    AcercadeComponent,
    GraficasComponent,
    ConsumoComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideDatabase(() => getDatabase()),
    FormsModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

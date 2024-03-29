import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { VerificarCorreoComponent } from './components/verificar-correo/verificar-correo.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { BarraInformacionComponent } from './components/barra-informacion/barra-informacion.component';
import { BarraNavegacionComponent } from './components/barra-navegacion/barra-navegacion.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ValvulaComponent } from './components/valvula/valvula.component';
import { HistorialComponent } from './components/historial/historial.component';
import { GraficasComponent } from './components/graficas/graficas.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { AcercadeComponent } from './components/acercade/acercade.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registrar-usuario', component: RegistrarUsuarioComponent },
  { path: 'verificar-correo', component: VerificarCorreoComponent },
  { path: 'recuperar-password', component: RecuperarPasswordComponent },
  { path: 'barra-informacion', component: BarraInformacionComponent },
  { path: 'barra-navegacion', component: BarraNavegacionComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'valvula', component: ValvulaComponent },
  { path: 'historial', component: HistorialComponent },
  { path: 'graficas', component: GraficasComponent },
  { path: 'acercade', component: AcercadeComponent },
  { path: 'configuracion', component: ConfiguracionComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

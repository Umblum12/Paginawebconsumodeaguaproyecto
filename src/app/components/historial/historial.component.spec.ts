import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComponent } from './historial.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { Database } from '@angular/fire/database';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;

  beforeEach(async () => {
    const mockUser = {
      uid: 'aweE1thfkvVRKLjRQT2678dHsIG2',
      emailVerified: true
    };
    
    const mockAuth = {
      currentUser: Promise.resolve(mockUser)
    };
     TestBed.configureTestingModule({
      declarations: [ HistorialComponent, BarraNavegacionComponent ],
      imports: [ RouterTestingModule, ToastrModule.forRoot(), AngularFireModule.initializeApp(environment.firebaseConfig) ],
      providers: [
        { provide: Database, useValue: {} },
        { provide: AngularFireAuth, useValue: mockAuth },
        { provide: ActivatedRoute, useValue: {} },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('Comprueba que la función getusers() obtiene algunos usuarios y actualiza el arreglo usuarios1', () => {
  //   component.getusers();// Llamar a la función getusers()
  //   expect(component.usuarios1.length).toBeGreaterThan(0);// Comprobar que se hayan obtenido algunos usuarios
  // });
  
  // it('Comprueba que la función deleteUser() elimina a usuarios y actualiza el arreglo usuarios1', () => {
  //   const initialLength = component.usuarios1.length; // Guardar la longitud inicial del arreglo usuarios1
  //   component.deleteUser(1); // Eliminar el usuario con id = 1
  //   expect(component.usuarios1.length).toBe(initialLength - 1); // Comprobar que la longitud del arreglo se ha actualizado
  //   expect(component.usuarios1.find(u => u.id === 1)).toBeUndefined(); // Comprobar que el usuario con id = 1 ha sido eliminado
  // });

});

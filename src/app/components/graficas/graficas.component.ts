import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Database, set, ref, update, onValue, remove, DataSnapshot, child, getDatabase, get, object } from '@angular/fire/database';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent {
  //Grafica flujo de agua
  @ViewChild('chartFlujo', { static: false }) chartRefFlujo!: ElementRef;
  chart: any;
  encabezados: string[] = [];
  valores: number[] = [];
  datos: number[] = [];
  Consumo: any[];
  timeLeft = 60;
  interval: any;
  firstValor: any; // valor actual de la base de datos

  //Grafica Valvula
  @ViewChild('chartValvula', { static: false }) chartRefValvula!: ElementRef;
  chartValvula: any;
  encabezadosValvula: string[] = [];
  valoresValvula: number[] = [];
  datosValvula: Number[] = [];
  EstadosValvula: any[];
  firstValorValvula: any; // valor actual de la base de datos
  Check = true;
  constructor(
    public database: Database
  ) {
    this.EstadosValvula = [];
    this.Consumo = [];
    this.getusers();
    this.getDatosValvula();
    this.startTimer();
  }
  startTimer() {
    this.interval = setInterval(() => {
      this.getusers(); //METODO PARA ACTUALIZAR DATOS DE WEBAPI
      this.getDatosValvula(); //METODO PARA ACTUALIZAR DATOS DE WEBAPI
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
      this.Consumo = Object.keys(snapshot.val() || {}).map(k => snapshot.val()[k]); //esta cochinada hace todo lo que era el problema
      //mete todo el objeto que me da snapshot y lo pone en un arreglo que si se puede leer por registros por separado alm 
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  for (let index = 0; index < this.Consumo.length; index++) {
    if (index== 22) {
      this.encabezados = [];
    }
    this.Consumo.forEach(element => {
      this.datos.push(Number(element.flujo));
    });
    this.encabezados.push("seg");
    this.chart.data.labels = this.encabezados;
    this.chart.data.datasets[0].data = this.datos;
    this.chart.update();
  }
}
//Obtener datos de valvula Abierto/Cerrado
getDatosValvula() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `Consumodeagua/Valvula/${[]}`)).then((snapshot) => {
    if (snapshot.exists()) {
      this.EstadosValvula = Object.keys(snapshot.val() || {}).map(k => snapshot.val()[k]); //esta cochinada hace todo lo que era el problema
      //mete todo el objeto que me da snapshot y lo pone en un arreglo que si se puede leer por registros por separado alm 
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  for (let index = 0; index < this.EstadosValvula.length; index++) {
    if (index== 22) {
      this.encabezadosValvula = [];
    }
    
    this.EstadosValvula.forEach(element => {
      if (element == true) {
      this.datosValvula.push(Number(1));
      this.Check = true;
      }
      if (element == false) {
        this.datosValvula.push(Number(0));
        this.Check = false;
      }
    });
    this.encabezadosValvula.push("seg");
    this.chartValvula.data.labels = this.encabezadosValvula;
    this.chartValvula.data.datasets[0].data = this.datosValvula;
    this.chartValvula.update();
  }
}


  ngOnInit(): void {
    this.startTimer();
  }
  // Función para inicializar el gráfico de Chart.js con los datos actuales
  ngAfterViewInit() {
    const chartCtx = this.chartRefFlujo.nativeElement.getContext('2d');
    this.chart = new Chart(chartCtx, {
      type: 'line',
      data: {
        labels: this.encabezados,
        datasets: [
          {
            label: 'Litros',
            data: this.datos,
            backgroundColor: 'blue',
            borderColor: 'blue'
          }
        ]
      },
      options:{
        responsive: true
      }
    });

    const chartCtxValvula = this.chartRefValvula.nativeElement.getContext('2d');
    this.chartValvula = new Chart(chartCtxValvula, {
      type: 'line',
      data: {
        labels: this.encabezadosValvula,
        datasets: [
          {
            label: 'MOVIMIENTOS',
            data: this.datosValvula,
            backgroundColor: 'blue',
            borderColor: 'dark'
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }
  updateChart() {
    this.chart.update();
  }
  updateChartValvula() {
    this.chartValvula.update();
  }
}

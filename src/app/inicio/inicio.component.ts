import { GraficasInicioService } from './../services/GraficasInicio/graficas-inicio.service';
import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  Highcharts = Highcharts;
  dataIse1 = [[], [], [], []];
  dataIse2 = [[], [], [], []];
  dataE1ms1 = [[], [], [], []];
  myTimer: any;
  timerOn = false;
  yaEmpezo = false;
  fechas = [];
  imagen: any;
  imgUrl: string;
  fechaEnMiliseg: any;
  fechaEnMilisegAnterior: any;

  imgErr() {
    this.imgUrl = './assets/images/VolcanFuegoDefault.png';
  }

  /**
   * Manda a traer la imagen de la página de inicio
   */
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imagen = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  /**
   * Datos de configuración de chart ISE1
   */
  chartOptionsEstacion1 = {
    plotOptions: {
      series: {
        turboThreshold: 0, // Comment out this code to display error
      },
    },
    rangeSelector: {
      enabled: false,
    },

    title: {
      text: 'Estación ISE1_INFRA',
    },

    xAxis: {
      categories: this.fechas,
    },

    credits: {
      enabled: false,
    },

    yAxis: [
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Pascales',
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        id: 'aapl-ohlc',
        name: 'Sensor 1',
        data: this.dataIse1[0],
        type: 'spline',
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 2',
        data: this.dataIse1[1],
        type: 'spline',
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 3',
        data: this.dataIse1[2],
        type: 'spline',
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 4',
        data: this.dataIse1[3],
        type: 'spline',
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
  };

  /**
   * Datos de configuración de chart ISE2
   */  
  chartOptionsEstacion2 = {
    plotOptions: {
      series: {
        turboThreshold: 0, // Comment out this code to display error
      },
    },
    rangeSelector: {
      enabled: false,
    },

    title: {
      text: 'Estación ISE2_INFRA',
    },

    credits: {
      enabled: false,
    },

    yAxis: [
      {
        labels: {
          align: 'right',
          x: -3,
        },

        title: {
          text: 'Pascales',
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        id: 'aapl-ohlc',
        name: 'Sensor 1',
        data: this.dataIse2[0],
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 2',
        data: this.dataIse2[1],
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 3',
        data: this.dataIse2[2],
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 4',
        data: this.dataIse2[3],
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
  };

  /**
   * Datos de configuración de chart E1MS1
   */
  chartOptionsEstacion3 = {
    plotOptions: {
      series: {
        turboThreshold: 0, // Comment out this code to display error
      },
    },
    rangeSelector: {
      enabled: false,
    },

    title: {
      text: 'Estación E1MS1',
    },

    credits: {
      enabled: false,
    },

    yAxis: [
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Pascales',
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
      },
    ],

    tooltip: {
      split: true,
    },

    series: [
      {
        id: 'aapl-ohlc',
        name: 'Sensor 1',
        data: this.dataE1ms1[0],
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 2',
        data: this.dataE1ms1[1],
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 3',
        data: this.dataE1ms1[2],
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 4',
        data: this.dataE1ms1[3],
      },
    ],
    boost: {
      useGPUTranslations: true,
      // Chart-level boost when there are more than 5 series in the chart
      seriesThreshold: 10,
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 800,
          },
          chartOptions: {
            rangeSelector: {
              inputEnabled: false,
            },
          },
        },
      ],
    },
  };

  constructor(private graficasInicioService: GraficasInicioService) {}

  ngOnDestroy() {
    delete this.Highcharts;
  }

  /**
   * ngOnInit donde se hace el request de la data inicial, y se inicializan los gráficos
   */
  async ngOnInit() {
    this.graficasInicioService.GetLastImage().subscribe((res) => {
      if(res){
        if(res.ImgUrl){
          this.imgUrl = res.ImgUrl;
        }else{
          this.imgUrl = './assets/images/VolcanFuegoDefault.png';
        }
      }else{
        this.imgUrl = './assets/images/VolcanFuegoDefault.png';
      }
    });

    this.fechaEnMiliseg = Date.now();
    this.graficasInicioService.GetDataIse1().subscribe((res) => {
      if (res) {
        //console.log(res);
        let fechas = res.data.fechas;
        let sensores = res.data.sensores;
        fechas.forEach((elemento, i) => {
          sensores.forEach((element, j) => {
            //console.log(elemento)
            var myDate = new Date(elemento);
            var result = myDate.getTime();
            this.dataIse1[j].push([result, element.mediciones[i]]);
          });
        });
        //console.log('Data', this.dataIse1);
        //console.log(this.Highcharts.charts);
        this.Highcharts.charts[0].series[0].setData(this.dataIse1[0]);
        this.Highcharts.charts[0].series[1].setData(this.dataIse1[1]);
        this.Highcharts.charts[0].series[2].setData(this.dataIse1[2]);
        this.Highcharts.charts[0].series[3].setData(this.dataIse1[3]);
        this.Highcharts.charts[0].hideLoading();
        //console.log('Data', this.data);

        this.graficasInicioService.GetDataIse2().subscribe((res) => {
          if (res) {
            //console.log(res);
            let fechas = res.data.fechas;
            let sensores = res.data.sensores;
            fechas.forEach((elemento, i) => {
              sensores.forEach((element, j) => {
                var myDate = new Date(elemento);
                var result = myDate.getTime();
                this.dataIse2[j].push([result, element.mediciones[i]]);
              });
            });
            //console.log('Data', this.data);

            //console.log(this.Highcharts.charts);
            this.Highcharts.charts[1].series[0].setData(this.dataIse2[0]);
            this.Highcharts.charts[1].series[1].setData(this.dataIse2[1]);
            this.Highcharts.charts[1].series[2].setData(this.dataIse2[2]);
            this.Highcharts.charts[1].series[3].setData(this.dataIse2[3]);
            this.Highcharts.charts[1].hideLoading();
            //console.log('Data', this.data);

            this.graficasInicioService.GetDataE1ms1().subscribe((res) => {
              if (res) {
                let fechas = res.data.fechas;
                let sensores = res.data.sensores;
                fechas.forEach((elemento, i) => {
                  sensores.forEach((element, j) => {
                    var myDate = new Date(elemento);
                    var result = myDate.getTime();
                    this.dataE1ms1[j].push([result, element.mediciones[i]]);
                  });
                });
                //console.log('Data', this.dataE1ms1);
                //console.log(this.Highcharts.charts);

                this.Highcharts.charts[2].series[0].setData(this.dataE1ms1[0]);
                this.Highcharts.charts[2].series[1].setData(this.dataE1ms1[1]);
                this.Highcharts.charts[2].series[2].setData(this.dataE1ms1[2]);
                this.Highcharts.charts[2].series[3].setData(this.dataE1ms1[3]);
                this.Highcharts.charts[2].hideLoading();
                //console.log('Data', this.data);
                this.myTimer = setInterval(() => this.requestData(), 5000);
                this.timerOn = true;
                this.yaEmpezo = true;
              }
            });
          }
        });
      }
    });
  }

  /**
   * Función de lógica para activar o desactivar funcion de request data
   */
  toggleTimer() {
    if (this.timerOn) {
      this.disabledInter();
    } else {
      this.enableInter();
    }
  }

  /**
   * Función para habilitar la request de data
   */
  enableInter() {
    //console.log('enableInter');
    this.timerOn = true;
    this.myTimer = setInterval(() => this.requestData(), 5000);
  }

  /**
   * Función para deshabilitar la request de data
   */
  disabledInter() {
    this.timerOn = false;
    //console.log('DisableInter');
    clearTimeout(this.myTimer);
  }

  /**
   * Función para traer la data del servidor, toma en cuenta la última traída de datos para solo traer la diferencia entre el ultimo valor y el mas nuevo.
   */
  requestData() {
    this.fechaEnMilisegAnterior = this.fechaEnMiliseg;
    this.fechaEnMiliseg = Date.now();

    //console.log(fechaEnMiliseg);
    //console.log(fechaEnMilisegAnterior);

    this.graficasInicioService
      .GetDataIse1Fecha(this.fechaEnMilisegAnterior, this.fechaEnMiliseg)
      .subscribe((res) => {
        if (res) {
          //console.log(res)
          let fechas = res.data.fechas;
          let sensores = res.data.sensores;

          // console.log('Fechas nuevas: ', fechas);
          // console.log('Sensores nuevas: ', sensores);

          fechas.forEach((elemento, i) => {
            sensores.forEach((element, j) => {
              //console.log(elemento)
              var myDate = new Date(elemento);
              var result = myDate.getTime();
              this.dataIse1[j].push([result, element.mediciones[i]]);
            });
          });

          this.dataIse1[0].sort();
          this.dataIse1[1].sort();
          this.dataIse1[2].sort();
          this.dataIse1[3].sort();
          //console.log('Data ise1', this.dataIse1);
          this.Highcharts.charts[0].series[0].setData(this.dataIse1[0], true);
          this.Highcharts.charts[0].series[1].setData(this.dataIse1[1], true);
          this.Highcharts.charts[0].series[2].setData(this.dataIse1[2], true);
          this.Highcharts.charts[0].series[3].setData(this.dataIse1[3], true);
          //this.Highcharts.charts[0].hideLoading();
          //console.log('Data', this.data);
        }
      });

    this.graficasInicioService
      .GetDataIse2Fecha(this.fechaEnMilisegAnterior, this.fechaEnMiliseg)
      .subscribe((res) => {
        if (res) {
          //console.log(res)
          let fechas = res.data.fechas;
          let sensores = res.data.sensores;
          fechas.forEach((elemento, i) => {
            sensores.forEach((element, j) => {
              //console.log(elemento)
              var myDate = new Date(elemento);
              var result = myDate.getTime();
              this.dataIse2[j].push([result, element.mediciones[i]]);
            });
          });

          this.dataIse2[0].sort();
          this.dataIse2[1].sort();
          this.dataIse2[2].sort();
          this.dataIse2[3].sort();
          //console.log('Data ise1', this.dataIse1);
          this.Highcharts.charts[1].series[0].setData(this.dataIse2[0], true);
          this.Highcharts.charts[1].series[1].setData(this.dataIse2[1], true);
          this.Highcharts.charts[1].series[2].setData(this.dataIse2[2], true);
          this.Highcharts.charts[1].series[3].setData(this.dataIse2[3], true);
        }
      });

    this.graficasInicioService
      .GetDataE1ms1Fecha(this.fechaEnMilisegAnterior, this.fechaEnMiliseg)
      .subscribe((res) => {
        if (res) {
          let fechas = res.data.fechas;
          let sensores = res.data.sensores;
          fechas.forEach((elemento, i) => {
            sensores.forEach((element, j) => {
              //console.log(elemento)
              var myDate = new Date(elemento);
              var result = myDate.getTime();
              this.dataE1ms1[j].push([result, element.mediciones[i]]);
            });
          });

          this.dataE1ms1[0].sort();
          this.dataE1ms1[1].sort();
          this.dataE1ms1[2].sort();
          this.dataE1ms1[3].sort();
          //console.log('Data ise1', this.dataIse1);
          this.Highcharts.charts[2].series[0].setData(this.dataE1ms1[0], true);
          this.Highcharts.charts[2].series[1].setData(this.dataE1ms1[1], true);
          this.Highcharts.charts[2].series[2].setData(this.dataE1ms1[2], true);
          this.Highcharts.charts[2].series[3].setData(this.dataE1ms1[3], true);
          //console.log('Data', this.data);
        }
      });
  }
}

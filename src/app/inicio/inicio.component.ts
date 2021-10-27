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
  timerOn = true;
  fechas = [];
  imagen: any;

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

  async ngOnInit() {
    this.graficasInicioService.GetImage(true).subscribe((res) => {
      this.createImageFromBlob(res);
    });

    this.graficasInicioService.GetDataIse1().subscribe((res) => {
      if (res) {
        console.log(res);
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
        console.log('Data', this.dataIse1);
        console.log(this.Highcharts.charts);
        this.Highcharts.charts[0].series[0].setData(this.dataIse1[0]);
        this.Highcharts.charts[0].series[1].setData(this.dataIse1[1]);
        this.Highcharts.charts[0].series[2].setData(this.dataIse1[2]);
        this.Highcharts.charts[0].series[3].setData(this.dataIse1[3]);
        this.Highcharts.charts[0].hideLoading();
        //console.log('Data', this.data);

        /*this.graficasInicioService.GetDataIse2().subscribe((res) => {
          if (res) {
            console.log(res);
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

            console.log(this.Highcharts.charts);
            this.Highcharts.charts[1].series[0].setData(this.dataIse2[0]);
            this.Highcharts.charts[1].series[1].setData(this.dataIse2[1]);
            this.Highcharts.charts[1].series[2].setData(this.dataIse2[2]);
            this.Highcharts.charts[1].series[3].setData(this.dataIse2[3]);
            this.Highcharts.charts[1].hideLoading();
            //console.log('Data', this.data);

            /*this.graficasInicioService.GetDataE1ms1().subscribe((res) => {
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
                console.log('Data', this.dataE1ms1);
                console.log(this.Highcharts.charts);

                this.Highcharts.charts[2].series[0].setData(this.dataE1ms1[0]);
                this.Highcharts.charts[2].series[1].setData(this.dataE1ms1[1]);
                this.Highcharts.charts[2].series[2].setData(this.dataE1ms1[2]);
                this.Highcharts.charts[2].series[3].setData(this.dataE1ms1[3]);
                this.Highcharts.charts[2].hideLoading();
                //console.log('Data', this.data);
                
              }
            });
          }
          
        });*/
      }
      this.myTimer = setInterval(() => this.requestData(), 5000);
    });
  }

  toggleTimer() {
    if (this.timerOn) {
      this.disabledInter();
    } else {
      this.enableInter();
    }
  }

  enableInter() {
    console.log('enableInter');
    this.timerOn = true;
    this.myTimer = setInterval(() => this.requestData(), 5000);
  }

  // clear setInterval
  disabledInter() {
    this.timerOn = false;
    console.log('DisableInter');
    clearTimeout(this.myTimer);
  }

  /**
   * Request data from the server, add it to the graph and set a timeout to request again
   */
  requestData() {
    let fechaEnMiliseg = Date.now();
    let fechaEnMilisegAnterior = fechaEnMiliseg - 300000;

    console.log(fechaEnMiliseg);
    console.log(fechaEnMilisegAnterior);

    this.graficasInicioService
      .GetDataIse1Fecha(fechaEnMilisegAnterior, fechaEnMiliseg)
      .subscribe((res) => {
        if (res) {
          //console.log(res)
          let fechas = res.data.fechas;
          let sensores = res.data.sensores;

          console.log('Fechas nuevas: ', fechas);
          console.log('Sensores nuevas: ', sensores);

          fechas.forEach((elemento, i) => {
            sensores.forEach((element, j) => {
              //console.log(elemento)
              var myDate = new Date(elemento);
              var result = myDate.getTime();
              this.dataIse1[j].push([result, element.mediciones[i]]);
            });
          });
          /*if (this.dataIse1.length > 86400) {
            for (let index = 0; index < this.dataIse1.length - 86400; index++) {
              this.dataIse1.shift();
            }
          }*/
          /* console.log('Data request ise1', this.dataIse1);
          console.log(this.Highcharts.charts);
          const series = this.Highcharts.charts[0].series[0],
          shift = series.data.length > 20; // shift if the series is longer than 20
          const series2 = this.Highcharts.charts[0].series[1],
          shift2 = series2.data.length > 20; // shift if the series is longer than 20
          const series3 = this.Highcharts.charts[0].series[2],
          shift3 = series3.data.length > 20; // shift if the series is longer than 20
          const series4 = this.Highcharts.charts[0].series[3],
          shift4 = series4.data.length > 20; // shift if the series is longer than 20*/
          this.dataIse1[0].sort();
          this.dataIse1[1].sort();
          this.dataIse1[2].sort();
          this.dataIse1[3].sort();
          console.log('Data ise1', this.dataIse1);
          this.Highcharts.charts[0].series[0].setData(this.dataIse1[0], true);
          this.Highcharts.charts[0].series[1].setData(this.dataIse1[1], true);
          this.Highcharts.charts[0].series[2].setData(this.dataIse1[2], true);
          this.Highcharts.charts[0].series[3].setData(this.dataIse1[3], true);
          this.Highcharts.charts[0].hideLoading();
          //console.log('Data', this.data);
        }
      });

    /*this.graficasInicioService
      .GetDataIse2Fecha(fechaEnMilisegAnterior, fechaEnMiliseg)
      .subscribe((res) => {
        if (res) {
          //console.log(res)
          let fechas = res.data.fechas;
          let sensores = res.data.sensores;
          fechas.forEach((elemento, i) => {
            sensores.forEach((element, j) => {
              var myDate = new Date(elemento.fecha);
              var result = myDate.getTime();
              this.dataIse1[j].push([result, element.mediciones[i]]);
            });
          });
          //console.log('Data', this.data);
          if (this.dataIse1.length > 86400) {
            for (let index = 0; index < this.dataIse1.length - 86400; index++) {
              this.dataIse1.shift();
            }
          }
          console.log('Data ise2', this.dataIse2);
          this.Highcharts.charts[1].series[0].setData(this.dataIse2[0], true);
          this.Highcharts.charts[1].series[1].setData(this.dataIse2[1], true);
          this.Highcharts.charts[1].series[2].setData(this.dataIse2[2], true);
          this.Highcharts.charts[1].series[3].setData(this.dataIse2[3], true);
          this.Highcharts.charts[1].hideLoading();
        }
      });*/

    /*this.graficasInicioService
      .GetDataE1ms1Fecha(fechaEnMilisegAnterior, fechaEnMiliseg)
      .subscribe((res) => {
        if (res) {
          let fechas = res.data.fechas;
          let sensores = res.data.sensores;
          fechas.forEach((elemento, i) => {
            sensores.forEach((element, j) => {
              var myDate = new Date(elemento.fecha);
              var result = myDate.getTime();
              this.dataIse1[j].push([result, element.mediciones[i]]);
            });
          });
          //console.log('Data', this.data);

          if (this.dataIse1.length > 86400) {
            for (let index = 0; index < this.dataIse1.length - 86400; index++) {
              this.dataIse1.shift();
            }
          }

          const series = this.Highcharts.charts[2].series[0],
            shift = series.data.length > 20; // shift if the series is longer than 20
            const series2 = this.Highcharts.charts[2].series[0],
            shift2 = series2.data.length > 20; // shift if the series is longer than 20
            const series3 = this.Highcharts.charts[2].series[0],
            shift3 = series3.data.length > 20; // shift if the series is longer than 20
            const series4 = this.Highcharts.charts[2].series[0],
            shift4 = series4.data.length > 20; // shift if the series is longer than 20

          console.log('Data ise2', this.dataE1ms1);
          this.Highcharts.charts[2].series[0].addPoint(this.dataIse1[0], true, shift);
          this.Highcharts.charts[2].series[1].addPoint(this.dataIse1[1], true, shift2);
          this.Highcharts.charts[2].series[2].addPoint(this.dataIse1[2], true, shift3);
          this.Highcharts.charts[2].series[3].addPoint(this.dataIse1[3], true, shift4);
          this.Highcharts.charts[2].hideLoading();
          //console.log('Data', this.data);
        }
      });*/
  }
}

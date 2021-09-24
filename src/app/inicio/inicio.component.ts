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
  dataIse1 = [[],[],[],[]];
  dataIse2 = [[],[],[],[]];
  dataE1ms1 = [[],[],[],[]];
  fechas = [];

  chartOptionsEstacion1 = {
    rangeSelector: {
      selected: 0,
    },

    title: {
      text: 'Estación ISE1_INFRA',
    },

    xAxis: {
      categories: this.fechas
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
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: 'Estación ISE2_INFRA',
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
    rangeSelector: {
      selected: 1,
    },

    title: {
      text: 'Estación E1MS1',
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

  async ngOnInit() {
    
    this.graficasInicioService.GetDataIse1().subscribe((res) => {
      if (res) {
        //console.log(res)
        res.data.forEach((elemento) => {
          elemento.sensores.map((e, i) => {
            var myDate = new Date(elemento.fecha);
            var result = myDate.getTime();
            this.dataIse1[i].push([result, e]);
          })
          
        });
        //console.log('Data', this.data);
          
          this.Highcharts.charts[0].series[0].setData(this.dataIse1[0]);
          this.Highcharts.charts[0].series[1].setData(this.dataIse1[1]);
          this.Highcharts.charts[0].series[2].setData(this.dataIse1[2]);
          this.Highcharts.charts[0].series[3].setData(this.dataIse1[3]);
          this.Highcharts.charts[0].hideLoading();
        //console.log('Data', this.data);
      }
    });

    this.graficasInicioService.GetDataIse2().subscribe((res) => {
      if (res) {
        //console.log(res)
        res.data.forEach((elemento) => {
          elemento.sensores.map((e, i) => {
            var myDate = new Date(elemento.fecha);
            var result = myDate.getTime();
            this.dataIse2[i].push([result, e]);
          })
          
        });
        //console.log('Data', this.data);
        
        
        this.Highcharts.charts[1].series[0].setData(this.dataIse2[0]);
        this.Highcharts.charts[1].series[1].setData(this.dataIse2[1]);
        this.Highcharts.charts[1].series[2].setData(this.dataIse2[2]);
        this.Highcharts.charts[1].series[3].setData(this.dataIse2[3]);
        this.Highcharts.charts[1].hideLoading();
        //console.log('Data', this.data);
      }
    });

    this.graficasInicioService.GetDataE1ms1().subscribe((res) => {
      if (res) {
        console.log(res)
        res.data.forEach((elemento) => {
          elemento.sensores.map((e, i) => {
            var myDate = new Date(elemento.fecha);
            var result = myDate.getTime();
            this.dataE1ms1[i].push([result, e]);
          })
          
        });
        //console.log('Data', this.data);
        
        
        
        this.Highcharts.charts[2].series[0].setData(this.dataE1ms1[0]);
        this.Highcharts.charts[2].series[1].setData(this.dataE1ms1[1]);
        this.Highcharts.charts[2].series[2].setData(this.dataE1ms1[2]);
        this.Highcharts.charts[2].series[3].setData(this.dataE1ms1[3]);
        this.Highcharts.charts[2].hideLoading();
        //console.log('Data', this.data);
      }
    });
    
    //this.requestData();
  }

  /**
   * Request data from the server, add it to the graph and set a timeout to request again
   */
  /*async requestData() {
    setInterval(async () => {
      const result = await fetch(
        'https://demo-live-data.highcharts.com/time-rows.json'
      );
      if (result.ok) {
        const res = await result.json();
        this.data = this.data.concat(res);
        this.Highcharts.charts.forEach(chart => {
         
          chart.series[0].setData(this.data);
        });
        console.log('Data', this.data);
      }
    }, 100000);
  }*/
}

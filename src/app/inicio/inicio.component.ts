import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})



export class InicioComponent implements OnInit {
  Highcharts = Highcharts;
  ohlc = [];
  volume = [];
  data = [];

  chartOptionsEstacion1 = {
    rangeSelector: {
      selected: 0,
    },

    title: {
      text: 'Estación ISE1_INFRA',
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
        data: this.data,
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 2',
        data: this.data.reverse(),
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
        data: this.data,
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 2',
        data: this.data.reverse(),
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
        data: this.data,
      },
      {
        id: 'aapl-volume',
        name: 'Sensor 2',
        data: this.data.reverse(),
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

  constructor() {}

  async ngOnInit() {
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
    this.requestData();
  }

  /**
   * Request data from the server, add it to the graph and set a timeout to request again
   */
  async requestData() {
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
  }
}

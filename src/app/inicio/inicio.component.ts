import { Component, VERSION, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);

import * as newdata from './data';

let chart; // global

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  public activity: any;
  public xData: any;
  public label: any;

  constructor() {
    this.activity = newdata.TimeChartData;
  }

  ngOnInit() {
    ['mousemove', 'touchmove', 'touchstart'].forEach((eventType) => {
      document.getElementById('container').addEventListener(eventType, (e) => {
        var chart, point, i, event;

        for (i = 0; i < Highcharts.charts.length; i = i + 1) {
          chart = Highcharts.charts[i];
          // Find coordinates within the chart
          event = chart.pointer.normalize(e);
          // Get the hovered point
          point = chart.series[0].searchPoint(event, true);

          if (point) {
            point.highlight(e);
          }
        }
      });
    });

    function syncExtremes(e) {
      var thisChart = this.chart;

      if (e.trigger !== 'syncExtremes') {
        // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
          if (chart !== thisChart) {
            if (chart.xAxis[0].setExtremes) {
              // It is null while updating
              chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                trigger: 'syncExtremes',
              });
            }
          }
        });
      }
    }

    Highcharts.Pointer.prototype.reset = function () {
      return undefined;
    };
    Highcharts.Point.prototype.select = function (event) {
      event = this.series.chart.pointer.normalize(event);
      this.onMouseOver(); // Show the hover marker
      this.series.chart.tooltip.refresh(this); // Show the tooltip
      this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };

    this.xData = this.activity.xData;
    let that = this;
    if (this.activity) {
      this.activity.datasets.forEach(function (dataset, i) {
        dataset.data = Highcharts.map(dataset.data, function (val, j) {
          return [that.xData[j], val];
        });
        console.log('dataset', dataset.data)
        var chartDiv = document.createElement('div');
        chartDiv.className = 'chart';
        document.getElementById('container').appendChild(chartDiv);

        chart = Highcharts.chart(chartDiv, {
          chart: {
            marginLeft: 40, // Keep all charts left aligned
            spacingTop: 20,
            spacingBottom: 20,
          },
          title: {
            text: dataset.name,
            align: 'left',
            margin: 0,
            x: 30,
          },
          credits: {
            enabled: false,
          },
          legend: {
            enabled: false,
          },
          xAxis: {
            crosshair: true,
            events: {
              setExtremes: syncExtremes,
            },
            labels: {
              format: '{value} km',
            },
          },
          yAxis: {
            title: {
              text: null,
            },
          },
          tooltip: {
            positioner: function () {
              return {
                // right aligned
                x: this.chart.chartWidth - 200,
                y: 10, // align to title
              };
            },
            borderWidth: 0,
            backgroundColor: 'none',
            pointFormat: '{point.y}',
            headerFormat: '',
            shadow: false,
            style: {
              fontSize: '20px',
            },
            valueDecimals: dataset.valueDecimals,
          },
          series: [
            {
              data: dataset.data,
              name: dataset.name,
              type: dataset.type,
              color: Highcharts.getOptions().colors[i],
              fillOpacity: 0.5,
              tooltip: {
                valueSuffix: ' ' + dataset.unit,
              },
            },
          ],
        });
      });
    }
    // this.requestData();
  }

//   async requestData() {
//     const result = await fetch('https://demo-live-data.highcharts.com/time-rows.json');
//     if (result.ok) {
//       const data = await result.json();
//       console.log(data);
//       const [date, value] = data[0];
//       const point = [new Date(date).getTime(), value * 10];
//       const series = chart.series[0],
//         shift = series.data.length > 20; // shift if the series is longer than 20
//       // add the point
//       chart.series[0].addPoint(point, true, shift);
//       // call it again after one second
//       setInterval(this.requestData, 1000);
//     }
//   }
}

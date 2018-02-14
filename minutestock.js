$(function stock(){
  var _chart;
  var selected = 'https://cdn.rawgit.com/highcharts/highcharts/v6.0.4/samples/data/new-intraday.json';

  $.getJSON(selected, function (data) {
    // split the data set into ohlc and volume
    var ohlc = [],
        volume = [],
        dataLength = data.length;

    for (i = 0; i < dataLength; i++) {
        ohlc.push([
            data[i][0], // the date
            data[i][1], // open
            data[i][2], // high
            data[i][3], // low
            data[i][4] // close
        ]);

        volume.push([
            data[i][0], // the date
            data[i][5] // the volume
        ])
    }
      // create the chart
      _chart = Highcharts.stockChart('container', {
          chart: {
            renderTo: 'container'
          },
          title: {
              text: 'AAPL stock price by minute'
          },
          rangeSelector: {
            selected: 4
          },
          scrollbar : {
    				enabled: false
    			},
          navigator: {
            enabled: false
          },
          yAxis: [{
              title: {
                  text: 'OHLC'
              },
              height: '60%',
              lineWidth: 2,
              resize: {
                  enabled: true
              },
          }, {
              labels: {
                  align: 'right',
                  x: -3
              },
              title: {
                  text: 'Volume'
              },
              top: '65%',
              height: '35%',
              offset: 0,
              lineWidth: 2
          }],
          legend: {
              enabled: false
          },
          credits: {
              enabled: false
          },
          plotOptions: {
              candlestick: {
              lineColor: 'black',
              // color: 'blue',
              upColor: 'red',
              upLineColor: 'black'
            },
              // shadow: true
              series: {
                  dataGrouping: {
                      enabled: true,
                      forced: true,
                      units: [ ['minute', [1]] ]
                  },
              }
          },
          rangeSelector: {
              buttons: [{
                  type: 'minute',
                  count: 1,
                  text: '1m'
              }, {
                  type: 'minute',
                  count: 5,
                  text: '5m'
              }, {
                  type: 'minute',
                  count: 30,
                  text: '30m'
              }, {
                  type: 'hour',
                  count: 1,
                  text: '1h'
              }, {
                  type: 'hour',
                  count: 5,
                  text: '5h'
              }, {
                  type: 'all',
                  text: 'All'
              }],
              selected: 3
          },

          series: [{
            type: 'candlestick',
              name: 'AAPL',
              id: 'aapl',
              data: ohlc,
              zIndex: 2
            }, {
                  type: 'column',
                  name: 'Volume',
                  data: volume,
                  yAxis: 1
            }, {
                type: 'sma',
                linkedTo: 'aapl',
                zIndex: 1,
                marker: {
                    enabled: false
                },
                dataGrouping: {
                  groupPixelWidth: 10
                }
              }, {
                  type: 'sma10',
                  linkedTo: 'aapl',
                  zIndex: 1,
                  marker: {
                      enabled: false
                  },
                  dataGrouping: {
                    groupPixelWidth: 10
                  }
              }, {
                  type: 'sma20',
                  linkedTo: 'aapl',
                  zIndex: 1,
                  marker: {
                      enabled: false
                  },
                  dataGrouping: {
                    groupPixelWidth: 10
                  }
              }, {
                  type: 'sma30',
                  linkedTo: 'aapl',
                  zIndex: 1,
                  marker: {
                      enabled: false
                  },
                  dataGrouping: {
                    groupPixelWidth: 10
                  }
              }, {
                  type: 'sma60',
                  linkedTo: 'aapl',
                  zIndex: 1,
                  marker: {
                      enabled: false
                  },
                  dataGrouping: {
                    groupPixelWidth: 10
                  }
          }]
      });
    });
    $('input[name=grouping]').change(function() {
        //http://api.highcharts.com/highstock#plotOptions.series.dataGrouping.units
        var unit = $(this).val();
        console.log(unit);
        // if(document.getElementsByClassName(btn btn-secondary).name){
        //
        // }
        if(document.getElementById('5m')){
          var unit = $(this).val();
          _chart.series.forEach(function(ser) {
              ser.update({
                  dataGrouping: {
                      units: [ [unit, [5]] ]
                  }
              }, false);
          });
          // _chart.redraw();
        }
        else if(document.getElementById('10m')){
          _chart.series.forEach(function(ser) {
              ser.update({
                  dataGrouping: {
                    approximation: sum,
                      units: [ [unit, [10]] ]
                  }
              }, false);
          });
          // _chart.redraw();
        }
        else if(document.getElementById('15m')){
          _chart.series.forEach(function(ser) {
              ser.update({
                  dataGrouping: {
                    approximation: sum,
                      units: [ [unit, [15]] ]
                  }
              }, false);
          });
          // _chart.redraw();
        }
        else if(document.getElementById('30m')){
          _chart.series.forEach(function(ser) {
              ser.update({
                  dataGrouping: {
                    approximation: sum,
                      units: [ [unit, [30]] ]
                  }
              }, false);
          });
          // _chart.redraw();
        }
        else {
          _chart.series.forEach(function(ser) {
              ser.update({
                  dataGrouping: {
                      units: [ [unit, [1]] ]
                  }
              }, false);
          });
          // _chart.redraw();
        }
        _chart.redraw();
    });
});

  var _chart;
  var selected = "http://61.72.187.6/attn/maker";

  $(function stock(){
    Highcharts.setOptions({
      global : {
          useUTC : false
        }
    });
    function requestData(){
      setInterval(function () {
        $.ajax({
            url: 'http://61.72.187.6/attn/maker',
            type: "GET",
            dataType: "json",
            async: false,
            success: function(data) {
              _chart.series[0].setData(data);
              console.log(data);
            },
            cache: false
        });
        console.log("ajax 호출");
      },5000)
    }
    $.getJSON(selected, function(data) {

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
      console.log("차트 데이터 저장");
      // create the chart
      // _chart = new Highcharts.StockChart({
      _chart = new Highcharts.StockChart({
          chart: {
            renderTo: 'container',
            events: {
              load: requestData
            }
          },
          title: {
            // text: 'AAPL Historical'
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
          xAxis: {
              type: 'datetime',
              tickPixelInterval: 150
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
                animation: false,
                  dataGrouping: {
                      enabled: true,
                      units: [ ['day', [1]] ]
                  },
              }
          },
          series: [{
              type: 'candlestick',
              name: 'AAPL',
              id: 'aapl',
              zIndex: 2,
              data: ohlc
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
                groupPixelWidth: 500
              }
          }, {
              type: 'sma10',
              linkedTo: 'aapl',
              zIndex: 1,
              marker: {
                  enabled: false
              },
              dataGrouping: {
                groupPixelWidth: 500
              }
          }, {
              type: 'sma15',
              linkedTo: 'aapl',
              zIndex: 1,
              marker: {
                  enabled: false
              },
              dataGrouping: {
                groupPixelWidth: 500
              }
          }, {
              type: 'sma30',
              linkedTo: 'aapl',
              zIndex: 1,
              marker: {
                  enabled: false
              },
              dataGrouping: {
                groupPixelWidth: 500
              }
          }, {
              type: 'sma60',
              linkedTo: 'aapl',
              zIndex: 1,
              marker: {
                  enabled: false
              },
              dataGrouping: {
                groupPixelWidth: 500
              }
          }]
      });
      console.log("차트그리기");
    });
  $(document).ready(function() {
    $('input[name=grouping]').change(function() {
        //http://api.highcharts.com/highstock#plotOptions.series.dataGrouping.units
        var unit = $(this).val();

    //http://api.highcharts.com/highstock#Series.update
        _chart.series.forEach(function(ser) {
            ser.update({
                dataGrouping: {
                    units: [ [unit, [1]] ]
                }
            }, true);
        });
        _chart.redraw();
      });
    });
});

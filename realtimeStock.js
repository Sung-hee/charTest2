var _chart;
var selected = "http://61.72.187.6/attn/maker";

// 파라메터 정보가 저장될 오브젝트
// common.js 같은 모든 페이지에서 로딩되는 js 파일에 넣어두면 됨.
var getParam = function(key){
    var _parammap = {};
    document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
        function decode(s) {
            return decodeURIComponent(s.split("+").join(" "));
        }

        _parammap[decode(arguments[1])] = decode(arguments[2]);
    });

    return _parammap[key];
};

var companycode = getParam("companycode");
console.log(companycode);

  $(function stock(){
    Highcharts.setOptions({
      global : {
          useUTC : false
        }
    });
    function requestData(){
      setInterval(function () {
        $.ajax({
            url: selected + "?companycode=" + companycode,
            type: "GET",
            dataType: "json",
            async: false,
            success: function(data) {
              // split the data set into ohlc and volume
              var volumeColor = '';
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
                  // if (i==0) {
                  //   volumeColor = '#CCCCCC';
                  // }
                  // else {
                    if (data[i][5] >= data[i-1][5]) {
                      volumeColor = '#FF0000';
                    }
                    else {
                      volumeColor = '#0000FF';
                    }
                  // }
                    volume.push({
                    x: data[i][0], // the date
                    y: data[i][5],
                    color: volumeColor
                  });
                    console.log(volume);
                  // volume.push([
                  //     data[i][0], // the date
                  //     data[i][5], // the volume
                  // ])
              }
              _chart.series[0].setData(ohlc);
              _chart.series[1].setData(volume);
              console.log(data);
              console.log(selected+"?companycode="+companycode);
            },
            cache: false
        });
        console.log("ajax 호출");
      },5000)
    }
    $.getJSON(selected + "?companycode=" + companycode, function(data) {

      // split the data set into ohlc and volume
      var volumeColor = '';
      var ohlc = [],
          volume = [],
          volumeColor = '',
          dataLength = data.length;

      for (i = 0; i < dataLength; i++) {
          ohlc.push([
              data[i][0], // the date
              data[i][1], // open
              data[i][2], // high
              data[i][3], // low
              data[i][4] // close
          ]);
          if (i==0) {
            volumeColor = '#CCCCCC';
          }
          else {
            if (data[i][5] >= data[i-1][5]) {
              volumeColor = '#FF0000';
            }
            else {
              volumeColor = '#0000FF';
            }
          }
            volume.push({
            x: data[i][0], // the date
            y: data[i][5],
            color: volumeColor
            });
            console.log(volume);
          // volume.push([
          //     data[i][0], // the date
          //     data[i][5], // the volume
          // ]);
          // volume.push({
          //   'x': data[i][0],
          //   'y': data[i][5],
          //   'color': colors[Math.floor(Math.random() * 2)+1]
          // });
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
            buttonTheme: {
              fill: 'none',
              stroke: 'none',
              'stroke-width': 0,
              width: 60,
              height: 30,
              r: 8,
              style: {
                  fontSize: "15px"
              }
            },
            selected: 0
          },
          scrollbar : {
    				enabled: false
    			},
          navigator: {
            enabled: false
          },
          xAxis: {
              type: 'datetime',
              height: '80%',
              tickPixelInterval: 150
          },
          yAxis: [{
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
              top: '65%',
              height: '15%',
              offset: 0,
              lineWidth: 2
          }],
          legend: {
              enabled: false
          },
          credits: {
              enabled: false
          },
          exporting: {
               enabled: false
          },
          plotOptions: {
              candlestick: {
              lineColor: 'black',
              // color: 'blue',
              upColor: 'red',
              upLineColor: 'black'
            },
            // column: {
            //   colorByPoint: true
            // },
              // shadow: true
              series: {
                // point: {
                //     events: {
                //         mouseOver: function () {
                //             var chart = this.series.chart;
                //             if (!chart.lbl) {
                //                 chart.lbl = chart.renderer.label('')
                //                     .attr({
                //                         padding: 10,
                //                         r: 10,
                //                         fill: Highcharts.getOptions().colors[1]
                //                     })
                //                     .css({
                //                         color: '#FFFFFF'
                //                     })
                //                     .add();
                //             }
                //             chart.lbl
                //                 .show()
                //                 .attr({
                //                     text: '시가: ' + this.open + ', 고가: ' + this.high + '저가: ' + this.low + ', 종가: ' + this.close
                //                 });
                //         }
                //     }
                // },
                // events: {
                //     mouseOut: function () {
                //         if (this.chart.lbl) {
                //             this.chart.lbl.hide();
                //         }
                //     }
                // },
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
              name: '거래량',
              data: volume,
              yAxis: 1,
              turboThreshold: Number.MAX_VALUE,
              dataGrouping: {
                      enabled: false
              }
          }, {
              type: 'sma',
              linkedTo: 'aapl',
              zIndex: 1,
              marker: {
                  enabled: false
              },
              dataGrouping: {
                groupPixelWidth: 500
              },
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
          }, {
              type: 'goldagg',
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
        var unit = $(this).val();

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

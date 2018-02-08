function chartmenu(test){
  var selected = "";
  var className = document.getElementsByClassName("dropdown-menu");
  console.log(className);

  console.log(selected);
  console.log(1);

  if(document.getElementById(test.id)){
    console.log(2);
    selected = document.getElementById(test.id).name
    console.log(selected);

    stock(selected);
    console.log(4);
  }

  console.log(5);
  console.log(selected);
  selected = null;
  console.log(selected);
}
function stock(selected){
  var _chart;
  console.log(3);
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

        // create the chart
        _chart = new Highcharts.StockChart({
            chart: {
              renderTo: 'container'
            },
            title: {
              text: 'AAPL Historical'
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
            legend: { },
            tooltip: {
                shared: true,
                crossHairs: true,
                useHTML: true
            },
            yAxis: [{
                labels: {
                  formatter: function () {
                      return (this.value > 0 ? ' + ' : '') + this.value + '%';
                  }
                },
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
                        units: [ ['day', [1]] ]
                    }
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
            // }, {
            //     type: 'sma',
            //     linkedTo: 'aapl',
            //     // zIndex: 1,
            //     marker: {
            //         enabled: false
            //     }
            }]
        });
        console.log(_chart);
    });


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
        console.log(_chart);
    });
  // $.getJSON(selected, function (data) {
  //     // split the data set into ohlc and volume
  //     var ohlc = [],
  //         volume = [],
  //         dataLength = data.length,
  //         // set the allowed units for data grouping
  //         groupingUnits = [[
  //             'week',                         // unit name
  //             [1]                             // allowed multiples
  //         ], [
  //             'month',
  //             [1, 2, 3, 4, 6]
  //         ]],
  //
  //         i = 0;
  //
  //     for (i; i < dataLength; i += 1) {
  //         ohlc.push([
  //             data[i][0], // the date
  //             data[i][1], // open
  //             data[i][2], // high
  //             data[i][3], // low
  //             data[i][4] // close
  //         ]);
  //
  //         volume.push([
  //             data[i][0], // the date
  //             data[i][5] // the volume
  //         ]);
  //     }
  //
  //
  //     // create the chart
  //     Highcharts.stockChart('container', {
  //
  //         rangeSelector: {
  //             selected: 2
  //         },
  //
  //         title: {
  //             text: selected
  //         },
  //
  //         subtilte: {
  //           text: 'With SMA and Volume by Price technical indicators'
  //         },
  //
  //         yAxis: [{
  //             labels: {
  //                 align: 'right',
  //                 x: -3
  //             },
  //             title: {
  //                 text: 'OHLC'
  //             },
  //             height: '60%',
  //             lineWidth: 2,
  //             resize: {
  //                 enabled: true
  //             }
  //         }, {
  //             labels: {
  //                 align: 'right',
  //                 x: -3
  //             },
  //             title: {
  //                 text: 'Volume'
  //             },
  //             top: '65%',
  //             height: '35%',
  //             offset: 0,
  //             lineWidth: 2
  //         }],
  //
  //         tooltip: {
  //             split: true
  //         },
  //
  //         plotOptions: {
  //           candlestick: {
  //           lineColor: 'black',
  //           // color: 'blue',
  //           upColor: 'red',
  //           upLineColor: 'black',
  //           // shadow: true
  //       },
  //             series: {
  //                 dataGrouping: {
  //                     units: groupingUnits,
  //
  //                 }
  //             }
  //         },
  //         series: [{
  //             type: 'candlestick',
  //             name: 'AAPL',
  //             id: 'aapl',
  //             zIndex: 2,
  //             data: ohlc
  //         }, {
  //             type: 'column',
  //             name: 'Volume',
  //             id: 'volume',
  //             data: volume,
  //             yAxis: 1
  //         }, {
  //             type: 'sma',
  //             linkedTo: 'aapl',
  //             zIndex: 1,
  //             marker: {
  //                 enabled: false
  //             }
  //         }, {
  //             type: 'sma10',
  //             linkedTo: 'aapl',
  //             zIndex: 1,
  //             marker: {
  //                 enabled: false
  //             }
  //         }, {
  //             type: 'sma20',
  //             linkedTo: 'aapl',
  //             zIndex: 1,
  //             marker: {
  //                 enabled: false
  //             }
  //         }, {
  //             type: 'sma30',
  //             linkedTo: 'aapl',
  //             zIndex: 1,
  //             marker: {
  //                 enabled: false
  //             }
  //         }, {
  //             type: 'sma60',
  //             linkedTo: 'aapl',
  //             zIndex: 1,
  //             marker: {
  //                 enabled: false
  //             }
  //         }]
  //     });
  // });
}

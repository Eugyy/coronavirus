//Change Active Tab on Buttons
function activaTab(tab){
    $('.nav-tabs button[tab]').tab(show);
}

//Load JSON FILE
var xhr = new XMLHttpRequest();
xhr.open('GET', 'coronaStats.json');
xhr.addEventListener('load', processJSON);
xhr.send();

// add comma to numbers in thousand


function processJSON(event) {
    var json = this.responseText;
    var obj = JSON.parse(json);
   // data object
    var myData = obj.data;
    // last update object
    var lastUpdate = myData.length - 1;
    var confirmedCases = myData[lastUpdate].totalCases;
    var recoveries = myData[lastUpdate].recoveries;
    var deaths = myData[lastUpdate].death;

    // Insert values in DOM

    $('#confirmedCases').text( confirmedCases );
    $('#recoveries').text( recoveries );
    $('#deaths').text( deaths );

    // Graph Data objects
    var arr = [];
    for (i = 0; i < myData.length; i++){

      var  dt = myData[i].date;
      arr.push(dt);

        
    }
    console.log(arr);


   
}

//Data Source
var chartData = {

    labels: ['1 May', '2 May', '3 May', '4 May', '5 May', '6 May',
    '7 May', '8 May'],

    datasets: [{
        data: [23,5,67,33,56,87,32,54,65,43,35,65,43],
        backgroundColor: '#3dc9c9',
        borderColor: '#3dc9c9',
        fill: false
    }]
};


//Data Source
var cummulativeData = {

    labels: ['2020-03-12', '2020-03-15', '2020-03-17', '2020-03-18', '2020-03-19', '2020-03-20',
    '2020-03-21', '2020-03-22', '2020-04-26', '2020-04-30', '2020-05-7', '2020-05-9', '2020-05-11',
    '2020-05-17', '2020-05-18'],

    datasets: [{
        data: [2,6,7,9,11,16,21,24,68,132,137,141,1550, 3091, 4700, 5127, 5638, 5735],
        backgroundColor: '#3dc9c9',
        borderColor: '#3dc9c9',
        fill: false
    }]
};


        //Counter animation
      
            //Daily Count


    /*Line chart*/

    var ctx = document.getElementById('myChart');

    var myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
   
        options: {
           scales: {
               yAxes: [{
                   gridLines: {
                       display: true
                   }
               }],
   
               xAxes: [{
                   gridLines: {
                       display: false
                   }
                   
               }]
           }
       }
   
    });

    // Switch to barChart
    document.getElementById('changeToBar').onclick =

function() {

    myChart.destroy();
    var ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                yAxes: [{
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }],
    
                xAxes: [{
                    gridLines: {
                        display: false
                    }
                    
                }]
            }
        }
    
    });
};

        //Switch to lineChart

    document.getElementById('changeToLine').onclick =

    function(){

        myChart.destroy();
        var ctx = document.getElementById('myChart');

        myChart = new Chart(ctx, {
            type: 'line',
            data: chartData,
       
            options: {
               scales: {
                   yAxes: [{
                       gridLines: {
                           display: true
                       }
                   }],
       
                   xAxes: [{
                       gridLines: {
                           display: false
                       }
                       
                   }]
               }
           }
       
        });
    };




    // Cases Over Time

/*Bar chart*/

var ctx = document.getElementById('newbarChart');


var newbarChart = new Chart(ctx, {
    type: 'line',
    data: cummulativeData,
    options: {
        scales: {
            yAxes: [{
                gridLines: {
                    display: false
                },
                ticks: {
                    beginAtZero: true
                }
            }],

            xAxes: [{
                gridLines: {
                    display: false
                }
                
            }]
        }
    }

});  





// Doughnut charts

// Create an inner text

/* Chart.pluginService.register({
    beforeDraw: function(chart) {
        var width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;

        ctx.restore();
        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + 'em sans-serif';
        ctx.textBaseline = 'middle';

        var text = '75%';
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();

    }
});  */

          /* Recovery Doghnut chart*/

          var ctx = document.getElementById('donotRecChart');
          var donotRecChart = new Chart(ctx, {
          
              type: 'doughnut',
              data: {
                  labels: ['Cases', 'Recovery'],
                  datasets: [{
                      label: 'Recovery rate',
                      backgroundColor: ['#e8e8e8', '#3e95cd'],
                      data: [5530, 674],
                      
                  }]
              },
              options: {
                  title: {
                      display: true
                  },
                  cutoutPercentage: 70
              }
          
          });
          
                  
          
          
                      /* Death Doghnut chart*/
          
          var ctx = document.getElementById('donotDeathChart');
          var donotDeathChart = new Chart(ctx, {
                      
              type: 'doughnut',
              data: {
                  labels: ['Cases', 'deaths'],
                  datasets: [{
                      label: 'Death rate',
                      backgroundColor: ['#e8e8e8', '#9c1010'],
                      data: [5530, 25]
                  }]
              },
              options: {
                  title: {
                      display: true
                  },
                  cutoutPercentage: 70,
              }
                      
          });
          
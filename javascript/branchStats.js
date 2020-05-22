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




//LOAD CORONASTATS JSON
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
    var severe = myData[lastUpdate].severe;
    var critical = myData[lastUpdate].critical;

    // Calculation for active cases
    var clearedCases = parseInt(recoveries, 10) + parseInt(deaths, 10);
    var activeCases = confirmedCases - clearedCases;

    // Calculation for mild cases
    var seriousCases = parseInt(severe, 10) + parseInt(critical, 10);
    var mild = activeCases - seriousCases;

    console.log(seriousCases);

    //Calculate percentage fuction
    function percentage(number, total){
        return((number/total) * 100).toFixed(1);
    }
    var recoveryRate = percentage(recoveries, confirmedCases);
    var deathRate = percentage(deaths, confirmedCases);

    // Days of this week

    var startOfWeek = moment().startOf('week');
    var endOfWeek = moment().endOf('week');
    var days = [];
    var day = startOfWeek;

    while (day <= endOfWeek){
        days.push(day.toDate().toDateString());
        day = day.clone().add(1, 'd');
    }

//     days.forEach(myFunction);
//    function myFunction(date){
//         moment(date).format('YYYY-MM-DD');
//     }

   var testDate = moment();  
   
    console.log(testDate.format('YYYY-MM-DD'));

    // Format thousand with comma
    function formatNum (num){
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }
    // Insert values in DOM

    $('#confirmedCases').text( formatNum(confirmedCases) );
    $('#recoveries').text( formatNum(recoveries) );
    $('#deaths').text( formatNum(deaths) );
    $('#recoveryRate').html(`${recoveryRate}% <br> of total cases`);
    $('#deathRate').html(`${deathRate}% <br> of total cases`);
    $('#activeCases').text(formatNum(activeCases));
    $('#mild').text(formatNum(mild));
    $('#critical').text(formatNum(critical));
    $('#severe').text(formatNum(severe));
    

    // All Date objects
    var allDates = [];
    var allCases = [];

    for (i = 0; i < myData.length; i++){

      var  dt = myData[i].date;
      allDates.push(dt); 
      var ac = myData[i].totalCases;
      allCases.push(ac);
    }
 

    
// Past 7 Days Dates

var lastSevenUpdates;
    lastSevenUpdates = myData.slice(-7);

var lastSevenDates = [];
var lastSevenCases = [];

for (i = 0; i < lastSevenUpdates.length; i++){

  var  lsd = lastSevenUpdates[i].date;
  lastSevenDates.push(lsd); 

  var  lsc = lastSevenUpdates[i].totalCases;
  lastSevenCases.push(lsc); 

}


// Active Cases Graph
$('#showActiveCasesGraph').click(function(){
    $('#activeCasesInfo').hide();
    $('#activeCasesGraph').toggle('swing');
    console.log('button clicked');
});

// Active cases INFO
$('#showActiveInfo').click(function(){
    $('#activeCasesGraph').hide();
    $('#activeCasesInfo').toggle('swing');
    console.log('button clicked');
});
   
// Chart for Active Cases
new Chart(document.getElementById("activeGraph"), {
    type: 'bar',
    data: {
      labels: ["Mild", "Severe", "Critical"],
      datasets: [
        {
          label: "Patients",
          backgroundColor: ["#39c0c4", "#fab800","#d80b0ba1"],
          data: [percentage(mild, activeCases), percentage(severe, activeCases), percentage(critical, activeCases)]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Seriousness of symptoms'
      },
      scales: {
        yAxes: [{
            gridLines: {
                display: false
            },
            ticks: {
                display: false
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

// Last Seven Updates Data Source
var chartData = {

    labels: lastSevenDates,

    datasets: [{
        data: lastSevenCases,
        backgroundColor: '#3dc9c9',
        borderColor: '#3dc9c9',
        fill: false
    }]
};


//Data Source
var cummulativeData = {

    labels: allDates,

    datasets: [{
        data: allCases,
        backgroundColor: '#3dc9c9',
        borderColor: '#3dc9c9',
        fill: false,

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
            title: {
                display: true
            },
            legend: {
                display: false
    
            },
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
                title: {
                    display: true
                },
                legend: {
                    display: false
        
                },
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
                title: {
                    display: true
                },
                legend: {
                    display: false
        
                },
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

ctx = document.getElementById('newbarChart');
    new Chart(ctx, {
    type: 'line',
    data: cummulativeData,
    options: {
        title: {
            display: true
        },
        legend: {
            display: false

        },
        elements: {
            point: {
                radius: 1,
            }
        }, 
        scales: {
            yAxes: [{
                gridLines: {
                    display: true
                },
                ticks: {
                    beginAtZero: false
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

          /* Recovery Doghnut chart*/

         ctx = document.getElementById('donotRecChart');
          var donotRecChart = new Chart(ctx, {
          
              type: 'doughnut',
              data: {
                  labels: ['Cases', 'Recovered'],
                  datasets: [{
                      label: 'Recovery rate',
                      backgroundColor: ['#e8e8e8', '#3dc9c9'],
                      data: [confirmedCases, recoveries],
                      
                  }]
              },
              options: {
                  title: {
                      display: true,
                      text: 'Recovery Rate',
                      fontFamily: "'Quicksand', sans-serif"
                  },
                  cutoutPercentage: 70
              }
          
          });
          
                  
          
          
                      /* Death Doghnut chart*/
          
          ctx = document.getElementById('donotDeathChart');
            new Chart(ctx, {
                      
              type: 'doughnut',
              data: {
                  labels: ['Cases', 'deaths'],
                  datasets: [{
                      label: 'Death rate',
                      backgroundColor: ['#e8e8e8', '#9c1010'],
                      data: [confirmedCases, deaths]
                  }]
              },
              options: {
                  title: {
                      display: true
                  },
                  cutoutPercentage: 70,
              }
                      
          });

        // end of document function
        }
          
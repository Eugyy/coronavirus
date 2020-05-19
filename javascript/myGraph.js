
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


/*Bar chart*/
document.getElementById('changeToBar').onclick =

function() {

    myChart.destroy();
    
    var myChart = new Chart(ctx, {
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
            data: [5530, 674]
        }]
    },
    options: {
        title: {
            display: true
        },
        cutoutPercentage: 70,
    }
            
});


            /* Bubble*/

/*Bar chart*/
var ctx = document.getElementById('newbarChart');


var newbarChart = new Chart(ctx, {
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

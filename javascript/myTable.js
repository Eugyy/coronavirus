
//Load JSON FILE
var xhr = new XMLHttpRequest();
xhr.open('GET', 'regionalStats.json');
xhr.addEventListener('load', processJSON);
xhr.send();



function processJSON(event){
    var json = this.responseText;
    var obj = JSON.parse(json);

    // data object
    var myData = obj.data;

    function dynamicSort(property, order){
        var sort_order = 1;
        if(order === "desc"){
            sort_order = -1;
        }
        return function (a, b){

            if(a[property] < b[property]){
                return -1 * sort_order;
            } else if(a[property] > b[property]){
                return 1 * sort_order;
            }else{
                return 0 * sort_order;
            }
        };
    }

    myData.sort(dynamicSort('cases', 'desc'));

    console.log(myData);


    //   // Format thousands with comma
    //   function formatNum (num){
    //     return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    // }

    // for(i=0; i < myData.length; i++ ){
    //     formatNum(myData[i].cases);
    // }
    // console.log(myData[1].cases);

     // Dynamic Table

     function loadTable(tableId, fields, data) {
        //$('#' + tableId).empty(); //not really necessary
        var rows = '';
        $.each(data, function(index, item) {
            var row = '<tr>';
            $.each(fields, function(index, field) {
                row += '<td>' + item[field+''] + '</td>';
            });
            rows += row + '<tr>'; 
        });
        $('#' + tableId).html(rows);
    }

    loadTable('data-table', ['region', 'cases'], myData);

} //end of function for REGIONALSTATS JSON

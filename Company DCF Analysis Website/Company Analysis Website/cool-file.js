/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log('hi');
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function filterFunction() {
  
  var ticker=document.getElementById("myInput").value;
  
      var url2="https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+ticker+"&apikey=SZMC3KV261PFYO72";

        
      var data;
        
       //for symbol names      
  $.ajax({
  type: 'GET',
  url: url2,
    mode: 'no-cors',
  contentType: 'application/json',
  dataType:'json',
  responseType:'application/json',
  xhrFields: {
    withCredentials: false
  },
 
  success: function(data) {
    console.log(data);
//    document.getElementById("a").innerHTML= "Name of Company"+"<br> <Br>"+data["bestMatches"]["0"]["2. name"]+"<br>"
    
    console.log(Object.keys(data["bestMatches"]).length )
    for(var i =0; i<= Object.keys(data["bestMatches"]).length ; i++){
  $('#myDropdown').append($('<a/>', { id: 'r' + i, 'class' : 'ansbox'}))
        
        var a=document.getElementById('r'+i).innerHTML=data["bestMatches"][i]["1. symbol"];
              
      
      //fucntion
      document.getElementById('r'+i).onclick= function(a){
              
       var a=document.getElementById("myInput").value;         
      var url="https://financialmodelingprep.com/api/financials/cash-flow-statement/"+a+"?datatype=json";
        
        var url2="https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+a+"&apikey=SZMC3KV261PFYO72";

        
      
        
       //for symbol names      
  $.ajax({
  type: 'GET',
  url: url2,
    mode: 'no-cors',
  contentType: 'application/json',
  dataType:'json',
  responseType:'application/json',
  xhrFields: {
    withCredentials: false
  },
 
  success: function(data) {
    console.log(data);
    document.getElementById("a").innerHTML= "Name of Company"+"<br> <Br>"+data["bestMatches"]["0"]["2. name"]+"<br>";
          console.log(Object.keys(data["bestMatches"]).length);

      
        

    
  },
  error: function(error) {
    console.log("FAIL....=================");
  }
});
        
       fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
      //console.log(data.AAPL["Net income"])

            document.getElementById("b").innerHTML= "2019 Net Income"+": "+"<br> <Br>"+"$"+data[ticker]["Net income"]["TTM"];
            //     document.getElementById("b").innerHTML= "2019 Net Income"+": "+"<br> <Br>"+data.AAPL["Net income"]["TTM"]



  })
  .catch(err => {
    // Do something for an error here
  })     
        
              
              
              
              }
                
                
                
                
                
                
                ;

}   

   


  },
  error: function(error) {
    console.log("FAIL....=================");
  }
});
  
  
   


  
  
  
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  var div = document.getElementById("myDropdown");
  a = div.getElementsByClassName("ansbox");
  for (i = 0; i < a.length; i++) {
   var txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}



function reset(){

document.getElementById("a").innerHTML=" ";
document.getElementById("b").innerHTML=" ";



}


function creatediv(){
  
  for(var i=0; i<Object.keys(data).length; i++){

   var divs = document.createElement("div");
  divs.id="input"+ i;
    var node = document.createTextNode("");
    divs.appendChild(node);
    var element = document.getElementById("div"+i);
    element.appendChild(divs);}



}

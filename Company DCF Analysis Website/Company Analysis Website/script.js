
//for dropdown menu to toggle on and off
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

//filter function that gives a list of companies based on user input
function filterFunction() {

  //ticker variable gained from user input
  var ticker=document.getElementById("myInput").value;
  //var url2="https://ticker-2e1ica8b9.now.sh/keyword/"+ticker
      //api that uses keywords to find a list of tickers that contain them
      var url2="https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+ticker+"&apikey=SZMC3KV261PFYO72";

  //ajax to gain access to the json data and manipulate it on html page
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
  //function to show data in tables
  success: function(data) {
    console.log(data);

    console.log(Object.keys(data["bestMatches"]).length )
    for(var i =0; i<= Object.keys(data["bestMatches"]).length ; i++){
  $('#myDropdown').append($('<a/>', { id: 'r' + i, 'class' : 'ansbox'}))

        var a=document.getElementById('r'+i).innerHTML=data["bestMatches"][i]["2. name"]+" Ticker: "+data["bestMatches"][i]["1. symbol"];





}   



  //catch error function that tells me if data is not retrieved
  },
  error: function(error) {
    console.log("FAIL....=================");
  }
});







  //filter aspect of function that only shows dropdown options of whatever data ajax retrieves
  //used W3HSchools to figure out filter
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

//function that resets for the comparables page
function resets(){


  for (var i=1;i<=10;i++){
    //makes sure first row is reset to input box and button
    document.getElementById("data"+i).innerHTML= "<input"+" id=ticker"+i +" placeholder="+"enter" + "&nbsp;"+"ticker"+ "&nbsp;" +"symbol"+">"+

      "<button class=submit onclick=submit("+i+");>"+
      "Submit"+
   " </button>"
    //makes sure all the other rows are reset as well
    document.getElementById("ni"+i).innerHTML= "";
        document.getElementById("cr"+i).innerHTML="";
    document.getElementById("pcf"+i).innerHTML= "";
    document.getElementById("cfb"+i).innerHTML= "";
    document.getElementById("cfc"+i).innerHTML= "";
    document.getElementById("at"+i).innerHTML= "";
    document.getElementById("roe"+i).innerHTML= "";
    //resets author name; used story book code 
  document.getElementById("comic-author").innerHTML="Your name here";


  //makes sure to hide all columns except for the company name
    document.getElementById("ni"+i).style.display="none";
        document.getElementById("cr"+i).style.display="none";
            document.getElementById("cr").style.display="none";
    document.getElementById("pcf"+i).style.display="none";
            document.getElementById("pcf").style.display="none";
    document.getElementById("cfb"+i).style.display="none";
            document.getElementById("cfb").style.display="none";
    document.getElementById("cfc"+i).style.display="none";
            document.getElementById("cfc").style.display="none";
    document.getElementById("at"+i).style.display="none";
            document.getElementById("at").style.display="none";
    document.getElementById("roe"+i).style.display="none";
            document.getElementById("roe").style.display="none";



        document.getElementById("ni0").style.display="none";


      }





}

//submit function for comparables page
 function submit(num){
      //converts input to string
      var str= document.getElementById("ticker"+num).value.toString();
      //converts string to uppercase letters
      var ticker1= str.toUpperCase(document.getElementById("ticker"+num).value);
   //takes user input for ticker symbol
var ticker=document.getElementById("ticker"+num).value;
//console.log(ticker1);
   
      //api to get cash flow statement data
      var url="https://financialmodelingprep.com/api/financials/cash-flow-statement/"+ticker+"?datatype=json";
        //api to filter out tickers
        var url2="https://ticker-2e1ica8b9.now.sh/keyword/"+ticker;
    //api to get company profile data
   var url3= "https://financialmodelingprep.com/api/company/profile/"+ticker+"?datatype=json";
   //api to get image of company
var url4="https://financialmodelingprep.com/images-New-jpg/"+ticker1+".jpg";
   //api to get financial ratios
var url5="https://financialmodelingprep.com/api/financial-ratios/"+ticker+"?datatype=json";


  //same as before
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
    document.getElementById("data"+(num)).innerHTML= data["0"]["name"];
          console.log(Object.keys(data["bestMatches"]).length);



  },
  error: function(error) {
    console.log("FAIL....=================");
  }
});

   
   //fetch function to retrieve data from url 1
       fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
      //console.log(data.AAPL["Net income"])
            //ads net income data to table
            document.getElementById("ni"+num).innerHTML= "$"+data[ticker]["Net income"]["TTM"];
            //     document.getElementById("b").innerHTML= "2019 Net Income"+": "+"<br> <Br>"+data.AAPL["Net income"]["TTM"]



  })
  .catch(err => {
    // Do something for an error here
  })     

   
      // same as the one above but gets data on company description
       fetch(url3)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
      //console.log(data.AAPL["Net income"])
console.log(data[ticker]["description"]);
         console.log(data[ticker]["image"]);

            document.getElementById("a").innerHTML= data[ticker]["description"];





  })
  .catch(err => {
    // Do something for an error here
  })    
   
       //same as before but gets financial ratios data for table
       fetch(url5)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
   
        //for loop to iterate every potential value to make sure that the right property is used or data will not be retrieved
        for(var i=1;i<=12;i++){ 
           //checks if id is empty and if the data is not null
        if( document.getElementById("cr"+num).innerHTML==="" && data["financialRatios"]["2018-0"+i]!=null && i<10){
        document.getElementById("cr"+num).innerHTML= data["financialRatios"]["2018-0"+i]["liquidityMeasurementRatios"]["currentRatio"];
         }
          //different formatting is required for numbers above 10
          else if(document.getElementById("cr"+num).innerHTML==="" && data["financialRatios"]["2018-"+i]!=null && i>10){
              document.getElementById("cr"+num).innerHTML= data["financialRatios"]["2018-"+i]["liquidityMeasurementRatios"]["currentRatio"];

        }}
         

         //same as above
         for(var i=1;i<=12;i++){ 
           
        if( document.getElementById("pcf"+num).innerHTML==="" && data["financialRatios"]["2018-0"+i]!=null && i<10){
         document.getElementById("pcf"+num).innerHTML= data["financialRatios"]["2018-0"+i]["investmentValuationRatios"]["priceCashFlowRatio"];
         }
          else if(document.getElementById("pcf"+num).innerHTML==="" && data["financialRatios"]["2018-"+i]!=null && i>10){
         document.getElementById("pcf"+num).innerHTML= data["financialRatios"]["2018-"+i]["investmentValuationRatios"]["priceCashFlowRatio"];

        }}
         
        for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("cfb"+num).innerHTML==="" && data["financialRatios"]["2018-0"+i]!=null && i<10){
         document.getElementById("cfb"+num).innerHTML= data["financialRatios"]["2018-0"+i]["debtRatios"]["cashFlowToDebtRatio"];
         }
          else if( document.getElementById("cfb"+num).innerHTML==="" && data["financialRatios"]["2018-"+i]!=null && i>10){
         document.getElementById("cfb"+num).innerHTML= data["financialRatios"]["2018-"+i]["debtRatios"]["cashFlowToDebtRatio"];

        }}
         
         
          for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("cfc"+num).innerHTML==="" && data["financialRatios"]["2018-0"+i]!=null && i<10){
         document.getElementById("cfc"+num).innerHTML= data["financialRatios"]["2018-0"+i]["cashFlowIndicatorRatios"]["cashFlowCoverageRatios"];
         }
          else if( document.getElementById("cfc"+num).innerHTML==="Francisco Changs" && data["financialRatios"]["2018-"+i]!=null && i>10){
         document.getElementById("cfc"+num).innerHTML= data["financialRatios"]["2018-"+i]["cashFlowIndicatorRatios"]["cashFlowCoverageRatios"];

        }}
         
          for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("at"+num).innerHTML==="" && data["financialRatios"]["2018-0"+i]!=null && i<10){
         document.getElementById("at"+num).innerHTML= data["financialRatios"]["2018-0"+i]["operatingPerformanceRatios"]["assetTurnover"];
         }
          else if( document.getElementById("at"+num).innerHTML==="" && data["financialRatios"]["2018-"+i]!=null && i>10){
         document.getElementById("at"+num).innerHTML= data["financialRatios"]["2018-"+i]["operatingPerformanceRatios"]["assetTurnover"];

        }} 
         
          for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("roe"+num).innerHTML==="" && data["financialRatios"]["2018-0"+i]!=null && i<10){
         document.getElementById("roe"+num).innerHTML= data["financialRatios"]["2018-0"+i]["profitabilityIndicatorRatios"]["returnOnEquity"];
         }
          else if( document.getElementById("roe"+num).innerHTML==="" && data["financialRatios"]["2018-"+i]!=null && i>10){
         document.getElementById("roe"+num).innerHTML= data["financialRatios"]["2018-"+i]["profitabilityIndicatorRatios"]["returnOnEquity"];

        }} 
  



  })
  .catch(err => {
    // Do something for an error here
  })     
   
      //uses id to show image on page 
       document.getElementById("img1").src=url4;
       //converts hidden tables to inline blocks
       document.getElementById("ni"+num).style.display="inline-block";
          document.getElementById("cr"+num).style.display="inline-block";
             document.getElementById("cr").style.display="inline-block";


       document.getElementById("ni0").style.display="inline-block";

   document.getElementById("pcf"+num).style.display="inline-block";
            document.getElementById("pcf").style.display="inline-block";
    document.getElementById("cfb"+num).style.display="inline-block";
            document.getElementById("cfb").style.display="inline-block";
    document.getElementById("cfc"+num).style.display="inline-block";
            document.getElementById("cfc").style.display="inline-block";
    document.getElementById("at"+num).style.display="inline-block";
            document.getElementById("at").style.display="inline-block";
    document.getElementById("roe"+num).style.display="inline-block";
            document.getElementById("roe").style.display="inline-block";

      }


//same as the above function but for balance sheet
 function submitBS(num){


var ticker=document.getElementById("ticker").value;
   //api to get json data on balance sheet
      var url="https://financialmodelingprep.com/api/financials/balance-sheet-statement/"+ticker+"?datatype=json";





      //fetch function to get balance sheet data
       fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
         
         //initialized variables to be used for other table rows
         var bs7,bs5,bs3,bs2,data1;

         //same as before
          for(var i=1;i<=12;i++){ 
           
        if( document.getElementById("bs7").innerHTML==="" && data[ticker]["Total assets"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs7").innerHTML= "$"+data[ticker]["Total assets"]["2018-0"+i];
          //variable is filled with json data to be used later
          bs7=data[ticker]["Total assets"]["2018-0"+i];;
         }
          else if( document.getElementById("bs7").innerHTML==="" && data[ticker]["Total assets"]["2018-"+i]!=null && i>10){
            document.getElementById("bs7").innerHTML= "$"+data[ticker]["Total assets"]["2018-"+i];
            bs7=data[ticker]["Total assets"]["2018-"+i];
        }} 
         
         
          for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs11").innerHTML==="" && data[ticker]["Total current liabilities"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs11").innerHTML= "$"+data[ticker]["Total current liabilities"]["2018-0"+i];
         }
          else if( document.getElementById("bs11").innerHTML==="" && data[ticker]["Total current liabilities"]["2018-"+i]!=null && i>10){
            document.getElementById("bs11").innerHTML= "$"+data[ticker]["Total current liabilities"]["2018-"+i];

        }} 
         
          for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs12").innerHTML==="" && data[ticker]["Long-term debt"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs12").innerHTML= "$"+data[ticker]["Long-term debt"]["2018-0"+i];
         }
          else if( document.getElementById("bs12").innerHTML==="" && data[ticker]["Long-term debt"]["2018-"+i]!=null && i>10){
            document.getElementById("bs12").innerHTML= "$"+data[ticker]["Long-term debt"]["2018-"+i];

        }} 
         
         
          for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs13").innerHTML==="" && data[ticker]["Common stock"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs13").innerHTML= "$"+data[ticker]["Common stock"]["2018-0"+i];
         }
          else if( document.getElementById("bs13").innerHTML==="" && data[ticker]["Common stock"]["2018-"+i]!=null && i>10){
            document.getElementById("bs13").innerHTML= "$"+data[ticker]["Common stock"]["2018-"+i];

        }}
         
          for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs14").innerHTML==="" && data[ticker]["Retained earnings"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs14").innerHTML= "$"+data[ticker]["Retained earnings"]["2018-0"+i];
         }
          else if( document.getElementById("bs14").innerHTML==="" && data[ticker]["Retained earnings"]["2018-"+i]!=null && i>10){
            document.getElementById("bs14").innerHTML= "$"+data[ticker]["Retained earnings"]["2018-"+i];

        }} 

           for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs15").innerHTML==="" && data[ticker]["Total liabilities and stockholders' equity"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs15").innerHTML= "$"+data[ticker]["Total liabilities and stockholders' equity"]["2018-0"+i];
         }
          else if( document.getElementById("bs15").innerHTML==="" && data[ticker]["Total liabilities and stockholders' equity"]["2018-"+i]!=null && i>10){
            document.getElementById("bs15").innerHTML= "$"+data[ticker]["Total liabilities and stockholders' equity"]["2018-"+i];

        }} 
         
            for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("data1").innerHTML==="" && data[ticker]["Cash and cash equivalents"]["2018-0"+i]!=null && i<10){
          document.getElementById("data1").innerHTML= "$"+data[ticker]["Cash and cash equivalents"]["2018-0"+i];
          data1=data[ticker]["Cash and cash equivalents"]["2018-0"+i];
         }
          else if( document.getElementById("data1").innerHTML==="" && data[ticker]["Cash and cash equivalents"]["2018-"+i]!=null && i>10){
          document.getElementById("data1").innerHTML= "$"+data[ticker]["Cash and cash equivalents"]["2018-"+i];
          data1=data[ticker]["Cash and cash equivalents"]["2018-"+i];

        }} 
         
           for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs2").innerHTML==="" && data[ticker]["Receivables"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs2").innerHTML= "$"+data[ticker]["Receivables"]["2018-0"+i];
          bs2=data[ticker]["Receivables"]["2018-0"+i];
         }
          else if( document.getElementById("bs2").innerHTML==="" && data[ticker]["Receivables"]["2018-"+i]!=null && i>10){
            document.getElementById("bs2").innerHTML= "$"+data[ticker]["Receivables"]["2018-"+i];
          bs2=data[ticker]["Receivables"]["2018-"+i];

        }} 
         
         
           for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs3").innerHTML==="" && data[ticker]["Inventories"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs3").innerHTML= "$"+data[ticker]["Inventories"]["2018-0"+i];
          bs3=data[ticker]["Inventories"]["2018-0"+i];
         }
          else if( document.getElementById("bs3").innerHTML==="" && data[ticker]["Inventories"]["2018-"+i]!=null && i>10){
            document.getElementById("bs3").innerHTML= "$"+data[ticker]["Inventories"]["2018-"+i];
        bs3=data[ticker]["Inventories"]["2018-"+i];


        }} 
         
         
          for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs5").innerHTML==="" && data[ticker]["Total current assets"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs5").innerHTML= "$"+data[ticker]["Total current assets"]["2018-0"+i];
          bs5=data[ticker]["Total current assets"]["2018-0"+i];
         }
          else if( document.getElementById("bs5").innerHTML==="" && data[ticker]["Total current assets"]["2018-"+i]!=null && i>10){
            document.getElementById("bs5").innerHTML= "$"+data[ticker]["Total current assets"]["2018-"+i];
          bs5=data[ticker]["Total current assets"]["2018-"+i];

        }} 
         
          
            //used to find out other current assets
           var a=bs5-bs3-bs2-data1;
         //used to find other assets
         var b=bs7-bs5;
            //adds value to other current assets row
            document.getElementById("bs4").innerHTML= a;
           //adds value to other assets row
           document.getElementById("bs6").innerHTML=b;




  })
  .catch(err => {
    // Do something for an error here
  })     





      }

//same as above but for cash flow
 function submitCF(num){


      var ticker=document.getElementById("ticker").value;
       //api to get json data from cash flow statement
      var url="https://financialmodelingprep.com/api/financials/cash-flow-statement/"+ticker+"?datatype=json";





    //fetch function to get cah flow data
       fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)

         
           //same as before
           for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("data1").innerHTML==="" && data[ticker]["Operating cash flow"]["2018-0"+i]!=null && i<10){
            document.getElementById("data1").innerHTML= "$"+data[ticker]["Operating cash flow"]["2018-0"+i];
         }
          else if( document.getElementById("data1").innerHTML==="" && data[ticker]["Operating cash flow"]["2018-"+i]!=null && i>10){
            document.getElementById("data1").innerHTML= "$"+data[ticker]["Operating cash flow"]["2018-"+i];


        }} 

         for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs2").innerHTML==="" && data[ticker]["Net cash used for investing activities"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs2").innerHTML= "$"+data[ticker]["Net cash used for investing activities"]["2018-0"+i];
         }
          else if( document.getElementById("bs2").innerHTML==="" && data[ticker]["Net cash used for investing activities"]["2018-"+i]!=null && i>10){
            document.getElementById("bs2").innerHTML= "$"+data[ticker]["Net cash used for investing activities"]["2018-"+i];


        }} 
         
           for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs3").innerHTML==="" && data[ticker]["Net cash provided by (used for) financing activities"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs3").innerHTML= "$"+data[ticker]["Net cash provided by (used for) financing activities"]["2018-0"+i];
         }
          else if( document.getElementById("bs3").innerHTML==="" && data[ticker]["Net cash provided by (used for) financing activities"]["2018-"+i]!=null && i>10){
            document.getElementById("bs3").innerHTML= "$"+data[ticker]["Net cash provided by (used for) financing activities"]["2018-"+i];


        }} 
         
             for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs4").innerHTML==="" && data[ticker]["Net change in cash"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs4").innerHTML= "$"+data[ticker]["Net change in cash"]["2018-0"+i];
         }
          else if( document.getElementById("bs4").innerHTML==="" && data[ticker]["Net change in cash"]["2018-"+i]!=null && i>10){
            document.getElementById("bs4").innerHTML= "$"+data[ticker]["Net change in cash"]["2018-"+i];


        }} 








  })
  .catch(err => {
    // Do something for an error here
  })     





      }


//same as the other submit but for income statement
function submitIS(num){


      var ticker=document.getElementById("ticker").value;
      //api to get json data on income statement
      var url="https://financialmodelingprep.com/api/financials/income-statement/"+ticker+"?datatype=json";





    //fetch function to get income statement data
       fetch(url)
  .then(response => {
    return response.json()
  })
  .then(data => {
    // Work with JSON data here
    console.log(data)
      //console.log(data.AAPL["Net income"])

          //variables initalized to be used to derive other rows
         var bs3, bs6, bs9;
               //same as before
              for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs9").innerHTML==="" && data[ticker]["Net income"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs9").innerHTML= "$"+data[ticker]["Net income"]["2018-0"+i];
          //variable filled to be used later
          bs9=data[ticker]["Net income"]["2018-0"+i];;
         }
          else if( document.getElementById("bs9").innerHTML==="" && data[ticker]["Net income"]["2018-"+i]!=null && i>10){
            document.getElementById("bs9").innerHTML= "$"+data[ticker]["Net income"]["2018-"+i];
          data[ticker]["Net income"]["2018-"+i];

        }} 
         
                

         
             for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("data1").innerHTML==="" && data[ticker]["Revenue"]["2018-0"+i]!=null && i<10){
           document.getElementById("data1").innerHTML= "$"+data[ticker]["Revenue"]["2018-0"+i];
         }
          else if( document.getElementById("data1").innerHTML==="" && data[ticker]["Revenue"]["2018-"+i]!=null && i>10){
           document.getElementById("data1").innerHTML= "$"+data[ticker]["Revenue"]["2018-"+i];


        }} 
         
           for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs2").innerHTML==="" && data[ticker]["Cost of revenue"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs2").innerHTML= "$"+data[ticker]["Cost of revenue"]["2018-0"+i];
         }
          else if( document.getElementById("bs2").innerHTML==="" && data[ticker]["Cost of revenue"]["2018-"+i]!=null && i>10){
            document.getElementById("bs2").innerHTML= "$"+data[ticker]["Cost of revenue"]["2018-0"+i];


        }} 
         
           for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs3").innerHTML==="" && data[ticker]["Operating income"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs3").innerHTML= "$"+data[ticker]["Operating income"]["2018-0"+i];
          bs3=data[ticker]["Operating income"]["2018-0"+i];;
         }
          else if( document.getElementById("bs3").innerHTML==="" && data[ticker]["Operating income"]["2018-"+i]!=null && i>10){
            document.getElementById("bs3").innerHTML= "$"+data[ticker]["Operating income"]["2018-"+i];
          bs3=data[ticker]["Operating income"]["2018-"+i];;

        }} 
         
            for(var i=1;i<=12;i++){ 
           
        if(document.getElementById("bs6").innerHTML==="" && data[ticker]["Interest Expense"]["2018-0"+i]!=null && i<10){
            document.getElementById("bs6").innerHTML= "$"+data[ticker]["Interest Expense"]["2018-0"+i];
          bs6=data[ticker]["Interest Expense"]["2018-0"+i];;
         }
          else if( document.getElementById("bs6").innerHTML==="" && data[ticker]["Interest Expense"]["2018-"+i]!=null && i>10){
            document.getElementById("bs6").innerHTML= "$"+data[ticker]["Interest Expense"]["2018-"+i];
          bs6=data[ticker]["Interest Expense"]["2018-"+i];


        }} 
    
         //EBT found
         var a=bs3-bs6;
         //Taxes found
         var b=bs9-a;
            document.getElementById("bs7").innerHTML= "$"+a;
            document.getElementById("bs8").innerHTML= "$"+b;








  })
  .catch(err => {
    // Do something for an error here
  })     





      }

//reset function for financial statements
function resetFS(){


  for (var i=2;i<=15;i++){

    //empties all tables
    document.getElementById("data1").innerHTML="";

    document.getElementById("bs"+i).innerHTML="";
    




      }





}

//reset for income statement because some rows are already empty
function resetIS(){


  for (var i=2;i<=15;i++){

    document.getElementById("data1").innerHTML="";

    document.getElementById("bs7").innerHTML="";
     document.getElementById("bs8").innerHTML="";
    document.getElementById("bs6").innerHTML="";
    document.getElementById("bs3").innerHTML="";
    document.getElementById("bs2").innerHTML="";
   document.getElementById("bs9").innerHTML="";



      }



}
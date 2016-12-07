         

//var char1 ={"name"}
var charityName = [];
var charityUnitNeed = [];

var queueFood = [];
var queueClothes = [];
var queueToys = [];
var proccessedCharity = [];
function companyPost(comp){
        //creates post to let charity knows that there's a donation to be picked up
        for(var i = 0; i < compName.length; i++)
        {
          if(compName[i] = comp[name])
            {
              compUnits[i] = comp[units];
              
            }
        }
        
        //
}
function processDonation(comp) {
        //grab top of
        var cat = comp[1];
        var units = comp[2];
        var currCharity;
        
        while(units > 0 )
        {
          //set correct queue
          if(cat == "Food")
          {
            currCharity = queueFood.shift();
          }
          else if(cat == "Clothes")
          {
            currCharity = queueClothes.shift();
          }
          else
          { //toys
            currCharity = queueToys.shift();
          }
          
          //assigns units to charity
          if(currCharity[2] <= units)
          {
            charityName.push(currCharity[0]);
            charityUnitNeed.push(currCharity[2]);
           // proccessedCharity.push(currCharity);
            console.log("processed: " + proccessedCharity[0]);
            units = units - currCharity[2];
            
          } else { //more need then units left
            var oldValue = currCharity[2];
            currCharity[2] = units;
            proccessedCharity.push(currCharity);
            
            //push charity back to top of queue
            currCharity[2] = oldValue - units;
            if(cat == "Food") {
               queueFood.unshift(currCharity);
            }
            else if(cat == "Clothes") {
              queueClothes.unshift(currCharity);
            }
            else {
              queueToys.unshift(currCharity);
            }
            
            units = 0;
          }
        }
        sendEmail(comp);
}


function sendEmail(comp){
    //email company
    var charityNames = "";
    for(var i = 0; i < charityName.length; i++)
    {
      if(i==0)
      {

       charityNames = charityName[i]; 
      }
      else{
        charityNames = charityNames + " , " +charityName[i];
      }
      var blob = new Blob([
      "Hello "+ charityName[i] + ", \n" +
      comp[0] + " has " + charityUnitNeed[i] + " units waiting for you at " + comp[3]]
      , {type: "text/plain;charset=utf-8"});

      saveAs(blob, charityName[i]+".txt");
    }
    charityName = [];
    charityUnitNeed = [];



    //email charities 
  
    //
    var blob = new Blob(["Hello " + comp[0] + ", \n"
    + "Your donations will be picked up by: " + charityNames
    ], {type: "text/plain;charset=utf-8"});
    
    saveAs(blob, comp[0]+".txt");
    
}



function charityListing(char){
        //adds charity request to queue
        console.log(char[0]);
        var cat = char[1];
        
        if (cat == "Food") 
        {
          queueFood.push(char);
        } else if (cat == "Clothes")
        {
          queueClothes.push(char);
        } else 
        {
          queueToys.push(char);
        }
}
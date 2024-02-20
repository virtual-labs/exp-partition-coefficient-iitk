//Your JavaScript goes in here
// // all assign variables


var mcylender = document.querySelector("#gcylinder")
var sol = document.querySelector("#solution")
var drp1 = document.querySelector("#drop1")

var btnl = document.querySelector("#beaker1_butanol")
var sol = document.querySelector("#solution")
var drp = document.querySelector("#drop")

var acid = document.querySelector("#acetic")
var wtr = document.querySelector("#water")
var mchn = document.querySelector("#machine")
var fsol = document.querySelector("#fsolution")
var fsol1 = document.querySelector("#fsolution1")
var fsol2 = document.querySelector("#fsolution2")
var keep = document.querySelector("#kippi")
var flask2 = document.querySelector("#flaskwithsol")
var flask1 = document.querySelector("#flask")
var machineUP = document.querySelector("#machineup")
var machine1 = document.querySelector("#machineup1")
var machine2 = document.querySelector("#machineup2")
var machineLP = document.querySelector("#machinelp")
var steps = document.querySelector("#step")
var powerbutton = document.querySelector("#powerbtn")
var speedbutton = document.querySelector("#speedbtn")
var rdng = document.querySelector("#reading")
var mxdsol = document.querySelector("#mixedsol")
var cnflask1 = document.querySelector("#conicalflaskE1")
var cnflask2 = document.querySelector("#conicalflaskE2")
var pippetf = document.querySelector("#pippet")
var orglayer = document.querySelector("#organiclayer")
var aqlayer  = document.querySelector("#aquaslayer")

// //  cylinder into flask


function pourcylinder() {
    if (f == 1) {
        
        steps.innerHTML = "click on Acidic Acide Beaker"
        mcylender.style.transform = "translate(-330%,-170%) rotate(-80deg)";
        sol.style.transform = "translate(-440%,-1000%) rotate(-80deg)";
        // setTimeout(rev,1000);
        setTimeout(function () { 
            drp1.style.visibility = "visible"
            drp1.style.transform = "translate(0%,180%)"
            sol.style.visibility = "hidden"
            setTimeout(function() {
                fsol.style.visibility = "visible"
            },800)
            
            
        }, 2000)
        f += 1
        setTimeout(function () {
            sol.style.visibility = "hidden";

        }, 1000);

        setTimeout(pourcylinderreverse, 3000);
        function pourcylinderreverse() {
            drp1.style.visibility = "hidden";
            gcylinder.style.transform = "translate(0%,0%) rotate(0deg)"
            sol.style.visibility = "hidden";
            sol.style.transform = "translate(0%,0%) rotate(0deg)"
        }

    }
    else if (f == 3) {
        /*mcylender.style.transform="translate(-130%,-30%) rotate(-60deg)"
        setTimeout( function rev(){
            
             gcylinder.style.transform="translate(0%,0%) rotate(0deg)"

    },1500);
       
        f+=1*/
        steps.innerHTML = "click Distilt Water Beaker"
        console.log("bye");
        mcylender.style.transform = "translate(-330%,-170%) rotate(-80deg)";
        sol.style.transform = "translate(-440%,-1000%) rotate(-80deg)";
        // setTimeout(rev,1000);
        setTimeout(function () {
            drp1.style.visibility = "visible";
            drp1.style.transform = "translate(0%,180%)"
            sol.style.visibility = "hidden";
            setTimeout(function() {
                fsol1.style.visibility = "visible"
            },1500)
            
        }, 1500)
        f += 1
        setTimeout(function () {
            sol.style.visibility = "hidden";

        }, 1500);

        setTimeout(pourcylinderreverse, 3000);
        function pourcylinderreverse() {
            drp1.style.visibility = "hidden";
            gcylinder.style.transform = "translate(0%,0%) rotate(0deg)"
            sol.style.visibility = "hidden";
            sol.style.transform = "translate(0%,0%) rotate(0deg)"


        }

    }
    else if (f == 5) {
        /*mcylender.style.transform="translate(-130%,-30%) rotate(-60deg)"
        setTimeout(rev,1500);
        function rev(){
            mcylender.style.transform="translate(0%,0%) rotate(0deg)"
        }
        f+=1*/
        console.log("bye");
        steps.innerHTML = "click on NEXT button"
        mcylender.style.transform = "translate(-330%,-170%) rotate(-80deg)";
        sol.style.transform = "translate(-440%,-1000%) rotate(-80deg)";
        // setTimeout(rev,1000);
        setTimeout(function () {
            drp1.style.visibility = "visible";
            drp1.style.transform = "translate(0%,80%)"
            sol.style.visibility = "hidden";
            setTimeout(function() {
                fsol2.style.visibility = "visible"
            },1000)
            

        }, 1500)
        f += 1
        setTimeout(function () {
            sol.style.visibility = "hidden";

        }, 1500);

        setTimeout(pourcylinderreverse, 3000);
        function pourcylinderreverse() {
            drp1.style.visibility = "hidden";
            gcylinder.style.transform = "translate(0%,0%) rotate(0deg)"
            sol.style.visibility = "hidden";
            sol.style.transform = "translate(0%,0%) rotate(0deg)"

        }

    }
}
console.log(f)


// beaker1 into cylinder





var f = 0
function butanol1() {
    if (f == 0) {
       
        steps.innerHTML = "click on graduated cylinder"
        btnl.style.transform = "translate(-40%,-100%) rotate(-60deg)"
        setTimeout(reverse, 1000);
        function reverse() {
            btnl.style.transform = "translate(0%,0%) rotate(0deg)"
           
        }

        setTimeout(function solution() {
            drp.style.visibility = "visible"
            drp.style.transform = " translate(0%,150%)"
            sol.style.visibility = "visible"
            
        }, 1200)

        setTimeout(function drop() {
            drp.style.visibility = "hidden"

        }, 1500)
        f += 1
    }

}


// beaker2 into cylinder

function acedic() {
    if (f == 2) {
        steps.innerHTML = "click on graduated cylinder"
        acid.style.transform = "translate(-150%,-90%) rotate(-50deg)"
        setTimeout(rev1, 1500);
        function rev1() {
            acid.style.transform = "translate(0%,0%) rotate(0deg)"

        }
        setTimeout(function solution() {
            sol.style.visibility = "visible"
            drp.style.visibility = "visible"
        }, 1200)

        setTimeout(function drop() {
            drp.style.visibility = "hidden"

        },1500)
        f += 1;
    }
}

//beaker3 into cylinder

function diswater() {
    if (f == 4) {
        steps.innerHTML = "click on graduated cylinder"
        wtr.style.transform = "translate(-260%,-110%) rotate(-50deg)"
        setTimeout(reva, 1500);
        function reva() {
            wtr.style.transform = "translate(0%,0%) rotate(0deg)"
        }
        setTimeout(function solution() {
            sol.style.visibility = "visible"
            drp.style.visibility = "visible"
        }, 1200)

        setTimeout(function drop() {
            drp.style.visibility = "hidden"

        }, 1500)
        f += 1
    }
}



function next() {
    if (f == 6) {
        
        steps.innerHTML = "Turn on Flask Shaker machine and shake it around 60 minuts"
        btnl.style.visibility = "hidden"
        mcylender.style.visibility = "hidden"
        acid.style.visibility = "hidden"
        wtr.style.visibility = "hidden"
        sol.style.visibility = "hidden"
        fsol.style.visibility = "hidden"
        fsol1.style.visibility = "hidden"
        fsol2.style.visibility = "hidden"
        flask1.style.visibility = "hidden"
        flask2.style.visibility = "visible"
        

      


        btnl.style.transitionDuration = "0s"
        mcylender.transitionDuration = "0s"
        wtr.style.transitionDuration = "0s"
        acid.style.transitionDuration = "0s"
        sol.style.transitionDuration = "0s"
        gcylinder.style.transitionDuration = "0s"
        flask1.style.transitionDuration = "0s"
        fsol2.style.transitionDuration = "0s"
        fsol1.style.transitionDuration = "0s"
        fsol.style.transitionDuration = "0s"
        
        
        setTimeout(function () {
            flask2.style.transform = "translate(0% ,-100%)"
            
            setTimeout(function (){
                flask2.style.transform = "translate(-290% ,-100%)"
            },1000)


            setTimeout(function(){
                // machineUP1.style.visibility = "hidden"
                // flask2.style.visibility = "hidden"

               setTimeout(function(){
                // machineUP.style.visibility = "visible"
               },900)

            },1000)
        }, 1000)


        f += 1
    }

}















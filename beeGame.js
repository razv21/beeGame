

//using a constructor
function CreateBee(type, numberOf, hp){
    this.type = type;
    this.numberOf = numberOf;
    this.hp = hp;
 }

 //creating new instances of bee object
 let queenBee = new CreateBee('queen', 1, 100);
 let workerBee = new CreateBee('worker', 5, 75);
 let droneBee = new CreateBee('drone', 8, 50);

 //putting all the bee object into an array
 let allBees = [queenBee, workerBee, droneBee];

//update the bees health and numbers accordingly
function updateStats(){
    document.getElementById("queenNo").innerHTML = queenBee.numberOf;
    document.getElementById("queenHealth").innerHTML = queenBee.hp;

    document.getElementById("workerNo").innerHTML = workerBee.numberOf;
    document.getElementById("workerHealth").innerHTML = workerBee.hp;

    document.getElementById("droneNo").innerHTML = droneBee.numberOf;
    document.getElementById("droneHealth").innerHTML = droneBee.hp;
}


function hit(beesGroup, localData){

    let selectedBee = beesGroup[Math.floor(Math.random() * beesGroup.length)];

    //TO DO create a method that incorporates the functionatilies of this switch
    switch(selectedBee.type){
        case 'queen':
            selectedBee.hp -= 8;
            if(selectedBee.hp < 1){
                alert("The queen is dead");
                localStorage.clear();
                if(localStorage.getItem('beeGame')){
                    localStorage.removeItem('beeGame');   
                }
              
                location.reload();
                window.history.forward(1);
                localStorage.clear();
                if(localStorage.getItem('beeGame')){
                    localStorage.removeItem('beeGame');   
                }
            }   
            break;
        case 'worker':
            selectedBee.hp -= 10;
            if( selectedBee.numberOf > 0){
                if(selectedBee.hp < 1){
                    --selectedBee.numberOf; 
                    selectedBee.hp = 75
                }
            }else{
                selectedBee.numberOf = 0;
                selectedBee.hp = 0;
            }
            break; 
        case 'drone':
            selectedBee.hp -= 12;
            if( selectedBee.numberOf > 0){
                if(selectedBee.hp < 1){
                    --selectedBee.numberOf; 
                    selectedBee.hp = 50
                }
            }else{
                selectedBee.numberOf = 0;
                selectedBee.hp = 0;
            }
            break;       
    }

    
    //Update stats on the screen
    updateStats();

    setState(beesGroup);

}


//Save state to localStorage
 var setState = function (dataToStore) {
	localStorage.setItem('beeGame', JSON.stringify(dataToStore));
};

/**
 * Get saved state from localStorage (if it exists)
 * @return {Object} The data, or an empty object
 */
var getState = function () {
	var saved = localStorage.getItem('beeGame');
	if (saved) {
		return JSON.parse(saved);
	}
	return {};
};

// Get the initial state on page load
var localData = getState();

// If session data already exists, display it instead of default values
//TO DO: continue the game with existing local data 
function checkForSessionData(myData){
    console.log(myData);
    if(Array.isArray(myData)){
        myData.forEach(function (bee) {
                switch(bee.type){
                    case 'queen':
                        if(bee.hp > 0){
                            document.getElementById("queenNo").innerHTML = bee.numberOf;
                            document.getElementById("queenHealth").innerHTML = bee.hp;
                        }
                        break;
                    case 'worker':
                        document.getElementById("workerNo").innerHTML = bee.numberOf;
                        document.getElementById("workerHealth").innerHTML = bee.hp;
                        break; 
                    case 'drone':
                        document.getElementById("droneNo").innerHTML = bee.numberOf;
                        document.getElementById("droneHealth").innerHTML = bee.hp;
                        break;       
                }
        });
    }    
}

//After the page is loaded, check if there is any saved local data
document.addEventListener('DOMContentLoaded', function() {
    checkForSessionData(localData);
 }, false);
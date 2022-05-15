function createGrids(){
    const grids=document.querySelector('.grids-container')
    grids.style.setProperty('--grid-rows',10)
    grids.style.setProperty('--grid-columns',10)
    let number=1
    let char=97  // declared outside forloop so that it increments
    for(let i = 1; i <=100; i++) {
        if(number==11){
            number=1
            char=char+1
        }
        let cell = document.createElement("div");
        cell.style.border = "1px solid black";
        let coordinate=String(String.fromCharCode(char).toUpperCase()+number)
        cell.id=coordinate
        cell.classList.add('grid-item');
        grids.appendChild(cell);
        number=number+1
        };
}
createGrids()








//<------------------------------Game Logic Here--------------------------->


function ship(battleship){//take in battleship as an array with each position having true(numbert hit) or false(hit)
    let sunk=false
    let ln=battleship.length
    const hit = (target) => {
        const index=findIndex(target,battleship)
        battleship[index].hit = true;
        return battleship
    }
    const isSunk= ()=>{// checks if all positions have been hit
        let count=0
        for(let i=0;i<ln;i++){
            if(battleship[i].hit==true){
                count=count+1
            }
        }
        if(count == ln){
            return true
        }
        else if (count != ln){
            return false
        }
    }
    return { battleship,ln, sunk, hit, isSunk }
}

//store ships in an array 

function gameboard(){
    let array = createArray()
    const receiveAttack = (target) => {
        let position=findIndex(target,array)
        if(array[position].block=="ocean"){
            let ln=array[position].length //to correlate with ship block
            //perform function to mark dom element in blue 
        }
        else if(array[position].block=="ship"){
            //findship and mark pos as red
        }
        return position
    }
    const warOver = ()=>{
        let status=false

    }
    return {receiveAttack}
}

function createShip(length,startChar,number){
    let i
    let array=[]
    for(i=0;i<length;i++){
        if(i>0){ startChar=String.fromCharCode((startChar.charCodeAt())+i)}
        let coordinate=String(startChar)+String(number)
        array[i]={pos:coordinate, hit:false, type:"ship"}
    }
    return array
}

function createArray(){//creates an array for the gameboard
    let h,i,j
    let array=[]
    let indexCounter=0
        for(i=97;i<=107;i++){
            let char=String.fromCharCode(i)
            char=char.toUpperCase()
            for(j=1;j<=10;j++){
                array[indexCounter]={pos: String(char)+String(j),hit:false, block:"ocean"}
                indexCounter=indexCounter+1
            }
        }
    return array
}

function findIndex(element,array){
    let ln= array.length
    for(let i=0;i<ln;i++){//searches array for matching element and returns its index
        if(array[i].pos == element){
            return i        //returns i as the index of the element found
        }
    }
}

function createPlayer(name){
    let points=0
    let wins=0
    let playerName=name
    return { playerName, wins, points }
}


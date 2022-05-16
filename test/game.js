function ship(battleship){//take in battleship as an array with each position having true(not hit) or false(hit)
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

function createShip(length,startChar,no){
    let i
    let array=[]
    for(i=0;i<length;i++){
        if(i>0){ startChar=String.fromCharCode((startChar.charCodeAt())+i)}
        let coordinate=String(startChar)+String(no)
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

function createPlayer(){
    let points=0
    let wins=0
    let name=name
    return { name, wins, points }
}

export  {ship, gameboard, createShip}

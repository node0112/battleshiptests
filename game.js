
let shipSelected=3







//<------------------------------Game Logic Here--------------------------->


function ship(battleship){//take in battleship as an gameboard1 with each position having true(numbert hit) or false(hit)
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

//store ships in an gameboard1 

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
    return {array}
}
let gameboard1=gameboard().array

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

function createArray(){//creates an gameboard1 for the gameboard
    let h,i,j
    let array=[]
    let indexCounter=0
        for(i=97;i<107;i++){
            let char=String.fromCharCode(i)
            char=char.toUpperCase()
            for(j=1;j<=10;j++){
                array[indexCounter]={pos: String(char)+String(j),hit:false, block:"ocean"}
                indexCounter=indexCounter+1
            }
        }
    return array
}

function findIndex(element,arr){
    let ln= arr.length
    for(let i=0;i<ln;i++){//searches gameboard1 for matching element and returns its index
        if(arr[i].pos == element){
            return i        //returns i as the index of the element found
        }
    }
}
function findElement(coordinate,array,term){
    let index=findIndex(coordinate,array)
    if(term=="block"){return array[index].block}
    if(term=="hit"){return array[index].hit}
}

function createPlayer(name){
    let points=0
    let wins=0
    let playerName=name
    return { playerName, wins, points }
}

//<-----------------DAOM LOGIC HERRE---------------------->


function createGrids(array){
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
        let block=findElement(coordinate,array)
        cell.addEventListener("mouseover",()=>{
            highlightGrids(cell.id,shipSelected,array)
        })
        cell.addEventListener('click', ()=>{
            updateGame(array,cell.id,shipSelected)})
        if(block=="ocean"){
           cell.style.backgroundColor="#779ECB"
        }
        grids.appendChild(cell);
        number=number+1
        };
}
createGrids(gameboard1)

function refreshGrid(array){ // must be passed direct array value
    items=document.querySelectorAll('.grid-item')
    items.forEach(item => {
        item.removeEventListener("click",function(){})
        let id=item.id
        let block=findElement(id,array,"block")
        if(block=="ocean"){
            item.style.backgroundColor="#779ECB"
        }
        else if(block=="ship"){
             console.log(block)
            item.style.backgroundColor="tomato"
        }
    })
}

function updateGame(array,id,shipSelected){
    let index=findIndex(id,array)
    for(let i=0;i<shipSelected;i++){
        array[index].block="ship"
        console.log(array[index].block)
        index=index+1
    }
    refreshGrid(array)
}
function highlightGrids(id,shipSelected,array){
    let number=parseInt(id.charAt(1))
    let char=id.charAt(0)
    let coordinate=String.fromCharCode
    let firstgrid=document.getElementById(coordinate)
    refreshGrid(array)
    for(let i=0;i<shipSelected;i++){//highlights grids with apppropriate colors by verifying status from gameboard array
        let coordinate=String(char+number)
        let block=findElement(coordinate,array,"block")
        let hit=findElement(coordinate,array,"hit")
        let cell=document.getElementById(coordinate)
        if(block=="ocean"){
        cell.style.backgroundColor="tomato"
        }
        number=number+1
    }
}

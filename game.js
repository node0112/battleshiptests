
let shipSelected=5
let times=1
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

function createArray(){//creates a gameboard1 for the gameboard
    let i,j
    let array=[]
    let indexCounter=0
        for(i=97;i<107;i++){
            let char=String.fromCharCode(i)
            char=char.toUpperCase()
            for(j=1;j<=10;j++){
                array[indexCounter]={pos: String(char)+String(j),hit:false, block:"ocean",status:"enabled"}
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
    if(term=="status"){return array[index].status}
}

function createPlayer(name){
    let points=0
    let wins=0
    let playerName=name
    return { playerName, wins, points }
}

//<-----------------DOM LOGIC HERRE---------------------->

let start=document.querySelector('.start-button')
let selected=false

const btns=document.querySelectorAll('.btn')

btns.forEach(btn =>{
    btn.addEventListener("click",()=>{
        selected=(btn.textContent).toLocaleLowerCase()
        btn.style.backgroundColor="white"
        setTimeout(()=>{
            btn.style.backgroundColor="yellowgreen"
        },400)
        
    })
})

function checkPlayerInput(player){
    let playerElement
    if(player=="player1"){
        if(document.querySelector('.player1-name').value=='' || selected==false){
            return false
        }
    }
    if(player=="player2"){
        if(selected!=false){
        if(selected=="human"){
            if(document.querySelector('.player1-name').value=='' || selected==false){
                return false
            }
        }
        if(selected=="computer"){
            return true
        }
    }
    }
}

start.addEventListener("click",()=>{
    if(checkPlayerInput("player1")==false || checkPlayerInput("player1")==false){
        alert("Please Make Sure Everything Is Selected")
    }
})
function createGrids(array){
    const grids=document.querySelector('.grids-container')
    grids.style.setProperty('--grid-rows',10)
    grids.style.setProperty('--grid-columns',10)
    let number=1
    let char=97  // declared outside forloop so that it increments
    for(let i = 0; i <=99; i++) {
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
            let index=findIndex(cell.id,array)
            if(array[index].status!="disabled" && array[index].block!="ship"){
                highlightGrids(cell.id,shipSelected,array)
            }
            else{refreshGrid(array)}
        })
        cell.addEventListener('click', ()=>{
            let number=parseInt((cell.id).charAt(1))
            let char=(cell.id).charAt(0)
            if(number==1){
                if(parseInt((cell.id).charAt(2))==0){
                    number=10
                }
            }
            let addition=number+shipSelected
            if(addition<=11){
                let isDisabled=checkPos(array,char,number)
                if(isDisabled==false){
                    updateGame(array,cell.id,shipSelected)
            }
            }
        }
        )
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
        let status=findElement(id,array,"status")
        if(block=="ocean"){
            item.style.backgroundColor="#779ECB"
        }
        else if(block=="ship"){
            item.style.backgroundColor="tomato"
        }
        if(status=="disabled" && block=="ocean"){
            item.style.backgroundColor="darkgrey"
        }
    })
}

function updateGame(array,id,shipSelected){//updates game-array and refreshes grid to show placed ships
    let index=findIndex(id,array)
    if(array[index].status!="disabled"){
    let number=parseInt(id.charAt(1))
    if(number==1){
        if(parseInt(id.charAt(2))==0){
            number=10
        }
    }
    let char=id.charAt(0)
    let startBlock=number-1
    let endBlock=number+shipSelected
    if(startBlock<1){startBlock=0}
    if(endBlock==11){endBlock=10}
    for(let i=0;i<shipSelected;i++){
        let status=array[index].status
        if(status=="enabled"){
            array[index].block="ship"
            array[index].status="disabled"
            index=index+1
        }
    }
    disableBlocks(startBlock,endBlock,char,array)
    updateShip(array)
    refreshGrid(array)
}
}
function disableBlocks(start,end,char,array){
    let i
    let ln=end
    if(start==0){i=1}
    else{i=start}
    console.log(start)
    let charAbv=false
    let charBelow=false
    if(char!="A"){charAbv=String.fromCharCode(char.charCodeAt()-1)}
    if(char!="J"){charBelow=String.fromCharCode(char.charCodeAt()+1)}
    if(start>0){array[findIndex(String(char+start),array)].status="disabled"}
    if(end<10){array[findIndex(String(char+end),array)].status="disabled"}//for start and end of current grids in the same line as the ship
    console.log(end)
    for(i;i<=ln;i++){
        if(charAbv != false){
            let upperCoordinate=String(charAbv+i)
            array[findIndex(upperCoordinate,array)].status="disabled"
        }
        if(charBelow != false){
            let lowerCoordinate=String(charBelow+i)
            array[findIndex(lowerCoordinate,array)].status="disabled"
        }
    }
}
function updateShip(array){
    if(shipSelected==5 || shipSelected==4 || shipSelected==3){
        shipSelected=shipSelected-1
        if(shipSelected==4){
            document.querySelector('#battleship').style.color="yellowgreen"
        }
        if(shipSelected==3){
            document.querySelector('#cruiser').style.color="yellowgreen"
        }
        if(shipSelected==2){
            document.querySelector('#submarine').style.color="yellowgreen"
        }
    }
    if(shipSelected==2 && times<=2){
        times=times+1
        shipSelected=2
    }
    else if(shipSelected==2 && times==3){
        shipSelected=1
        times=1
        document.querySelector('#destroyer').style.color="yellowgreen"
    }
    if(shipSelected==1 && times<=2){
        times=times+1
    }
    else if(shipSelected==1 && times==3){
        shipSelected=5
        times=1
        document.querySelector('.continue-btn').style.color="#779ECB"
        endArray(array)
        //function to move on to next step
    }
}
function endArray(array){
    let ln=array.length
    for(i=0;i<ln;i++){
        element=array[i]
        if(element.block=="ocean" && element.status=="enabled"){
            element.status="disabled"
        }
    }
}
function highlightGrids(id,shipSelected,array){
    let number=parseInt(id.charAt(1))
    if(number==1){
        if(parseInt(id.charAt(2))==0){
            number=10
        }
    }
    let char=id.charAt(0)
    refreshGrid(array)
    if(number+shipSelected>11){
        for(let i=number;i<11;i++){
            let no=number
            let coordinate=String(char+i)
            let cell=document.getElementById(coordinate)
            cell.style.backgroundColor="#292929"
            no=no+1
        }
    }
    if(number+shipSelected<12){//only allows to highlight grids if they are witihin the grid
        let isDisabled=checkPos(array,char,number)// checks if grid is not in the boundary of another ship
        if(isDisabled==false){
            let no=number
        for(let i=0;i<shipSelected;i++){//highlights grids with apppropriate colors by verifying status from gameboard array
            let coordinate=String(char+no)
            let block=findElement(coordinate,array,"block")
            let status=findElement(coordinate,array,"status")
            let cell=document.getElementById(coordinate)
            if(block=="ocean" && status!="disabled"){
            cell.style.backgroundColor="tomato"
            }
            if(status=="disabled" || block=="ship"){
                cell.style.cursor="not-allowed"
            }
            no=no+1
        }}
        else{ 
            let no=number
            for(let i=0;i<shipSelected;i++){
                let coordinate=String(char+no)
                let cell=document.getElementById(coordinate)
                cell.style.backgroundColor="#292929"
                no=no+1
            }
        }
    }
}

function checkPos(array,char,number){
    let no=number
    let disabled=0 //if greater than one then selected grid is in the boundary of another ship
    for(let i=0;i<shipSelected;i++){
        let coordinate=String(char+no)
        let status=findElement(coordinate,array,"status")
        if(status=="disabled"){
            disabled=disabled+1
        }
        no=no+1
    }
    if(disabled==0){
        return false
    }
    else if(disabled>0){
        return true
    }
}

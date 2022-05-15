import {ship} from "./game";
import {gameboard} from "./game"
import {createShip} from "./game"

let ship1=[{pos:"A1", hit:false, type:"ship"},{pos: "B1", hit: false, type:"ship"}]
let ship2=[{pos:"C1", hit:true, type:"ship"},{pos: "C2", hit: false, type:"ship"},{pos:"C3", hit:false, type:"ship"}]
let ship3=[{pos:"D1", hit:true, type:"ship"},{pos: "D2", hit: true, type:"ship"},{pos:"D3", hit:true, type:"ship"},{pos: "D4", hit: true, type:"ship"}]

let gameboardArray = createArray()
function createArray(){
    let h,i,j
    let array=[]
        for(i=97;i<=107;i++){
            let char=String.fromCharCode(i)
            char=char.toUpperCase()
            for(j=0;j<=10;j++){
                array[107-i]={pos: String(char)+String(j),hit:false, type:"ocean"}
            }
        }
    return array
}

test("tests if ship is sunk using the isSunk() function", ()=>{
    expect(ship(ship3).isSunk()).toBe(true)
})

test("Takes hit on ship2's 2nd block(C2) becomes true using the hit() function",() => {
    expect(ship(ship2).hit("C2")).toEqual([{pos:"C1", hit:true, type:"ship"},{pos: "C2", hit: true, type:"ship"},{pos:"C3", hit:false, type:"ship"}])
})

test("Recieves index of targeted block", () => {
    expect(gameboard().receiveAttack("J10")).toEqual(99)
})

test("New ship array equals to ship1",()=>{
    expect(createShip(2,'A',1)).toEqual(ship1)
})


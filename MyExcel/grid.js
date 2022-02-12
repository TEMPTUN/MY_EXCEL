// this portion helps us to create column ,rows and grid dynamically,as it will be very hectic to create 100 rows ,cols manually.
let rows = 100;
let cols = 26;

let addressColCont = document.querySelector(".address-col-cont");
//for generating first row
for(let i=0;i<rows;i++){
    let addressCol = document.createElement("div"); //creating a div
    addressCol.setAttribute("class","address-col"); //adding classes
    addressCol.innerText = i+1;
    addressColCont.appendChild(addressCol); // appending created div to main div.
}


//for creating first column
let addressRowCont= document.querySelector(".address-row-cont");
for(let i=0;i<cols;i++){   
    let addressrow = document.createElement("div");//creating a div
    addressrow.setAttribute("class","address-row");//adding classes
    addressrow.innerText =  String.fromCharCode(65+i);   //for get alphbets series we use function  String.fromCharCode() ,which convert ascii value to character
    addressRowCont.appendChild(addressrow);  // appending created div to main div.
}

//for generating cell inside grid...
let cellCont = document.querySelector(".cells-cont");
for(let i=0;i<100;i++){
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0;j<26;j++){
        let cell = document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        cell.setAttribute("spellcheck","false");
        //for cell amd storage identification.
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        rowCont.appendChild(cell);
        addListenerForAddressBarDisplay(cell,i,j);
    }
    cellCont.appendChild(rowCont);
}



//for getting unique address for every cell
let addressBar = document.querySelector(".address-bar");
function addListenerForAddressBarDisplay(cell,i,j){
    cell.addEventListener("click",(e)=>{
        let rowID = i+1;
        let colId = String.fromCharCode(65+j);
        addressBar.value =`${colId}${rowID}`;
    })
}

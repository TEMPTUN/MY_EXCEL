let sheetFolderCont = document.querySelector(".sheets-folder-cont");
let sheetBtn = document.querySelector(".sheet-add-icon")
sheetBtn.addEventListener("click",(e)=>{
    let sheet = document.createElement("div");
    sheet.setAttribute("class","sheet-folder");
    
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    sheet.setAttribute("id",allSheetFolder.length);  //zero base indexing pattern
    
    sheet.innerHTML =`<div class="sheet-content">Sheet${allSheetFolder.length+1}</div>`;
    sheetFolderCont.appendChild(sheet);
    sheet.scrollIntoView();
    //DB
    createSheetDB();
    createGraphComponentMatrix();
    handleSheetActiveness(sheet);
    handleSheetRemoval(sheet);
    sheet.click();
});

function createSheetDB(){

    let sheetDB =[];// a 2-d matrix where we are storing information about every cell in form of object..
    for(let i=0;i<rows;i++){
        let sheetROw=[];
        for(let j=0;j<cols;j++){
            let cellProp = {    /* cell properties*/
                bold: false,
                italic: false,
                underline: false,
                alignment: "Left",
                fontFamily: "monospace",
                fontSize :"14",
                fontColor:  "#000000",
                BGcolor: "#000000",  //Just for indication function
                value : " ",   //value present in cell
                formula:" ",  //formula used to construct the cell (store in string format)
                children: [],   //for dependency aspect ()
            }
            sheetROw.push(cellProp);
        }
        sheetDB.push(sheetROw);
    }
    collectedSheetDB.push(sheetDB);
}

function createGraphComponentMatrix(){
    let graphComponentMatrix =[];
    for(let i=0;i<rows;i++){
        let row = [];
        for(let j=0;j<cols;j++){
            row.push([]); //Why Array -> To store a child in form of[i,j]/[rowId,colId] we use array
        }
        graphComponentMatrix.push(row);
    }
    collectedGraphComponentMatrix.push(graphComponentMatrix);
}


function handleSheetActiveness(sheet){
    sheet.addEventListener("click",(e)=>{
        let idxInSheetDB = Number(sheet.getAttribute("id"));    
        handleSheetDb(idxInSheetDB);
        handleSheetProperties();
        handleSheetUI(sheet);
    })
}

function handleSheetDb(idx){
    sheetDB = collectedSheetDB[idx];
    graphComponentMatrix = collectedGraphComponentMatrix[idx];
    handleSheetProperties();
}   

function handleSheetProperties(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
            cell.click();
        }
    }

    //By default click on first cell via DOM
    let firstCell = document.querySelector(".cell");  //gives access of first div cell..
    firstCell.click();
}


function handleSheetUI(sheet){
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolder.length;i++){
        allSheetFolder[i].style.backgroundColor = "transparent";
    }
    sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetRemoval(sheet){
    sheet.addEventListener("mousedown",(e)=>{
        if(e.button!=2) return;
        let allSheetFolder = document.querySelectorAll(".sheet-folder");
        if(allSheetFolder.length==1){
            alert("You need to have atleast one sheet");
            return;
        }
        let response = confirm("Your sheet will be removed parmanently. Are you sure?");
        if(response) {
            let sheetIdx = Number(sheet.getAttribute("id"));
            collectedSheetDB.splice(sheetIdx,1);
            collectedGraphComponentMatrix.splice(sheetIdx,1);
            handleSheetUIRemoval(sheet);

            //By default bring sheet1 in active...
            sheetDB = collectedSheetDB[0];
            graphComponentMatrix = collectedGraphComponentMatrix[0];
            handleSheetProperties();
        }else{
            return;
        }
    })
}

function handleSheetUIRemoval(sheet){
    sheet.remove();
    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    for(let i=0;i<allSheetFolder.length;i++){
        allSheetFolder[i].setAttribute("id",i);
        let sheetContent = allSheetFolder[i].querySelector(".sheet-content");
        sheetContent.innerText = `Sheet${i+1}`;
        allSheetFolder[i].style.backgroundColor=  'transparent';
    }
    allSheetFolder[0].style.backgroundColor= "#ced6e0";
}
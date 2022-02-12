//in this module we are giving every cell properties like boldness,italic ,font-family,size ,etc..
//also we are storing individual cell  active and non active properties in shhetDB so that if we visit that cell again we can know it active properties.

let collectedSheetDB = [];   //content all sheets DB
// for storage purpose;
// In sheetDB we are storing in each cell all property of all cell.
let sheetDB =[];// a 2-d matrix where we are storing information about every cell in form of object..


{
    let sheetBtn = document.querySelector(".sheet-add-icon")
    sheetBtn.click();
}
// for(let i=0;i<rows;i++){
//     let sheetROw=[];
//     for(let j=0;j<cols;j++){
//         let cellProp = {    /* cell properties*/
//             bold: false,
//             italic: false,
//             underline: false,
//             alignment: "Left",
//             fontFamily: "monospace",
//             fontSize :"14",
//             fontColor:  "#000000",
//             BGcolor: "#000000",  //Just for indication function
//             value : " ",   //value present in cell
//             formula:" ",  //formula used to construct the cell (store in string format)
//             children: [],   //for dependency aspect ()
//         }
//         sheetROw.push(cellProp);
//     }
//     sheetDB.push(sheetROw);
// }



//selectors for cell property....
let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline  = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontcolor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let align = document.querySelectorAll(".align");
let leftalign = align[0];
let centrealign = align[1];
let rightalign = align[2];
 


//Application of two way binding...
// Attach event listener'
let addBar = document.querySelector(".address-bar");
let activeColorProp =  "#d1d8e0"; // when any cell have some active property then set its background color to it...
let inactiveColorProp = "#ecf0f1"; //else 

//adding event listener to each each property...


bold.addEventListener("click",(e)=>{
     
    let add = addBar.value;  //gives address of selected cell..
    let[cell,cellProp] =  getActiveCell(add);//gives us access of needed cell in sheetDB as well as in UI.

    //Modification
    cellProp.bold = !cellProp.bold; //Data Change  //updating data in sheetDB 
    cell.style.fontWeight = cellProp.bold ?"bold" : "normal"; //UI Change
    bold.style.backgroundColor = cellProp.bold? activeColorProp : inactiveColorProp;

})

italic.addEventListener("click",(e)=>{
    console.log("ihiw");
    let add = addBar.value;
    let[cell,cellProp] =  getActiveCell(add);

    //Modification
    cellProp.italic = !cellProp.italic; //Data Change
    cell.style.fontStyle = cellProp.italic ?"italic" : "normal"; //UI Change
    italic.style.backgroundColor = cellProp.italic? activeColorProp : inactiveColorProp;

})

underline.addEventListener("click",(e)=>{
    console.log("ihiw");
    let add = addBar.value;
    let[cell,cellProp] =  getActiveCell(add);

    //Modification
    cellProp.underline = !cellProp.underline; //Data Change
    cell.style.textDecoration = cellProp.underline ?"underline" : "none"; //UI Change
    underline.style.backgroundColor = cellProp.underline? activeColorProp : inactiveColorProp;

})



fontSize.addEventListener("click",(e)=>{
    let add = addBar.value;
    let[cell,cellProp] =  getActiveCell(add);

    //Modification
    cellProp.fontSize = fontSize.value; //Data Change
    cell.style.fontSize = cellProp.fontSize+"px"; //UI Change
     
})


fontFamily.addEventListener("click",(e)=>{
    let add = addBar.value;
    let[cell,cellProp] =  getActiveCell(add);

    //Modification
    cellProp.fontFamily = fontFamily.value; //Data Change
    cell.style.fontFamily = cellProp.fontFamily; //UI Change
     
})


fontcolor.addEventListener("change",(e)=>{
    console.log("ihiw");
    let add = addBar.value;
    let[cell,cellProp] =  getActiveCell(add);

    //Modification
    cellProp.fontcolor = fontcolor.value; //Data Change
    cell.style.color = cellProp.fontcolor; //UI Change
    
})

BGcolor.addEventListener("change",(e)=>{
    console.log("ihiw");
    let add = addBar.value;
    let[cell,cellProp] =  getActiveCell(add);

    //Modification
    cellProp.BGcolor = BGcolor.value; //Data Change
    cell.style.backgroundColor = cellProp.BGcolor; //UI Change
     
})


align.forEach((alignElem)=>{
    alignElem.addEventListener("click",(e)=>{
        let add = addBar.value;
        let[cell,cellProp] =  getActiveCell(add)
    
        let alignValue = e.target.classList[1];  // align value - centre | left | right
        cellProp.align = alignValue; //Data Change
        cell.style.textAlign = alignValue;//UI change
        
        switch(alignValue){
            case "left": 
                leftalign.style.backgroundColor = activeColorProp;
                centrealign.style.backgroundColor = inactiveColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftalign.style.backgroundColor = inactiveColorProp;
                centrealign.style.backgroundColor = activeColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftalign.style.backgroundColor = inactiveColorProp;
                centrealign.style.backgroundColor = activeColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
        }

    })
})

let allCells = document.querySelectorAll(".cell");
for(let i=0;i<allCells.length;i++){
    addListnerToAttachCellProp(allCells[i]);
}
function addListnerToAttachCellProp(cell){
   //when we click a specific cell we should see active properties for that cell.
   //And to bring in view we take value from our sheetDB.
    cell.addEventListener("click",(e)=>{
        let addr = addBar.value;
        let [rid,cid] = decode(addr);
        let cellProp = sheetDB[rid][cid];
        // for specific cell

        cell.style.fontWeight = cellProp.bold ?"bold" : "normal"; //UI Change
        cell.style.fontStyle = cellProp.italic ?"italic" : "normal"; //UI Change
        cell.style.textDecoration = cellProp.underline ?"underline" : "none"; //UI Change
        cell.style.fontSize = cellProp.fontSize+"px"; //UI Change
        cell.style.fontFamily = cellProp.fontFamily; //UI Change
        cell.style.color = cellProp.fontcolor; //UI Change
        cell.style.backgroundColor = cellProp.BGcolor === "#000000"?"transparent" : cellProp.BGcolor; //UI Change
        cell.style.textAlign = cellProp.align;

        bold.style.backgroundColor = cellProp.bold? activeColorProp : inactiveColorProp;
        italic.style.backgroundColor = cellProp.italic? activeColorProp : inactiveColorProp;
        underline.style.backgroundColor = cellProp.underline? activeColorProp : inactiveColorProp;
        fontcolor.value = cellProp.fontcolor;
        BGcolor.value = cellProp.BGcolor;
        fontSize.value = cellProp.fontSize; 
        fontFamily.value = cellProp.fontFamily; 


        switch(cellProp.align){
            case "left": 
                leftalign.style.backgroundColor = activeColorProp;
                centrealign.style.backgroundColor = inactiveColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
            case "center":
                leftalign.style.backgroundColor = inactiveColorProp;
                centrealign.style.backgroundColor = activeColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
            case "right":
                leftalign.style.backgroundColor = inactiveColorProp;
                centrealign.style.backgroundColor = activeColorProp;
                rightalign.style.backgroundColor = inactiveColorProp;
                break;
        }
        
        let formulaBar = document.querySelector(".formula-bar");
        formulaBar.value = cellProp.formula;
        cell.innerText = cellProp.value;
    })
}

//-----------------------------------------------------------------------------------------
function getActiveCell(address){
    let [rid,cid]=decode(address);
     //Access cell & storage
    let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp = sheetDB[rid][cid];
    return [cell,cellProp];
}
function decode(address){
    //address ->A1
    let rowId = Number(address.slice(1))-1;
    let colId = Number(address.charCodeAt(0))-65;
    return [rowId,colId];
}
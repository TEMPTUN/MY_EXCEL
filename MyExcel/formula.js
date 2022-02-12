
for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
        let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
        cell.addEventListener("blur",(e)=>{
           let add = addressBar.value;
           let [activeCell, cellProp] =  getActiveCell(add);
            
           let enteredData = cell.innerText; //since cell is contenteditable we should update cell value using eventListener blur.
           if(enteredData === cellProp.value) return;
            
           //if we are here means we have edit out previous value in cell;
           cellProp.value = enteredData;  //Data Change in sheetDB
            //if data modifies remove P-C relation,formula empty,update children with new hardcoded(modify) value.
           removeChildFromParent(cellProp.formula);
           cellProp.formula="";
           updateChildrenCells(add);
        })
    }
}

let formulaBar = document.querySelector(".formula-bar");
formulaBar.addEventListener("keydown",async (e)=>{
    if(e.key==="Enter" && formulaBar.value){

        //If change in formula,break old P-C relation,evaluate new formula, add new P-C relation
        let address = addressBar.value;
        let [cell,cellProp] = getActiveCell(address);
        if(formulaBar.value!=cellProp.formula){
            removeChildFromParent(cellProp.formula);
        } 

        addChildTOGrabComponent(formulaBar.value,address);
        //Check formula is cyclic or not
        let cyclicResponse = isGraphCyclic(graphComponentMatrix);
        if(cyclicResponse){
            // alert("Your formula is cyclic");
            let response = confirm("Your formula is cyclic. Do you want trace your path?");
            while(response == true){
                //Keep on traking color untill user is not satisfied..
                await isGraphCyclicTracePath(graphComponentMatrix,cyclicResponse);
                //await colorPromise();
                response = confirm("Your formula is cyclic. Do you want trace your path?");
            }
            removeChildFromGraphComponent(formulaBar.value,address);
            return;
        }
        let evalValue = evaluateFormula(formulaBar.value)
        
        //TO update UI and cellProp in DB
        SetCellUIAndCellProp(evalValue,formulaBar.value,address);
        addChildToParent(formulaBar.value);

        updateChildrenCells(address);
        console.log(sheetDB);
    }
})

function evaluateFormula(formula){
    let encodedFormula = formula.split(" ");//User should provide formula in space seprated manner
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
           let [cell,cellProp] =  getActiveCell(encodedFormula[i]);
            encodedFormula[i] = cellProp.value;
        }
    }
    let decodedFormula = encodedFormula.join(" ");
    return eval(decodedFormula); //eval is function of javascript which take string and evaluate it
}

function SetCellUIAndCellProp(evalValue,formula,address){
    
    let[cell,cellProp] = getActiveCell(address);

    cell.innerText = evalValue; //UI Updates
    cellProp.value = evalValue; //DB Update
    cellProp.formula = formula;

}

function updateChildrenCells(parentAddress){
    let [parentCell,parentCellProp] = getActiveCell(parentAddress);
    let children = parentCellProp.children;
    for(let i=0;i<children.length;i++){
        let childAddress = children[i];
        let [childCell,childCellProp] = getActiveCell(childAddress);
        let childFormula = childCellProp.formula;
        // console.log(childFormula);
        let evaluatedValue = evaluateFormula(childFormula);
        SetCellUIAndCellProp(evaluatedValue,childFormula,childAddress);
        updateChildrenCells(childAddress);
    }
}

function addChildToParent(formula) {
    let childAddress = addressBar.value;
   
    let encodedFormula = formula.split(" ");//User should provide formula in space seprated manner
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [cell,parentCellProp] =  getActiveCell(encodedFormula[i]);
            parentCellProp.children.push(childAddress);
         }
    }
}

function removeChildFromParent(formula){
    let childAddress = addressBar.value;
    let encodedFormula = formula.split(" ");//User should provide formula in space seprated manner
    for(let i=0;i<encodedFormula.length;i++){
        let asciiValue = encodedFormula[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [cell,parentCellProp] =  getActiveCell(encodedFormula[i]);
            let idx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(idx,1);
         }
    }
}


function addChildTOGrabComponent(formula,childAddress){
    let [crid,ccid] =  decode(childAddress);  //crid = child row id & ccid = child column id
    let encoded  = formula.split(" ");
    for(let i=0;i< encoded.length;i++){
        let asciiValue = encoded[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid,pcid] = decode(encoded[i]); //prid = parent row id & pcid = parent column id
            graphComponentMatrix[prid][pcid].push([crid,ccid]);
        }
    }    
}

function removeChildFromGraphComponent(formula,childAddress){
    let [crid,ccid] =  decode(childAddress);  //crid = child row id & ccid = child column id
    let encoded  = formula.split(" ");
    for(let i=0;i< encoded.length;i++){
        let asciiValue = encoded[i].charCodeAt(0);
        if(asciiValue>=65 && asciiValue<=90){
            let [prid,pcid] = decode(encoded[i]); //prid = parent row id & pcid = parent column id
            graphComponentMatrix[prid][pcid].pop();
        }
    }  
}
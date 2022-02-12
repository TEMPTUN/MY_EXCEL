let downloadBtn = document.querySelector(".download");
let openBtn= document.querySelector(".open");


//Download
downloadBtn.addEventListener("click",(e)=>{
    let jsondata =JSON.stringify([sheetDB,graphComponentMatrix]);
    let file = new Blob([jsondata],{type:"application/json"});

    let a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = "SheetData.json";
    a.click();
})


//Upload(open)
openBtn.addEventListener("click",(e)=>{
    //open file explorer..
    let input = document.createElement("input");
    input.setAttribute("type","file");
    input.click();

    input.addEventListener("change",(e)=>{
        let fr = new FileReader();
        let files = input.files;
        let fileObj = files[0];
        fr.readAsText(fileObj);
        fr.addEventListener("load",(e)=>{
           let readSheetData =  JSON.parse(fr.result);
           //basic sheet with default data will be created
           addSheetBtn.click();

           //sheetDB, graphComponentMatrix
           sheetDB = readSheetData[0];
           graphComponentMatrix = readSheetData[1];

           collectedSheetDB[collectedSheetDB.length-1] = sheetDB;
           collectedGraphComponentMatrix[collectedGraphComponentMatrix.length-1] = graphComponentMatrix;
          
           handleSheetProperties();
        });
    })
})
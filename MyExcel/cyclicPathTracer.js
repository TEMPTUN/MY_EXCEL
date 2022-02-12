
async function isGraphCyclicTracePath(graphComponentMatrix,cyclicResponse){
    let [srcr,srcc] = cyclicResponse;
    let visited =[];  //Node visited trace
    let dfsvisited =[]; //stack visited trace

    for(let i=0;i<rows;i++){
        let visitedrow =[];
        let dfsvisitedrow =[];
        for(let j=0;j<cols;j++){
            visitedrow.push(false);
            dfsvisitedrow.push(false);
        }
        visited.push(visitedrow);
        dfsvisited.push(dfsvisitedrow);
    }

    // for(let i=0;i<rows;i++){
    //     for(let j=0;j<cols;j++){
    //         if(visited[i][j] == false){
    //             let response = dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsvisited);
    //             if(response == true){
    //                 return true;
    //             }
    //         }
    //     }
    // }
    let response = await dfsCycleDetectionTracePath(graphComponentMatrix,srcr,srcc,visited,dfsvisited);
    if(response) return Promise.resolve(true);
    return Promise.resolve(false);
}


// Coloring cell for traking 
async function dfsCycleDetectionTracePath(graphComponentMatrix,srcRow,srcCol,visited,dfsvisited){
    visited[srcRow][srcCol] = true;
    dfsvisited[srcRow][srcCol] = true;

    let cell = document.querySelector(`.cell[rid="${srcRow}"][cid="${srcCol}"]`);
    cell.style.backgroundColor = "lightblue";    
    await colorPromise();
    //
    for(let child =0;child<graphComponentMatrix[srcRow][srcCol].length;child++){
        let [crid,ccid] = graphComponentMatrix[srcRow][srcCol][child];
        if(visited[crid][ccid] == false){
            let respond = await dfsCycleDetectionTracePath(graphComponentMatrix,crid,ccid,visited,dfsvisited);
            if(respond === true){
                cell.style.backgroundColor = "transparent";    
                await colorPromise();
               
                return Promise.resolve(true);
            }
        }else if(visited[crid][ccid] === true && dfsvisited[crid][ccid] === true){
            let cyclicCell = document.querySelector(`.cell[rid="${crid}"][cid="${ccid}"]`);
            cyclicCell.style.backgroundColor = "lightsalmon";
            await colorPromise();

            cyclicCell.style.backgroundColor = "transparent";
            await colorPromise();

            cell.style.backgroundColor = "transparent";    
            await colorPromise();   
           
            return Promise.resolve(true);
        }
    }

    dfsvisited[srcRow][srcCol] = false;
    return Promise.resolve(false);;
}


function colorPromise(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },1000)

    })
}
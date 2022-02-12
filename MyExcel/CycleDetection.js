let collectedGraphComponentMatrix =[];
//Storage - > 2D matrix()
let graphComponentMatrix =[];

for(let i=0;i<rows;i++){
    let row = [];
    for(let j=0;j<cols;j++){
        row.push([]); //Why Array -> To store a child in form of[i,j]/[rowId,colId] we use array
    }
    graphComponentMatrix.push(row);
}

//True denotes cycle present and vice-versa
function isGraphCyclic(graphComponentMatrix){
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

    for(let i=0;i<rows;i++){
        for(let j=0;j<cols;j++){
            if(visited[i][j] == false){
                let response = dfsCycleDetection(graphComponentMatrix,i,j,visited,dfsvisited);
                if(response == true){
                    return [i,j];
                }
            }
        }
    }

    return false;
}

function dfsCycleDetection(graphComponentMatrix,srcRow,srcCol,visited,dfsvisited){
    visited[srcRow][srcCol] = true;
    dfsvisited[srcRow][srcCol] = true;

    //
    for(let child =0;child<graphComponentMatrix[srcRow][srcCol].length;child++){
        let [crid,ccid] = graphComponentMatrix[srcRow][srcCol][child];
        if(visited[crid][ccid] == false){
            let respond = dfsCycleDetection(graphComponentMatrix,crid,ccid,visited,dfsvisited);
            if(respond === true){
                return true;
            }
        }else if(visited[crid][ccid] === true && dfsvisited[crid][ccid] === true){
            return true;
        }
    }

    dfsvisited[srcRow][srcCol] = false;
    return false;
}
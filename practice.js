let bar=document.getElementsByClassName("bar-container")[0];

function random_number(mini,maxi){
    return Math.ceil(Math.random()*(maxi-mini+1));
}


function generate_heights(numbar){
    let arr=[];
    for(let i=0;i<numbar;i++){
        arr.push(random_number(1,430));
    }

    return arr;
}


function create_bars(bars){

    // const numbar=document.getElementById("slide").value;
    // console.log(numbar);
    
    bar.innerHTML='';
    for(let i=0;i<bars.length;i++){
        bar.innerHTML+=`<div class="bar" style="height: ${bars[i]}px"></div>`
    }

    

}

create_bars(generate_heights(document.getElementById("slide").value));

let arr=generate_heights(document.getElementById("slide").value);
// console.log(arr);
document.getElementById("slide").addEventListener('click',()=>{
    arr=generate_heights(document.getElementById("slide").value);
    create_bars(arr);
    // console.log(arr);
})



// BUBBLE SORT

async function bubble_sort(bars){
    let size=bars.length;
    for(let i=0;i<size-1;i++){
        for(let j=0;j<size-1-i;j++){
            if(bars[j]>bars[j+1]){
                await swap(bars,j,j+1);
            }
        }
    }
}



function swap(bars,i,j){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            [bars[i],bars[j]]=[bars[j],bars[i]];
            create_bars(bars);
            resolve();
        },4)
        
    });
}



// INSERTION SORT

async function insertion_sort(bars){
    let size=bars.length;
    for(let i=1;i<size;i++){
        let curr=bars[i];
        let j=i-1;
        while(j>=0 && bars[j]>curr){
            await shift_right(bars,j);
            j--;
        }
        bars[j+1]=curr;
        create_bars(bars);
    }
}



function shift_right(bars,j){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            bars[j+1]=bars[j];
            create_bars(bars);
            resolve();
        },4);
    });
}



// SELECTION SORT
async function selection_sort(bars){
    let size=bars.length;
    for(let i=0;i<size-1;i++){
        let mini=1e9,minidx=i;
        for(let j=i+1;j<size;j++){
            if(bars[j]<mini){
                mini=bars[j];
                minidx=j;
            }
        }
        await swap(bars,i,minidx);
    }
}


document.getElementById("bubble").addEventListener('click',()=>{
    bubble_sort(arr);
    // console.log(arr);
})



document.getElementById("insertion").addEventListener('click',()=>{
    insertion_sort(arr);
    // console.log(arr);
})

document.getElementById("selection").addEventListener('click',()=>{
    selection_sort(arr);
    // console.log(arr);
})






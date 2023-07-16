let sec=100-(document.getElementById("speed").value);
document.getElementById("speed").addEventListener('click',()=>{
    sec=100-(document.getElementById("speed").value);
})

// document.style.backgroundColor="blue";
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

    let bar=document.getElementById("bar-container");
    bar.innerHTML='';
    for(let i=0;i<bars.length;i++){
        bar.innerHTML+=`<div class="bar" style="height: ${bars[i]}px"></div>`
    }

    

}

create_bars(generate_heights(document.getElementById("slide").value));

let arr=generate_heights(document.getElementById("slide").value);
// console.log(arr);
document.getElementById("slide").addEventListener('input',()=>{
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
        },sec);
        
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
        },sec);
    });
}



// SELECTION SORT
async function selection_sort(bars){
    let size=bars.length;
    for(let i=0;i<size-1;i++){
        let minidx=i;
        for(let j=i+1;j<size;j++){
            if(bars[j]<bars[minidx]){
                // mini=bars[j];
                minidx=j;
            }
        }
        await swap(bars,i,minidx);
    }
}


async function sleep(ms){
    return new Promise((resolve)=> setTimeout(resolve,ms));
}


// MERGE SORT
async function merge_sort(bars,low=0,high=bars.length-1){
    if(low<high){
        let mid=Math.floor((low+high)/2);
        await merge_sort(bars,low,mid);
        await merge_sort(bars,mid+1,high);
        await merge(bars,low,mid,high);
    }
}


async function merge(bars,low,mid,high){
    let n1=mid-low+1;
    let n2=high-mid;
    let v1=[],v2=[];
    for(let i=0;i<n1;i++) v1.push(bars[low+i]);
    for(let i=0;i<n2;i++) v2.push(bars[mid+1+i]);

    let i=0,j=0,k=low;
    while(i<n1 && j<n2){
        if(v1[i]<=v2[j]){
            bars[k]=v1[i];
            i++;
            k++;
        }
        else{
            bars[k]=v2[j];
            j++;
            k++;
        }
        create_bars(bars);
        await sleep(sec);
    }

    while(i<n1){
        bars[k]=v1[i];
        i++;
        k++;
        create_bars(bars);
        await sleep(sec);
    }

    while(j<n2){
        bars[k]=v2[j];
        j++;
        k++;
        create_bars(bars);
        await sleep(sec);
    }
}


// QUICK SORT
async function quickSort(array, low = 0, high = array.length - 1) {
    if (low < high) {
      const pivot = await partition(array, low, high);
      await quickSort(array, low, pivot - 1);
      await quickSort(array, pivot + 1, high);
    }
  }
  
  async function partition(array, low, high) {
    const pivot = array[high];
    let i = low - 1;
  
    for (let j = low; j < high; j++) {
      if (array[j] < pivot) {
        i++;
        [array[i], array[j]] = [array[j], array[i]];
        create_bars(array);
        await sleep(sec);
      }
    }
  
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
    create_bars(array);
    await sleep(sec);
  
    return i + 1;
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


document.getElementById("merge").addEventListener('click',()=>{
    merge_sort(arr);
    // console.log(arr);
})



document.getElementById("quick").addEventListener('click',()=>{
    quickSort(arr);
    // console.log(arr);
})






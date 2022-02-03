var aa = document.querySelectorAll("input")
var matric = []
var dem = 1
var bb = document.getElementById("btnOk")
var block1 = [] , block2 = [] ,block3 = [] ,block4 = [] ,block5 = [] ,block6 = [] ,block7 = [] ,block8 = [] ,block9 = [] 
var matric2 = []
function addList(array, value){
   if (array.length < 9){
        if (isNaN(value) || value === "" || value > 9 || value < 1){
            array.push(0)
        }
        else {
            array.push(value)
        }
   }
}
function addMatric(){
    matric.push (
        block1, block2, block3, block4, block5, block6, block7, block8, block9
    )
}
function addBlock(){
    aa.forEach(function(aaa,i){
        if (i <= 8 ){
            addList(block1, aaa.value)
        }
        else if (i <= 17){
            addList(block2, aaa.value)
        }
        else if (i <= 26){
            addList(block3, aaa.value)
        }
        else if (i <= 35){
            addList(block4, aaa.value)
        }
        else if (i <= 44){
            addList(block5, aaa.value)
        }
        else if (i <= 53){
            addList(block6, aaa.value)
        }
        else if (i <= 62){
            addList(block7, aaa.value)
        }
        else if (i <= 71){
            addList(block8, aaa.value)
        }
        else if (i <= 80){
            addList(block9, aaa.value)
        }
    })
}
function noiMang(){
    for (var i = 0; i < matric.length ; ++i){
        if (matric2.length < 81){
            matric2 = matric2.concat(matric[i])
        }
    }
}
function draw(){
    let elementTd = document.querySelectorAll("td")
    giai(matric)
    noiMang()
    elementTd.forEach(function(aa,i){
        if (typeof matric2[i] === "number"){
            aa.innerHTML = `<div class = "rs">${matric2[i]}</div>`
        }else{
            aa.innerText = matric2[i]
        }
    })
}
function clickOk(){
    bb.addEventListener("click", function(e){
        addBlock()
        addMatric()
        draw()
    })    
}
function clickReset(){
    document.getElementById("btnReset").addEventListener("click",function(){
        window.location.reload()
    })
}

clickOk()
clickReset()
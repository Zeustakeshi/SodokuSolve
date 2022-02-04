var array = [
    [7, 6, 3, 0, 0, 5, 4, 0, 0],
    [4, 0, 0, 6, 0, 0, 3, 8, 0],
    [0, 2, 0, 0, 0, 4, 0, 1, 6],
    [0, 5, 7, 0, 0, 6, 8, 2, 0],
    [0, 0, 0, 0, 2, 0, 7, 0, 0],
    [2, 0, 0, 5, 7, 3, 0, 6, 0],
    [0, 7, 2, 0, 0, 0, 9, 4, 8],
    [0, 3, 1, 0, 6, 0, 2, 7, 0],
    [5, 4, 0, 2, 8, 0, 6, 3, 1]
]
var demdong  = 0
var demcot = 0
var demBlock = 0
var listdong = []
var listcot = []
var listBlock = []
var list_null_in_Block= [] 
var BLOCK = function( d, c){
    // this.index = index
    this.dong = d
    this.cot = c
}
function findMinList(ar){
    var ara = ar.filter(function(aa){
        return aa !== 0
    })
    let min_val = Math.min.apply(Math, ara)
    return min_val
}
function ssLstDong_ListCot_listblock(){
    let listss = []
    listss.push(findMinList(listcot), findMinList(listdong), findMinList(listBlock))
    let soSanh = Math.min.apply(Math, listss)
    if (soSanh === findMinList(listcot)){
        for (let j= 0; j < listcot.length; j++){
            if (listcot[j] == findMinList(listcot)){
               return ["cot", j] 
            }
        }
    }
    else if (soSanh === findMinList(listdong)){
        for (let j= 0; j < listdong.length; j++){
            if (listdong[j] == findMinList(listdong)){
               return ["dong", j] 
            }
        }
    }
    else{
        let bb = 0
        for (let j= 0; j < listBlock.length; j++){
            for (let aa = 0; aa < listBlock[j]; aa++){
                list_null_in_Block[bb].index = j
                bb++
            }
            if (listBlock[j] == findMinList(listBlock)){
                return ["block", j] 
            }
        }
    }
    
}
function find(array){
    list_null_in_Block= []
    listdong = []
    listcot = []
    listBlock = []
    for (let i = 0; i < array.length; ++i){
        for (let j = 0; j < array[0].length; j++){
            if (array[i][j] == 0){
                demdong += 1
            }
        }
        listdong.push(demdong)
        demdong = 0
    } 
    for (let i = 0; i < array.length; ++i){
        for (let j = 0; j < array[0].length; j++){
            if (array[j][i] == 0){
                demcot += 1
            }
        }
        listcot.push(demcot)
        demcot = 0
    }
    for (let aa = 0; aa < array[0].length; aa+= 4 ){
        for(let bb = 0; bb < array.length; bb += 4){
            let x= Math.floor(bb / 3)
            let y= Math.floor(aa / 3)
            for (var i = y*3; i <= y*3 + 2; i++ ){
                for (var j = x*3; j <= x*3 + 2; j++ ){
                    if (array[i][j] == 0 ){
                        list_null_in_Block.push(
                            new BLOCK(i,j)
                        )
                        demBlock += 1
                    }
                    
                }
            }
            listBlock.push(demBlock)
            demBlock = 0
        }
    }

    return ssLstDong_ListCot_listblock()
}
var dongcot
var value 
function findNull (m){
    try {
        [value,dongcot] = find(m)   
        if (value == "dong" ){
            for (let c = 0; c < m[0].length;c++ ){
                if (m[dongcot][c] == 0){
                    return [dongcot,c,true, 0]
                }
            }
        }else if (value == "cot"){
            for (let d = 0; d < m[0].length;d++ ){
                if (m[d][dongcot] == 0){
                    return [d,dongcot ,true, 0]
                }
            }
        }else if (value == "block"){
            let cot = 0 
            let dong = 0
            return [dong, cot, false, dongcot]
        }
        return false     
    } catch (error) {
        return false
    }
}

function check(m, gia_tri, dong, cot){
    // kiểm tra xem giá trị có trùng với các giá trị có trên dòng đó không
    for(var a = 0; a < m[0].length; a++){
        if (m[a][cot] == gia_tri && a != dong){
            return false
        }
    }
    // kiểm tra xem giá trị có trùng với các giá trị có trên cột đó không
    for (var b= 0; b< m.length; b++ ){
        if (m[dong][b] == gia_tri && b != cot){
            return false
        }
    }

    var x= Math.floor(cot / 3)
    var y= Math.floor(dong / 3)
    // vòng lặp này dùng để kiểm tra có trùng trong các khối nhỏ không
    for (var i = y*3; i <= y*3 + 2; i++ ){
        for (var j = x*3; j <= x*3 + 2; j++ ){
            if (m[i][j] == gia_tri && i != dong && j != cot){
                return false
            }
            
        }
    }
    // nếu không trùng với tất cả các trường hợp trên thì trả về true
    return true
}

function giai(m){   
    var tim_thay = findNull (m)
    if(!tim_thay){
        return true
    }else{
        var [d,c,blom,block] = tim_thay
    }
    if (blom){
        for (var i = 1; i<= 9; ++i ){
            if (check(m, i, d, c )){
                m[d][c] = i
                // alert(` cột ${c} dòng ${d}: ${i}`)
                if (giai(m)){
                    return true
                }
                else{ 
                    m[d][c] = 0
                }
            }
        }
    }else{
        for (let bb = 0; bb < list_null_in_Block.length ; bb ++){
            if (list_null_in_Block[bb].index == block){
                c = list_null_in_Block[bb].cot
                d = list_null_in_Block[bb].dong
                for (var i = 1; i<= 9; ++i ){
                    if (check(m, i, d, c )){
                        m[d][c] = i
                        // alert(` cột ${c} dòng ${d}: ${i}`)
                        if (giai(m)){
                            return true
                        }
                        else{ 
                            m[d][c] = 0
                        }
                    }
                }
            }
        }
    }
    return false
}




// var matric = [
//     [7, 6, 3, 0, 0, 5, 4, 0, 0],
//     [4, 0, 0, 6, 0, 0, 3, 8, 0],
//     [0, 2, 0, 0, 0, 4, 0, 1, 6],
//     [0, 5, 7, 0, 0, 6, 8, 2, 0],
//     [0, 0, 0, 0, 2, 0, 7, 0, 0],
//     [2, 0, 0, 5, 7, 3, 0, 6, 0],
//     [0, 7, 2, 0, 0, 0, 9, 0, 8],
//     [0, 3, 1, 0, 6, 0, 2, 0, 0],
//     [5, 4, 0, 2, 8, 0, 0, 0, 1]
// ]
// hàm dùng để tìm những ô có giá trị bằng 0
function findNull (m){
    for (var d = 0; d < m.length; d++ ){
        for (var c = 0; c < m[0].length;c++ ){
            if (m[d][c] == 0){
                //nếu tìm thấy trả về hai giá trị là (d:dòng, c:cột)
                return [d,c]
            }
        }
    }
    return false
}
//hàm này dùng để kiển tra xem có giá trị có trùng không
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

/**
 * logic của hàm giải:
 * b1: gọi hàm findNull để tìm các giá trị bằng 0
 *      tạo biến tìm thấy để lưu giá trị hàm findNull trả về
 *          nếu hàm tìm thấy trả về false thì hàm giải sẽ trả về true
 *          nếu hàm tìm thấy trả về hai giá trị dòng và cột thì lưu lại vào hai biến c, d
 *      
 *b2: chạy vòng lặp từ 1 đến 9 :
 *      gọi hàm check 
 *               nếu hàm này trả về false thì tăng index của vòng lặp lên và gọi lại hàm check
 *               nếu hàm này trả về true thì gán giá trị tại vị trí d, c bằng index của vòng lặp
 *                          xét hàm giải + nếu hàm giải true thì trả về true và đệ quy lại
 *                                       + nếu hàm giải false thì gán giá trị tại c, d bằng 0 kết thúc vòng lặp và trả về false cho hàm giải 
 *                                         gán cho vị trí c,d bằng 0 và quay li về cd trước đó
 *          
 *          
 *      
 * 
 */
function giai(m){   
    var tim_thay = findNull (m)
    if(!tim_thay){
        return true
    }else{
        var [d,c] = tim_thay
    }
    for (var i = 1; i<= 9; ++i ){
        if (check(m, i, d, c )){
            m[d][c] = i
            if (giai(m)){
                return true
            }
            else{ 
                m[d][c] = 0
            }
        }
    }
    return false
}

// giai(matric)
// console.log(matric)
// STUDIO 10(A)

const M1 = [[1, 2], [3, 4]];
const M2 = [[ 1, 2, 3, 4],
[ 5, 6, 7, 8],
[ 9, 10, 11, 12],
[13, 14, 15, 16]];

const M3 = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

function swap(M, m1, n1, m2, n2) {
    const temp = M[m1][n1];
    M[m1][n1] = M[m2][n2];
    M[m2][n2] = temp;
}

function rotate(M) {
    const max_n = array_length(M);
    const mid = (max_n - 1) / 2;
    
    const mid_n = math_floor(array_length(M));
    
    for (let i = 0; i < mid_n; i = i + 1) {
        for (let j = 0; j < mid_n; j = j + 1) {
            
            const i0 = i - mid;
            const j0 = j - mid;
            
            let theta = math_atan(i0 / j0);
            theta = j0 === 0 ? 0 : theta;
            
            const point_r = math_sqrt(i0 * i0 + j0 * j0);
            const theta_n = theta + math_PI / 2;
            
            display(point_r);
            display(stringify(theta / math_PI * 180) + " --> " + stringify(theta_n / math_PI * 180));
            
            
            let i1 = point_r * math_cos(theta_n);
            let j1 = point_r * math_sin(theta_n);
            // i1 = math_round(i1 + mid);
            // j1 = math_round(j1 + mid);
            
            // display(stringify(i) + " . " + stringify(j));
            display(stringify(i0) + " . " + stringify(j0));
            display(stringify(i1) + " . " + stringify(j1));
            display("__________________");
            
            // swap(M, i, j, i1, j1);
        }
        break;
    }
    return M;
}

function rotate_v2(M) {
    const n = array_length(M);
    for (let i = 0; i < n; i = i + 1) {
        for (let j = 0; j < n; j = j + 1) {
            swap(M, i, j, j, i);
        }
    }
    
    const half_n = math_floor(n);
    
    for (let r = 0; r < n; r = r + 1) {
        // reverse_array(M[r]);
    }
    
}

rotate(M2);
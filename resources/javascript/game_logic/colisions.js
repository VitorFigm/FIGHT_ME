export function colision(obj1,obj2){ ///check colisions
    let colision = {}
    ///geometric logic
    let a_in_b  = (a, b, axis , property )=>{ ///check the interval of a in axis intersects interval of b in axis
        let cond1 = a[axis] >= b[axis] && a[axis] <= b[axis]+b[property]
        let cond2 =  a[axis]+a[property] >= b[axis] && a[axis]+a[property] <= b[axis]+b[property]
        return cond1 || cond2
    }
    let args_x = ['x','width']
    let colisionX_cond = a_in_b( obj1 , obj2 , ...args_x ) || a_in_b( obj2 , obj1 , ...args_x )
    let args_y = ['y','height']
    let colisionY_cond = a_in_b( obj1 , obj2 , ...args_y ) || a_in_b( obj2 , obj1 , ...args_y )

    ///colision check
    if( colisionX_cond && colisionY_cond ){colision.check=true;} ///Check if there is a colision
    else colision.check=false

    ///types of colision with obj1 as reference
    if(colision.check){
        let head_size = 0.1
        let a_inheadOf_b = (a,b) =>{
            a.y+a.height >=  b.y && b.y+a.height <= b.y+head_size
        }

        if ( a_inheadOf_b(obj1,obj2) ) colision.Ytype="1headOf2" ///obj1 in head of obj2
        else if( a_inheadOf_b(obj2,obj1) ) colision.Ytype="2headOf1"
        else colision.Ytype="normal"
    }

    return colision

}
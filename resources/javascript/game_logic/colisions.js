export function colision(obj1,obj2,errorx,errory=0){ ///check if colisions blocks intersects or will intersect
    let will_intersect = (axis,property,error)=>{ 
        ///points
        ///obj1
        const pt1i = obj1[axis]
        const pt1f = pt1i+obj1["V"+axis]

        const pt2i = obj1[axis]+obj1[property]
        const pt2f = pt2i+obj1["V"+axis]

        ///obj2
        const pt3i = obj2[axis]
        const pt3f = obj2[axis]+obj2["V"+axis]

        const pt4i = obj2[axis]+obj2[property]
        const pt4f = pt4i+obj2["V"+axis]
        if( pt1i < pt3i ){
            return pt2f >= pt3f+error
        }else{
            return pt1f <= pt4f-error
        }
    }


    return will_intersect('x','width',errorx) && will_intersect('y','height',errory)
    

}
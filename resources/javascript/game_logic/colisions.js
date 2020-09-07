export function colision(obj1,obj2,errorx,errory=0){ ///check if colisions blocks intersects or will intersect
    let will_intersect = (axis,property,error)=>{ 
        ///points
        ///obj1
        let pt1i = obj1[axis]
        let pt1f = pt1i+obj1["V"+axis]

        let pt2i = obj1[axis]+obj1[property]
        let pt2f = pt2i+obj1["V"+axis]

        ///obj2
        let pt3i = obj2[axis]
        let pt3f = obj2[axis]+obj2["V"+axis]

        let pt4i = obj2[axis]+obj2[property]
        let pt4f = pt4i+obj2["V"+axis]
        if( pt1i < pt3i ){
            return pt2f >= pt3f+error
        }else{
            return pt1f <= pt4f-error
        }
    }


    return will_intersect('x','width',errorx) && will_intersect('y','height',errory)
    

}
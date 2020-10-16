export function checkColision(character1,character2,errorx,errory=0){ ///check if colisions blocks intersects or will intersect
    let will_intersect = (axis,property,error)=>{ 
        ///points
        ///character1
        const pt1i = character1[axis]
        const pt1f = pt1i+character1["V"+axis]

        const pt2i = character1[axis]+character1[property]
        const pt2f = pt2i+character1["V"+axis]

        ///character2
        const pt3i = character2[axis]
        const pt3f = character2[axis]+character2["V"+axis]

        const pt4i = character2[axis]+character2[property]
        const pt4f = pt4i+character2["V"+axis]
        if( pt1i < pt3i ){
            return pt2f >= pt3f+error
        }else{
            return pt1f <= pt4f-error
        }
    }
    return will_intersect('x','width',errorx) && will_intersect('y','height',errory)
}
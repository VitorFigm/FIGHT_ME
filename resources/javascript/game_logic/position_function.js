let gravity = 0.3

export function velocity_logic(obj){
    let def_vel = (axis)=>{
        obj['V'+axis] += obj['A'+axis]

        let V_direction = 0
        if(obj['V'+axis]!=0) V_direction = Math.abs(obj['V'+axis])/obj['V'+axis]
        
        if(axis=='x'){
            ///friction
            obj.Vx -= V_direction*obj.fric
        }

        ////ground limit
        if(axis == 'y'){
            obj.Vy += gravity
        }
    }

    def_vel('x')
    def_vel('y')

}

export function posChange(obj){

    obj.x += obj.Vx
    obj.y += obj.Vy
    if(obj.y>obj.block_y){
        obj.Vy = 0; ///cannot be 0, due the jump colision
        obj.y=obj.block_y;
    }
}
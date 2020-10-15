let gravity = 0.3

export function velocityLogic(obj){
    def_velocity('x')
    def_velocity('y')
    function def_velocity(axis){
        obj['V'+axis] += obj['A'+axis] ////accelerate
        let V_direction = obj['V'+axis]!=0 ? getSignal(obj['V'+axis]):0 ///get direction
        if(axis=='x'){
            ///apply friction
            obj.Vx -= V_direction*obj.fric
        }
        ////ground limit
        if(axis == 'y'){
            obj.Vy += gravity ///apply gravity acceleration
        }
    }
}

function getSignal(value){
    return value<0? -1:1
}
export function positionChange(obj){
    obj.x += obj.Vx
    obj.y += obj.Vy
}
export function changeDirection(obj1,obj2){
    if(obj1.x > obj2.x){
        obj1.direction = -1;
        obj2.direction = 1;
    }else{
        obj1.direction = 1;
        obj2.direction = -1;
    }
}
let gravity = 0.3

export function velocityLogic(character){
    def_velocity('x')
    def_velocity('y')
    function def_velocity(axis){
        character['V'+axis] += character['A'+axis] ////accelerate
        let V_direction = character['V'+axis]!=0 ? getSigns(character['V'+axis]):0 ///get direction
        if(axis=='x'){
            ///apply friction
            character.Vx -= V_direction*character.fric
        }
        ////ground limit
        if(axis == 'y'){
            character.Vy += gravity ///apply gravity acceleration
        }
    }
}

function getSigns(value){
    return value<0? -1:1
}
export function positionChange(character){
    character.x += character.Vx
    character.y += character.Vy
}
export function changeDirection(character1,character2){
    if(character1.x > character2.x){
        character1.direction = -1;
        character2.direction = 1;
    }else{
        character1.direction = 1;
        character2.direction = -1;
    }
}
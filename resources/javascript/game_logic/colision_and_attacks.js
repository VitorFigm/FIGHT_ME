export function P2P_colision_attack_loop(obj1,obj2,logic){  ///colision and attack betwen players

    if(obj1.x+obj1.width > obj2.x-obj2.width && obj1.x < obj2.x && obj1.y >= obj2.y - obj2.height   ){logic.colision=true;}
    else logic.colision=false

    ///types of colision
    if(logic.colision){
        if(obj1.x < obj2.x - obj2.width/2 )logic.colision_type="right"  ///obj1 going right
        else logic.colision_type="left"  ///obj1 going left
    }

    //colision functions

    ///go through block
    if(logic.colision && logic.colision_type=='right') {
        obj1.x = obj2.x- obj2.width - obj1.width
        apply_attack(obj1,obj2) ///let the punches and kicks deal damage 
    }
    if(logic.colision && logic.colision_type=='left'){
        obj1.x = obj2.x
        apply_attack(obj1,obj2) ///let the punches and kicks deal damage 
    }

}

function apply_attack(obj1,obj2){
    if(! isNaN(obj2.damage) )
    {
        obj1.hp-= obj2.damage;
        if(obj2.damage!=0)obj2.damage="wait" ///reset damage
    }

    if(! isNaN(obj1.damage) )
    {
        obj2.hp-= obj1.damage;
        if(obj1.damage!=0)obj1.damage="wait"  ///reset damage
    }

}
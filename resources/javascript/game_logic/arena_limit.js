export function limitCharacter_to_arenaWidth(obj,arenaWidth){
    if(obj.x<0){
        obj.x=0;
        obj.Vx =0
    }
    if(obj.x>arenaWidth-obj.width){
        obj.x=arenaWidth-obj.width;
        obj.Vx =0
    }

    if(obj.y>0){ //Blocks go through the ground
        obj.y=0
        obj.Vy = 0;
    }
}
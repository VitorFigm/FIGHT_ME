export function arena_limit(obj,limit){
    if(obj.x<0){
        obj.x=0;
        obj.Vx =0
    }
    obj.block_y = 0;
    if(obj.x>limit-obj.width){
        obj.x=limit-obj.width;
        obj.Vx =0
    }
}
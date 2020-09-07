export function arena_limit(obj,limit){
    if(obj.x<0){
        obj.x=0;
        obj.Vx =0
    }
    obj.block_y = 0; ///this function is on top, which means this property will be always starting 0 and will change with other loop function if needed
    if(obj.x>limit-obj.width){
        obj.x=limit-obj.width;
        obj.Vx =0
    }
}
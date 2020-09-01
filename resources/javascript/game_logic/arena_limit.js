export function arena_limit(obj1,obj2,limit){
    if(obj1.x<0)obj1.x=0;
    if(obj2.x<0)obj2.x=0;

    if(obj1.x>limit-obj1.width)obj1.x=limit-obj1.width;
    if(obj2.x>limit-obj2.width)obj2.x=limit-obj2.width;

}
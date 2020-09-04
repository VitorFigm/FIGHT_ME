export function change_dir(obj1,obj2){
    if(obj1.x > obj2.x){
        obj1.direction = -1;
        obj2.direction = 1;
    }else{
        obj1.direction = 1;
        obj2.direction = -1;
    }
}
export function velocity_logic(obj){
    obj.Vx += obj.Ax 

    let V_direction = 0
    if(obj.Vx!=0) V_direction = Math.abs(obj.Vx)/obj.Vx
    
    obj.Vx -= V_direction*obj.fric
    ///round speed
    if( Math.round(obj.Vx*100) ==0  ) obj.Vx=0;


    obj.x += obj.Vx
}
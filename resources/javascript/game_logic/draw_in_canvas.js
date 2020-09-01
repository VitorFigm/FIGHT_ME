export function canvas_draw(obj1,obj2,canvas_id,ground_y){
    let canvas = document.getElementById(canvas_id)
    let context = canvas.getContext('2d')

    context.clearRect(0, 0, canvas.width, canvas.height)
    draw_char(context,obj1,ground_y)
    draw_char(context,obj2,ground_y)

}


function draw_char(context,obj,ground_y){
    ///invert char if needed
    context.save()
    context.scale(obj.direction,1)
    let obj_x = vw_px(obj.x)*obj.direction
    
    

    let obj_y = vh_px( ground_y + obj.y  )  ////make the coordinate of y of object reference point in the bootom of his foot
    
    let canvas_args = [ obj_x, obj_y, vw_px(obj.width), vh_px(obj.height) ]
    context.drawImage(...get_sprites_args(obj)  , ...canvas_args)

    
    context.restore()
}



function get_sprites_args(obj){

    if(obj.frame_control==undefined)obj.frame_control=1 //starts animation
   
    ///request control, will be set undefined in the end of the function if stand_anim needs to be played
    if(obj.anim_request==undefined)obj.anim_request="stand_anim"

    ///getting properties
    let sprite_ref = obj.sprites[obj.anim_request]

    let img = sprite_ref.img

    let rows = sprite_ref.rows

    let cols = sprite_ref.cols

    let frame = obj.frame_control



    ///calculations
    let width = img.width/cols

    let height = img.height/rows

    let x = (frame-1)*width

    let actual_row = parseInt(x/img.width)

    let y = actual_row*height;

    x -= parseInt(x/img.width)*img.width ///prevent pass

    ///frame control
    obj.frame_control++;

    if(obj.frame_control>sprite_ref.frames){
        obj.frame_control=undefined
        obj.anim_request=undefined
    }
    
    ///undefined plays stand_anim
    if(obj.anim_request=="stand_anim")obj.anim_request=undefined


    return [img,x,y,width,height] //arg 

}

///units convertion

///convert to pixel
function vw_px(x){  ///view width to pixel
    return (x/100)*window.innerWidth
}
function vh_px(x){ ///view width to pixel
    return (x/100)*window.innerHeight
}


export function canvas_draw(obj1,obj2,canvas_id,ground_y,fight){
    let canvas = document.getElementById(canvas_id)
    let context = canvas.getContext('2d')

    context.clearRect(0, 0, canvas.width, canvas.height)
    if(fight!=undefined){
        show_hp_bars(obj1,obj2,context)
    }
    draw_char(context,obj1,ground_y)
    draw_char(context,obj2,ground_y)

}
 

function draw_char(context,obj,ground_y){
    ///invert char if needed
    context.save()
    context.scale(obj.direction,1)
    let fix_position = obj.width/2 - (obj.direction*(obj.width/2))  /// put the same reference point even when we invert canvas.
   
    let obj_x = vw_px(obj.x+fix_position)*obj.direction
    

    let obj_y = vh_px( ground_y + obj.y - obj.height  )  ////make the coordinate of y of object reference point in the bootom of his foot
    
    let canvas_args = [ obj_x, obj_y, vw_px(obj.width), vh_px(obj.height) ]
    context.drawImage(...get_sprites_args(obj)  , ...canvas_args)

    
    context.restore()
}



function get_sprites_args(obj){
    if(obj.frame_control==undefined)obj.frame_control=1 //starts animation
   
    ///request control, will be set undefined in the end of the function if stand_anim needs to be played
    if(obj.anim_request==undefined)obj.anim_request="stand_anim"
    
    if(obj.anim_request[0]=="_"){  // '_' in start of string indicates a new request, so the animation frame count resets.
        //removing "_"
        let to_array = obj.anim_request.split('')
        to_array.splice(0,1)
        obj.anim_request = to_array.join("")
        obj.frame_control=1
    }
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
        obj.anim_hierarchy = 0;
        obj.inDraw_play = undefined
    }
    ///play requested function
    if(obj.inDraw_play !=undefined){
        for(let request of obj.inDraw_play){
            let cond1 = ( request.in == "end" )&&( obj.frame_control == sprite_ref.frames )
            let cond2 = obj.frame_control == request.in
            if( cond1 || cond2 ) request.func()
        }
    }
    
    ///undefined plays stand_anim
    if(obj.anim_request=="stand_anim")obj.anim_request=undefined


    return [img,x,y,width,height] //arg 

}
function show_hp_bars(obj1,obj2,context, width=40, height=5, margin=5){
    ///red part
    context.fillStyle = "#FF3333";
    context.fillRect( vw_px(margin), vh_px(margin) , vw_px(width), vh_px(height) )
    context.fillRect( vw_px(100-margin-width), vh_px(margin) , vw_px(width), vh_px(height) )

    ///green percentual
    context.fillStyle = "#66CC33";
    let hp_width1 = width*(obj1.hp/100)
    let hp_width2 = width*(obj2.hp/100)
    context.fillRect( vw_px(margin), vh_px(margin) , vw_px(hp_width1), vh_px(height) )
    context.fillRect( vw_px(100-margin-hp_width2), vh_px(margin) , vw_px(hp_width2), vh_px(height) )

}


///units convertion

///convert to pixel
function vw_px(x){  ///view width to pixel
    return (x/100)*window.innerWidth
}
function vh_px(x){ ///view width to pixel
    return (x/100)*window.innerHeight
}


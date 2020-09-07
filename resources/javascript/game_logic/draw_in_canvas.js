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

    ///sprite vars
    let sprite_obj = sprite_frames_canvas(obj)
    let original_width = sprite_obj.frame_original_width

    ///position fix
        ///reference
    let fix_position = obj.width/2 - (obj.direction*(obj.width/2))  /// put the same reference point even when we invert canvas.
        //animation
    let sprite_fix =  sprite_obj.fixing_animX
    if(sprite_fix==undefined)sprite_fix=0
    let fix_anim_ratio = sprite_fix/obj.base_width
    let fix_anim = fix_anim_ratio*obj.width  ////anim goes fowards when played, it will fix it
   
    ///position calculation and args
    let obj_x = vw_px(obj.x + fix_position + fix_anim*obj.direction )*obj.direction
    let obj_y = vh_px( ground_y + obj.y - obj.height  )  ////make the coordinate of y of object reference point in the bootom of his foot
    let sprites_args = sprite_obj.canvas_args
    
    ///calculating ratio
    let frame_width = sprite_obj.frame_original_width
    let ratio = 1
    if(obj.base_width!==undefined){
        ratio = frame_width/obj.base_width
    }

    let canvas_args = [ obj_x, obj_y, vw_px(obj.width)*ratio, vh_px(obj.height) ]

    context.drawImage(...sprites_args  , ...canvas_args)

    
    context.restore()
}



function sprite_frames_canvas(obj){   ///return args to draw in canvas and original width of sprite
    if(obj.frame_control==undefined)obj.frame_control=1 //starts animation
   
    ///request control, will be set undefined in the end of the function if stand_anim needs to be played
    if(obj.anim_request==undefined)obj.anim_request="stand_anim"
    
    let new_request = false
    
    if(obj.anim_request[0]=="_"){  // '_' in start of string indicates a new request.
        obj.anim_request = obj.anim_request.slice(1)  //slice removes "_"
        new_request = true
    }

    ///getting properties
    let sprite_ref = obj.sprites[obj.anim_request]
    
    let img = sprite_ref.img

    let rows = sprite_ref.rows

    let cols = sprite_ref.cols

    if(new_request) {

        obj.frame_control=1

        if(obj.reverse_anim) obj.frame_control=sprite_ref.frames  
        else obj.frame_control=1
    }

    let frame = obj.frame_control



    ///calculations
    let width = img.width/cols

    let height = img.height/rows

    let x = (frame-1)*width

    let actual_row = parseInt(x/img.width)

    let y = actual_row*height;

    x -= parseInt(x/img.width)*img.width ///prevent pass

    ///frame control
    if(obj.reverse_anim &&!obj.block_reverse)obj.frame_control--;
    else obj.frame_control++;

    if(obj.frame_control>sprite_ref.frames || obj.reverse_anim && obj.frame_control==0){
        obj.frame_control=undefined
        obj.anim_request=undefined
        obj.anim_hierarchy = 0;
        obj.inDraw_play = undefined
        obj.reverse_anim = undefined
        obj.block_reverse = undefined
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

    return {canvas_args:[img,x,y,width,height], frame_original_width:width, fixing_animX : sprite_ref.fix_pos} //arg 

}
function show_hp_bars(obj1,obj2,context, width=40, height=5, margin=5){
    ///red part
    context.fillStyle = "#FF3333";
    context.fillRect( vw_px(margin), vh_px(margin) , vw_px(width), vh_px(height) )
    context.fillRect( vw_px(100-margin-width), vh_px(margin) , vw_px(width), vh_px(height) )

    ///green percentual
    context.fillStyle = "#66CC33";
    if(obj1.hp<0)obj1.hp=0
    if(obj2.hp<0)obj2.hp=0
    let hp_width1 = width*(obj1.hp/100)
    let hp_width2 = width*(obj2.hp/100)
    context.fillRect( vw_px(margin), vh_px(margin) , vw_px(hp_width1), vh_px(height) )
    context.fillRect( vw_px(100-margin-hp_width2), vh_px(margin) , vw_px(hp_width2), vh_px(height) )

}


///units convertion

///convert to pixel
function vw_px(x){  ///view width to pixel
    return (x/100)*window.my_width
}
function vh_px(x){ ///view width to pixel
    return (x/100)*window.my_height
}


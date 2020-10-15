export function canvas_draw(character1, character2, canvas_id, ground_y) {
    const canvas = document.getElementById(canvas_id)
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height) ///erase canvas
    show_hp_bars(character1, character2, context)
    draw_character(context, character1, ground_y)
    draw_character(context, character2, ground_y)
}

function show_hp_bars(character1, character2, context, width = 40, height = 5, margin = 5) {
    ///red part
    context.fillStyle = "#FF3333";
    context.fillRect(vw_px(margin), vh_px(margin), vw_px(width), vh_px(height))
    context.fillRect(vw_px(100 - margin - width), vh_px(margin), vw_px(width), vh_px(height))
    ///green percentual
    context.fillStyle = "#66CC33";
    if (character1.hp < 0) character1.hp = 0
    if (character2.hp < 0) character2.hp = 0
    const hp_width1 = width * (character1.hp / 100)
    const hp_width2 = width * (character2.hp / 100)
    context.fillRect(vw_px(margin), vh_px(margin), vw_px(hp_width1), vh_px(height))
    context.fillRect(vw_px(100 - margin - hp_width2), vh_px(margin), vw_px(hp_width2), vh_px(height))
}

function draw_character(context, character, ground_y) {
    revertCharacter_ifNeeded(context, character)
    ///sprite vars
    let { SpriteFrameOriginal_width, sprites_argsToCanvasDraw, fixing_animX } = spriteFrameFunction(character)
    //args
    const character_positionArgs = getCharacterXYposition(character, fixing_animX, ground_y)
    ///calculating ratio
    const ratio = (SpriteFrameOriginal_width / character.base_width) || 1
    const width = vw_px(character.width) * ratio
    const height = vh_px(character.height)
    const canvas_args = [...character_positionArgs, width, height]
    context.drawImage(...sprites_argsToCanvasDraw, ...canvas_args)
    context.restore()
}

function getCharacterXYposition(character, fixing_animX, ground_y) {
    //position fix
    /// put the same reference point even when we invert canvas.
    //character will have an increase on x position if it orientation(direction) is on the left(negative)
    const fix_position = character.direction === -1 ? character.width : 0
    //animation fix
    let sprite_fix = fixing_animX || 0
    sprite_fix = sprite_fix / character.base_width
    sprite_fix = sprite_fix * character.width ///Fix sprite position problem. Each animation moves the to a diferent spot when played, to fix that, i will calculate how much it moves and change the image position to keep it fixed at a point
    ///position calculation
    const x = vw_px(character.x + fix_position + sprite_fix * character.direction) * character.direction
    const y = vh_px(ground_y + character.y - character.height)  ////make the coordinate of y of object's reference point at the bootom of his foot
    return [x, y]
}

function revertCharacter_ifNeeded(context, character) {
    context.save()
    context.scale(character.direction, 1)
}

function spriteFrameFunction(character) {
    if (character.frame_control == undefined) character.frame_control = 1 //starts animation
    ///anim_request undefined plays stand_anim
    if (character.anim_request == undefined) character.anim_request = "stand_anim"
     ///It's possible to play a function in a specific frame if we request to
    const new_request = checkIf_RequestIsNew(character)
    const sprite_reference = character.sprites[character.anim_request]
    if (new_request) character.frame_control = character.reverse_anim ? sprite_reference.frames : 1
    const { img, x, y, width, height, frame } = calculateSpriteProperties(character, new_request)
    goToNextFrame(character)
    playRequestedFunction(character, sprite_reference)
    MakeAnimationEnd_IfNeeded(character, frame, sprite_reference)
    ///undefined plays stand_anim
    if (character.anim_request === "stand_anim") character.anim_request = undefined
    return {
        sprites_argsToCanvasDraw: [img, x, y, width, height],
        SpriteFrameOriginal_width: width,
        fixing_animX: sprite_reference.fix_position
    } //arg 
}

function checkIf_RequestIsNew(character) {
    let new_request = character.anim_request[0] === "_" ? true : false // '_' in start of string indicates a new request.
    if (new_request) {
        character.anim_request = character.anim_request.slice(1)  //slice removes "_"
    }
    return new_request
}

function calculateSpriteProperties(character) {
    const sprite_reference = character.sprites[character.anim_request]
    const { img, rows, cols } = sprite_reference
    const frame = character.frame_control
    ///calculations
    let width = img.width / cols
    let height = img.height / rows
    let x = (frame - 1) * width
    let actual_row = parseInt(x / img.width)
    let y = actual_row * height;
    x -= parseInt(x / img.width) * img.width ///prevent pass
    return { img: img, x: x, y: y, width: width, height: height, frame: frame }
}

function MakeAnimationEnd_IfNeeded(character, frame, sprite_reference) {
    if (frame == sprite_reference.frames && !character.reverse_anim
        || character.reverse_anim && frame === 1) {
        character.frame_control = undefined
        character.anim_request = undefined
        character.anim_hierarchy = 0;
        character.inDraw_play = undefined
        character.reverse_anim = undefined
    }
}

function playRequestedFunction(character, sprite_reference) {
    if (character.inDraw_play != undefined) {
        for (let request of character.inDraw_play) {
            let cond1 = (request.in === "end") && (character.frame_control === sprite_reference.frames)
            let cond2 = character.frame_control === request.in
            if (cond1 || cond2) request.func()
        }
    }
}

function goToNextFrame(character) {
    if (character.reverse_anim) character.frame_control--;
    else character.frame_control++
}

///units convertion
///convert to pixel
function vw_px(x) {  ///view width to pixel
    return (x / 100) * window.my_width
}
function vh_px(x) { ///view width to pixel
    return (x / 100) * window.my_height
}


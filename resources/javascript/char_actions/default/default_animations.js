export function load_sprite(path){
    const spriteImage = new Image()
    spriteImage.src = path
    return spriteImage 
}

export function default_loading_all_sprites(){///to load sprites used in actions to a object that will be returned
    const sprites = {
        stand_anim:{
            spriteImage:load_sprite(process.env.BASE_URL+"resources/chars/Default/standpose_3x22x60.svg"),
            frames:60,
            rows:3,
            cols:22,
        },
        weak_punch:{
            spriteImage:load_sprite(process.env.BASE_URL+"resources/chars/Default/weakpunch_3x15x40_.svg"),
            frames:40,
            rows:3,
            cols:15,
            fixSpritePosition:-92
        },
        strong_punch:{
            spriteImage:load_sprite(process.env.BASE_URL+"resources/chars/Default/strongpunch_4x17x60.svg"),
            frames:60,
            rows:4,
            cols:17,
            fixSpritePosition:-96.45
        },
        jump:{
            spriteImage:load_sprite(process.env.BASE_URL+"resources/chars/Default/jump_4x13x40.svg"),
            frames:40,
            rows:4,
            cols:13,
            fixSpritePosition:-99.6
        },
        jumping_in_air:{
            spriteImage:load_sprite(process.env.BASE_URL+"resources/chars/Default/inAir_15x3x40.svg"),
            frames:40,
            rows:3,
            cols:15,
        },
        air_kick:{
            spriteImage:load_sprite(process.env.BASE_URL+"resources/chars/Default/airkick_4x14x50.svg"),
            frames:50,
            rows:4,
            cols:14,
        },
        damage:{
            spriteImage:load_sprite(process.env.BASE_URL+"resources/chars/Default/damage_14_5_60.svg"),
            frames:60,
            rows:5,
            cols:14,
            fixSpritePosition:-120,
        },
        walk:{
            spriteImage:load_sprite(process.env.BASE_URL+"resources/chars/Default/walk_13_4_50.svg"),
            frames:50,
            rows:4,
            cols:13,
            fixSpritePosition:-130
        },
    }

    return sprites
}

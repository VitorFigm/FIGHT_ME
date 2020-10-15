export function load_sprite(path){
    const img = new Image()
    img.src = path
    return img 
}

export function default_loading_all_sprites(){///to load sprites used in actions to a object that will be returned
    const sprites = {
        stand_anim:{
            img:load_sprite("FIGHT_ME/resources/chars/Default/standpose_3x22x60.svg"),
            frames:60,
            rows:3,
            cols:22,
        },
        weak_punch:{
            img:load_sprite("FIGHT_ME/resources/chars/Default/weakpunch_3x15x40_.svg"),
            frames:40,
            rows:3,
            cols:15,
            fix_position:-92
        },
        strong_punch:{
            img:load_sprite("FIGHT_ME/resources/chars/Default/strongpunch_4x17x60.svg"),
            frames:60,
            rows:4,
            cols:17,
            fix_position:-96.45
        },
        jump:{
            img:load_sprite("FIGHT_ME/resources/chars/Default/jump_4x13x40.svg"),
            frames:40,
            rows:4,
            cols:13,
            fix_position:-99.6
        },
        jumping_in_air:{
            img:load_sprite("FIGHT_ME/resources/chars/Default/inAir_15x3x40.svg"),
            frames:40,
            rows:3,
            cols:15,
        },
        air_kick:{
            img:load_sprite("FIGHT_ME/resources/chars/Default/airkick_4x14x50.svg"),
            frames:50,
            rows:4,
            cols:14,
        },
        damage:{
            img:load_sprite("FIGHT_ME/resources/chars/Default/damage_14_5_60.svg"),
            frames:60,
            rows:5,
            cols:14,
            fix_position:-120,
        },
        walk:{
            img:load_sprite("FIGHT_ME/resources/chars/Default/walk_13_4_50.svg"),
            frames:50,
            rows:4,
            cols:13,
            fix_position:-130
        },
    }

    return sprites
}
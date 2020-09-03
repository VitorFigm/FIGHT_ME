import {load_sprite} from '/modules.js'

export function default_loading_all_sprites(){///to load sprites used in actions to a object that will be returned
    let sprites = {
        stand_anim:{
            img:load_sprite("/resources/chars/Default/standpose_3x22x60.svg"),
            frames:60,
            rows:3,
            cols:22,
        },
        weak_punch:{
            img:load_sprite("/resources/chars/Default/weakpunch_3x15x40_.svg"),
            frames:40,
            rows:3,
            cols:15,
        },
        strong_punch:{
            img:load_sprite("/resources/chars/Default/strongpunch_4x17x60.svg"),
            frames:60,
            rows:4,
            cols:17,
        },
        jump:{
            img:load_sprite("/resources/chars/Default/jump_4x13x40.svg"),
            frames:40,
            rows:4,
            cols:13,
        },
        jumping_in_air:{
            img:load_sprite("/resources/chars/Default/jumpinair_4x10x40.svg"),
            frames:40,
            rows:4,
            cols:13,
        },
        jumping_in_air:{
            img:load_sprite("/resources/chars/Default/jumpinair_4x10x40.svg"),
            frames:40,
            rows:4,
            cols:13,
        },
        air_kick:{
            img:load_sprite("/resources/chars/Default/airkick_4x14x50.svg"),
            frames:40,
            rows:4,
            cols:13,
        },
        damage:{
            img:load_sprite("/resources/chars/Default/damage_3x20x60.svg"),
            frames:60,
            rows:3,
            cols:20,
        },
        walk:{
            img:load_sprite("/resources/chars/Default/walkcicle_6x15x90.svg"),
            frames:90,
            rows:6,
            cols:15,
        },
    }

    return sprites
}
export function canvas_draw(character1, character2, canvas_id, groundY) {
    const canvas = document.getElementById(canvas_id)
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, canvas.width, canvas.height) ///erase canvas
    show_hp_bars()
    draw_character(character1)
    draw_character(character2)

    function show_hp_bars(width = 40, height = 5, margin = 5) {
        ///red part
        context.fillStyle = "#FF3333";
        context.fillRect(vw_px(margin), vh_px(margin), vw_px(width), vh_px(height))
        context.fillRect(vw_px(100 - margin - width), vh_px(margin), vw_px(width), vh_px(height))
        ///green percentual
        context.fillStyle = "#66CC33";
        ///prevents drawing negative hps
        if (character1.hp < 0) character1.hp = 0
        if (character2.hp < 0) character2.hp = 0
        const hp_width1 = width * (character1.hp / 100)
        const hp_width2 = width * (character2.hp / 100)
        context.fillRect(vw_px(margin), vh_px(margin), vw_px(hp_width1), vh_px(height))
        context.fillRect(vw_px(100 - margin - hp_width2), vh_px(margin), vw_px(hp_width2), vh_px(height))
    }

    function draw_character(character) {
        revertCharacter_ifNeeded()
        ///sprite vars
        let { SpriteFrameOriginal_width, 
            sprites_argsToCanvasDraw, 
            fixSpritePosition = 0 } = spriteFrameFunction()
        //args
        const character_positionArgs = getCharacterXYposition()
        ///calculating ratio
        const ratio = (SpriteFrameOriginal_width / character.base_width) || 1
        const width = vw_px(character.width) * ratio
        const height = vh_px(character.height)
        const canvasArgs = [...character_positionArgs, width, height]
        context.drawImage(...sprites_argsToCanvasDraw, ...canvasArgs)
        context.restore()

        function revertCharacter_ifNeeded() {
            context.save()
            context.scale(character.direction, 1)
        }

        function spriteFrameFunction() {
            if (character.currentFrame == undefined) character.currentFrame = 1 //starts animation
            ///animRequest undefined plays stand_anim
            if (character.animRequest == undefined) character.animRequest = "stand_anim"
             ///It's possible to play a function in a specific frame if we request to
            const new_request = checkIf_RequestIsNew()
            const animationSprite = character.sprites[character.animRequest]
            const totalNumberOfFrames = animationSprite.frames
            if (new_request) character.currentFrame = character.reverseAnim ? totalNumberOfFrames : 1
            const {spriteImage} = animationSprite
            const { x, y, width, height } = calculateSpriteFrameProperties()
            goToNextFrame()
            callRequestedFunction()
            MakeAnimationEnd_IfNeeded()
            ///undefined plays stand_anim
            if (character.animRequest === "stand_anim") character.animRequest = undefined
            return {
                sprites_argsToCanvasDraw: [spriteImage, x, y, width, height],
                SpriteFrameOriginal_width: width,
                fixSpritePosition: animationSprite.fixSpritePosition
            }

            function checkIf_RequestIsNew() {
                let new_request = character.animRequest[0] === "_" ? true : false // '_' in start of string indicates a new request.
                if (new_request) {
                    character.animRequest = character.animRequest.slice(1)  //slice removes "_"
                }
                return new_request
            }

            function calculateSpriteFrameProperties() {
                const { rows, cols } = animationSprite
                ///calculations
                let width = spriteImage.width / cols
                let height = spriteImage.height / rows
                let x = (character.currentFrame - 1) * width
                let actual_row = parseInt(x / spriteImage.width)
                let y = actual_row * height;
                x -= parseInt(x / spriteImage.width) * spriteImage.width ///prevent pass
                return { x: x, y: y, width: width, height: height }
            }

            function goToNextFrame() {
                if (character.reverseAnim) character.currentFrame--;
                else character.currentFrame++
            }

            function callRequestedFunction() {
                if (character.onDrawCall != undefined) {
                    for (let request of character.onDrawCall) {
                        let condition1 = (request.onFrame === "finalFrame") && (character.currentFrame === totalNumberOfFrames)
                        let condition2 = character.currentFrame === request.onFrame
                        if (condition1 || condition2) request.func()
                    }
                }
            }

            function MakeAnimationEnd_IfNeeded() {
                if (character.currentFrame == totalNumberOfFrames && !character.reverseAnim
                    || character.reverseAnim && character.currentFrame === 1) {
                    character.currentFrame = undefined
                    character.animRequest = undefined
                    character.animHierarchy = 0;
                    character.onDrawCall = undefined
                    character.reverseAnim = undefined
                }
            }

        }

        function getCharacterXYposition() {
            //position fix
            /// keep the same reference point even when we invert canvas.
            /// reference point is the point in the character image used to determine the his position
            const fixPositionReferece = character.direction === -1 ? character.width : 0
            //animation fix
            let spriteFix = fixSpritePosition / character.base_width
            spriteFix = spriteFix * character.width ///Fix sprite position problem. Each animation moves the to a diferent spot when played, to fix that, i will calculate how much it moves and change the image position to keep it fixed at a point
            ///position calculation
            const x = vw_px(character.x + fixPositionReferece + spriteFix * character.direction) * character.direction
            const y = vh_px(groundY + character.y - character.height)  ////make the coordinate of y of object's reference point at the bootom of his foot
            return [x, y]
        }


    }
    
}

///units convertion
///convert to pixel
function vw_px(x) {  ///view width to pixel
    return (x / 100) * window.my_width
}
function vh_px(x) { ///view width to pixel
    return (x / 100) * window.my_height
}


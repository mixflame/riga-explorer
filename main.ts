namespace SpriteKind {
    export const bullet = SpriteKind.create()
    export const alien_bullet = SpriteKind.create()
    export const heart = SpriteKind.create()
    export const shield = SpriteKind.create()
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (statusbar.value > 30) {
        shield2 = sprites.create(img`
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . 8 8 9 9 9 9 9 9 9 8 8 . . . 
            . 8 9 9 9 9 9 9 9 9 9 9 9 8 . . 
            . 8 9 9 9 9 9 9 9 9 9 9 9 8 . . 
            8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            8 9 9 9 9 9 9 9 9 9 9 9 9 9 8 . 
            . 8 9 9 9 9 9 9 9 9 9 9 9 8 . . 
            . 8 9 9 9 9 9 9 9 9 9 9 9 8 . . 
            . . 8 8 9 9 9 9 9 9 9 8 8 . . . 
            . . . . 8 8 8 8 8 8 8 . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.shield)
        shield2.setPosition(mySprite.x, mySprite.y)
        can_shoot = 0
        damage_modifier = 0.001
        shield2.follow(mySprite)
    } else {
        shield2.destroy()
        can_shoot = 1
        damage_modifier = 1
    }
})
sprites.onOverlap(SpriteKind.alien_bullet, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    info.changeLifeBy(-1 * damage_modifier)
})
sprites.onOverlap(SpriteKind.bullet, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
info.onLifeZero(function () {
    game.over(false)
})
controller.B.onEvent(ControllerButtonEvent.Released, function () {
    shield2.destroy()
    can_shoot = 1
    damage_modifier = 1
})
sprites.onOverlap(SpriteKind.heart, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeLifeBy(30)
    sprite.destroy()
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    can_shoot = 0
})
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.GTE, statusbars.ComparisonType.Percentage, 30, function (status) {
    can_shoot = 1
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-10 * damage_modifier)
    info.changeScoreBy(1)
})
/**
 * The whole point of this game is to go north and get to The 7 Stars, 11 of them, Polaris, where God lives with his brothers
 */
let heart2: Sprite = null
let alien_bullet2: Sprite = null
let mySprite2: Sprite = null
let bullet2: Sprite = null
let stars: Sprite = null
let shield2: Sprite = null
let damage_modifier = 1
let can_shoot = 0
let statusbar: StatusBarSprite = null
let stars2: Sprite = null
let mySprite: Sprite = null
info.setLife(100)
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . 1 . 1 . 1 . . . . . . 
    . . . . . 1 . 1 1 1 . . . . . . 
    . . . . . 1 1 1 d 1 . . . . . . 
    . . . . . 1 d 1 d 1 . . . . . . 
    . . . . . 1 8 1 8 8 1 . . . . . 
    . 1 1 1 1 8 8 1 8 8 8 1 1 1 . . 
    . . 1 1 d d d 1 d d d 1 1 . . . 
    . . . 1 d d 1 1 d d 1 . . . . . 
    . . . . 1 1 d d 1 1 . . . . . . 
    . . . . . 1 d d d 1 . . . . . . 
    . . . . . 1 d d 1 . . . . . . . 
    . . . . . . 1 1 . . . . . . . . 
    . . . . . . . 1 . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite)
music.powerUp.play()
if (Math.percentChance(100)) {
    for (let index = 0; index < 25; index++) {
        stars2 = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 1 . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, 0, 10)
        stars2.setPosition(randint(0, scene.screenWidth()), randint(0, scene.screenHeight()))
    }
}
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.setColor(8, 2)
statusbar.setPosition(72, 111)
can_shoot = 1
damage_modifier = 1
game.onUpdate(function () {
    statusbar.value += 0.75
    mySprite.setFlag(SpriteFlag.StayInScreen, true)
    if (true || true) {
        if (Math.percentChance(50)) {
            stars = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 1 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, controller.player1.dx(100), 10)
            stars.setPosition(randint(scene.screenWidth(), 10), 0)
            stars.setFlag(SpriteFlag.Ghost, true)
        }
    }
    if (controller.up.isPressed() || controller.down.isPressed()) {
        if (Math.percentChance(50)) {
            stars = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . 1 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, controller.player1.dx(100), 10)
            stars.setPosition(randint(scene.screenWidth(), 10), 0)
            stars.setFlag(SpriteFlag.Ghost, true)
        }
    }
    if (controller.A.isPressed()) {
        if (Math.percentChance(50)) {
            if (can_shoot > 0) {
                bullet2 = sprites.createProjectileFromSprite(img`
                    . . . . . . 9 . 9 . . . . . . . 
                    . . . . . . 2 . 2 . . . . . . . 
                    . . . . . . 2 . 2 . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    . . . . . . . . . . . . . . . . 
                    `, mySprite, 0, randint(-30, -50))
                bullet2.setKind(SpriteKind.bullet)
                bullet2.setFlag(SpriteFlag.AutoDestroy, true)
                statusbar.value += -3
            }
        }
    }
    if (Math.percentChance(10)) {
        if (Math.percentChance(50)) {
            mySprite2 = sprites.createProjectileFromSide(img`
                . . . . . 3 3 3 3 3 3 . . . . . 
                . . . 3 3 3 c c c c 3 3 . . . . 
                . . . 3 f c c f c c f 3 . . . . 
                . . 3 3 f c c f c f f 3 . . . . 
                . . 3 c c f c f f f c 3 . . . . 
                . . 3 c c f f f f c c 3 . . . . 
                . . 3 3 c c c c c c 3 3 . . . . 
                . . . 3 3 c c b c c 3 . . . . . 
                . . . . 3 c c b c 3 3 . . . . . 
                . . . . 3 3 c b c 3 . . . . . . 
                . . . . . 3 c b 3 3 . . . . . . 
                . . . . . . 3 3 3 . . . . . . . 
                . . . . . . . 3 . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, 0, 5)
            mySprite2.setKind(SpriteKind.Enemy)
            mySprite2.setPosition(randint(scene.screenWidth(), 10), 0)
        } else {
            mySprite2 = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . 3 3 3 3 3 . . 3 3 3 3 3 . . 
                . 3 d d d d d 3 3 d d d d d 3 . 
                . 3 d d d d d 3 3 d d d d d 3 . 
                . 3 d d 2 d d 3 3 d d 2 d d 3 . 
                . 3 d d d d d 3 3 d d d d d 3 . 
                . 3 d d d d d 3 3 d d d d d 3 . 
                . . 3 3 3 3 3 2 . 3 3 3 3 3 . . 
                . . . . . 2 . 2 . 2 . . . . . . 
                . . . . . 2 . 2 . 2 . . . . . . 
                . . . . . 2 . 2 . 2 . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, 0, 10)
            mySprite2.setKind(SpriteKind.Enemy)
            mySprite2.setPosition(randint(scene.screenWidth(), 10), 0)
        }
    }
    if (Math.percentChance(40)) {
        alien_bullet2 = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . 3 . 3 . . . . . . . 
            . . . . . . 3 . 3 . . . . . . . 
            . . . . . . 3 . 3 . . . . . . . 
            . . . . . . 8 . 8 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, mySprite2, 0, randint(30, 50))
        alien_bullet2.setKind(SpriteKind.alien_bullet)
        alien_bullet2.setFlag(SpriteFlag.AutoDestroy, true)
    }
    if (info.score() > 150) {
        game.over(true)
    }
    if (info.life() < 50) {
        if (Math.percentChance(1)) {
            heart2 = sprites.createProjectileFromSide(img`
                . . . . . . . . . . . . . . . . 
                . . . 7 7 . . . 7 7 7 7 . . . . 
                . 7 7 7 7 7 . 7 7 7 7 7 7 . . . 
                7 7 7 7 7 7 . 7 7 7 7 7 7 . . . 
                . 7 7 7 7 7 7 7 7 7 7 7 7 . . . 
                . 7 7 7 7 7 7 7 7 7 7 7 7 . . . 
                . 7 7 7 7 7 7 7 7 7 7 7 7 . . . 
                . 7 7 7 7 7 7 7 7 7 7 7 7 . . . 
                . 7 7 7 7 7 7 7 7 7 7 7 . . . . 
                . . 7 7 7 7 7 7 7 7 7 7 . . . . 
                . . 7 7 7 7 7 7 7 7 7 7 . . . . 
                . . . 7 7 7 7 7 7 7 7 . . . . . 
                . . . 7 7 7 7 7 7 . . . . . . . 
                . . . . 7 7 7 . . . . . . . . . 
                . . . . 7 7 . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, 0, randint(scene.screenHeight(), 10))
            heart2.setPosition(randint(scene.screenWidth(), 10), 0)
            heart2.setKind(SpriteKind.heart)
            heart2.setFlag(SpriteFlag.AutoDestroy, true)
        }
    }
    if (damage_modifier == 0.001) {
        statusbar.value += -2
    }
})

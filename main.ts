// function to create ball
function createBall () {
    ballSpeed = -50
    ball = sprites.create(assets.image`obj_ball`, SpriteKind.Projectile)
    ball.setVelocity(ballSpeed, ballSpeed)
    ball.setPosition(80, 89)
    ball.setBounceOnWall(true)
}
// function to create coin
function createCoin () {
    coin = sprites.create(assets.image`spr_coinNoAnim`, SpriteKind.Food)
    coin.setFlag(SpriteFlag.AutoDestroy, true)
    animation.runImageAnimation(
    coin,
    assets.animation`spr_coin`,
    200,
    true
    )
    coin.setPosition(randint(0, scene.screenWidth()), 0)
    coin.setVelocity(0, 50)
}
// ball collision with paddle
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Player, function (sprite, otherSprite) {
    ball.setVelocity(randint(100, -100), ballSpeed)
    music.knock.play()
    scene.cameraShake(2, 500)
    ball.startEffect(effects.ashes)
    info.changeScoreBy(10)
})
// coin pickup
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    sprite.destroy()
    sprite.startEffect(effects.disintegrate)
    music.baDing.play()
    info.changeScoreBy(20)
})
// function to destroy ball
function destroyBall () {
    ball.destroy()
    info.changeLifeBy(-1)
    music.wawawawaa.play()
    pause(2000)
    createBall()
}
// game over
info.onLifeZero(function () {
    game.over(false)
})
// init
// created by @leozlk (2023)
// 
let coin: Sprite = null
let ball: Sprite = null
let ballSpeed = 0
game.splash("Created by @Leozlk", "- 2023 -")
info.setScore(0)
info.setLife(2)
let obj_player = sprites.create(assets.image`spr_player`, SpriteKind.Player)
obj_player.setPosition(79, 100)
scene.setBackgroundImage(assets.image`bkg_00`)
createBall()
// controls and ball destroy
game.onUpdate(function () {
    // Initialize player's controls
    controller.moveSprite(obj_player, 100, 0)
    // Ball Destroy at bottom of screen
    if (ball.y >= 117) {
        destroyBall()
    }
})
// once x(time) seconds increase ball speed (difficulty)
game.onUpdateInterval(5000, function () {
    ballSpeed += -10
})
// coin spawn every randomRange(x,y)seconds
game.onUpdateInterval(randint(500, 1000), function () {
    createCoin()
})

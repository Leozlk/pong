def createBall():
    global ball
    ball = sprites.create(assets.image("""
        obj_ball
    """), SpriteKind.projectile)
    ball.set_position(80, 89)
    ball.set_velocity(-50, -50)
    ball.set_bounce_on_wall(True)

def on_on_overlap(sprite, otherSprite):
    ball.set_velocity(randint(50, -50), -50)
    music.knock.play()
    scene.camera_shake(2, 500)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.player, on_on_overlap)

def destroyBall():
    ball.destroy()
    music.wawawawaa.play()
    pause(2000)
    createBall()
ball: Sprite = None
mySprite = sprites.create(assets.image("""
    obj_player
"""), SpriteKind.player)
mySprite.set_position(79, 100)
scene.set_background_image(assets.image("""
    bkg_00
"""))
createBall()

def on_on_update():
    # Initialize player's controls
    controller.move_sprite(mySprite, 100, 0)
    # Ball Destroy at bottom of screen
    if ball.y >= 117:
        destroyBall()
game.on_update(on_on_update)

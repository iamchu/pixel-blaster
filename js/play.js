var play = function(){}

// For debugging purposes, uncomment the following line
// var obstacles = []

play.prototype = {
	create:function()
	{	

		var w = this.game.width
		var h = this.game.height

		this.cursor = this.game.input.keyboard.createCursorKeys()
		this.physics.startSystem(Phaser.Physics.ARCADE)

		// Player
		this.player = this.game.add.sprite(this.game.width/2, h-40, 'player')
		this.game.physics.enable(this.player, Phaser.Physics.ARCADE)
		this.player.enableBody = true
		this.player.body.collideWorldBounds = true
		this.player.anchor.setTo(.5,.5)
		// this.player.body.setSize(20,30)

		// Stars
		var emitter = this.game.add.emitter(this.game.world.centerX, 0, 200)
		emitter.alpha = 0.8
		emitter.width = this.game.world.width
		emitter.makeParticles('star')
		emitter.minParticleScale = 0.1
		emitter.maxParticleScale = 0.5
		emitter.setYSpeed(100, 300)
		emitter.setXSpeed(0, 0)
		emitter.minRotation = 0
		emitter.maxRotation = 0
		emitter.start(false, 7000, 100, 0)
		emitter.gravity = 0

		// Enemies
		this.enemies = this.game.add.group()
		
		// Explosion
	    this.explosion = this.game.add.emitter(0, 0, 50)
	    this.explosion.makeParticles('pixel')
	    this.explosion.setYSpeed(-150, 150)
		this.explosion.setXSpeed(-150, 150)
	    this.explosion.gravity = 0

	    // Powerup // Function createMultiple creates multiple instances all at once (more efficient)
	    this.powerups = this.game.add.group()
	    this.powerups.createMultiple(10, 'powerup')
	    this.powerups.setAll('checkWorldBounds', true)
	    this.powerups.setAll('outOfBoundsKill', true)

	    // Enemy bullets 
	    this.enemy_bullets = this.game.add.group()
	    this.enemy_bullets.createMultiple(100, 'enemy_bullet')
	    this.enemy_bullets.setAll('checkWorldBounds', true)
	    this.enemy_bullets.setAll('outOfBoundsKill', true)

	    // Player bullets
	    this.player_bullets = this.game.add.group()
	    this.player_bullets.createMultiple(100, 'player_bullet')
	    this.player_bullets.setAll('checkWorldBounds', true)	
	    this.player_bullets.setAll('outOfBoundsKill', true)	

		// Score text
		this.score = 0
		this.bmpText = this.game.add.bitmapText(this.game.width/2, 100, 'fontUsed', '', 150)
		this.bmpText.anchor.setTo(.5,.5)
		this.bmpText.scale.setTo(.3,.3)
		
		// Sounds
		// this.sound.score = this.game.add.audio('score')
		// this.sound.score.volume = .4

		// Death sound
		// this.sound.kill = this.game.add.audio('kill')

		// Music
		// this.music = this.game.add.sound('music')
		// this.music.play('', 0, 0.5, true)

		// Init vars
		this.enemyTime = this.game.time.now + 2000
		this.fireTime = 0
		this.bonusTime = 0
		this.bonusType = 1
		this.bulletTime = this.game.time.now + 5000
		this.nextBonus = 1
		score = 0

		// Support for mouse click and touchscreen input
		this.game.input.onDown.add(this.onDown, this)

		this.pauseAndUnpause(this.game)

		},

	update:function()
	{
		this.bmpText.text = score

		// Collision
		this.game.physics.arcade.overlap(this.player, this.powerups, this.takePowerup, null, this)
		this.game.physics.arcade.overlap(this.player, this.enemies, this.killPlayer, null, this)
		this.game.physics.arcade.overlap(this.player, this.enemy_bullets, this.hitPlayer, null, this)
		this.game.physics.arcade.overlap(this.enemies, this.player_bullets, this.hitEnemy, null, this)

		this.move()
	},

	takePowerup:function()
	{

	},

	playerFire:function()
	{

	},

	enemyFire:function()
	{

	},

	// Creates one bullet
	oneFire:function(x,y,angle)
	{

	},

	newEnemy:function()
	{

	},

	hitEnemy:function()
	{

	},

	hitPlayer:function()
	{

	},


	killPlayer:function(player,thing)
	{
		this.game.plugins.screenShake.shake(20)
		player.kill()
		this.game.state.start('gameOver')
	},


	// Move player
	move:function()
	{
		this.player.body.velocity.x = 0
		this.player.body.velocity.y = 0

		if (this.cursor.left.isDown)
	        this.player.body.velocity.x = -350
	    else if (this.cursor.right.isDown)
	        this.player.body.velocity.x = 350
	    if (this.cursor.up.isDown)
	        this.player.body.velocity.y = -350
	    else if (this.cursor.down.isDown)
	        this.player.body.velocity.y = 350

	    if (this.isFiring)
	    	this.player.body.velocity.x *= 0.5

		if(this.game.input.activePointer.isDown){}
		else{}
	},

	pauseAndUnpause:function(game)
	{
		var pause_button = this.game.add.sprite(this.game.width - 40, 40, 'pause')
		pause_button.anchor.setTo(.5,.5)
		pause_button.inputEnabled = true
		// pause:
		pause_button.events.onInputUp.add(
			function()
			{
				if(!game.paused)
				{
					game.paused = true
				}
				pause_watermark = this.game.add.sprite(this.game.width/2, this.game.height/2, 'pause')
				pause_watermark.anchor.setTo(.5,.5)
				pause_watermark.alpha = .1
			}, this)
		// Unpause:
		game.input.onDown.add( 
			function()
			{
				if(game.paused)
				{
					game.paused = false
					pause_watermark.destroy()
				}
			} , self)
	},	

	render:function()
	{
		debug = true
		if(debug)
		{
		    // Show hitbox
		    this.game.debug.body(this.player)


		    // for(var i=0  ; i<obstacles.length ; i++)
		    // {
		    	// this.game.debug.body(obstacles[i])
		    // }
		}
	},

	scorePoint:function(obstacle){},

	// Tap on touchscreen or click with mouse
	onDown:function(pointer){},
}


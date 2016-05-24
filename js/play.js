var play = function(){}

// For debugging purposes, uncomment the following line
// var obstacles = []

play.prototype = {
	create:function()
	{	

		w = this.game.width
		h = this.game.height

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
	    this.explosion.alpha = 0.8
	    this.explosion.minParticleScale = 0.1
	    this.explosion.maxParticleScale = 0.8
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

	    // Bullets
	    this.bullets = this.game.add.group()
	    this.bullets.createMultiple(100, 'player_bullet')
	    this.bullets.setAll('checkWorldBounds', true)	
	    this.bullets.setAll('outOfBoundsKill', true)	

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
		this.fireTime = 0
		this.bonusTime = 0
		this.weaponType = 1
		this.nextBonus = 1
		this.lives = 3
		this.bulletTime = this.game.time.now + 5000
		this.spawnEnemyTime = this.game.time.now + 2000
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
		this.game.physics.arcade.overlap(this.player, this.enemies, this.hitPlayer, null, this)
		this.game.physics.arcade.overlap(this.player, this.enemy_bullets, this.hitPlayer, null, this)
		this.game.physics.arcade.overlap(this.enemies, this.player_bullets, this.hitEnemy, null, this)

		// Move player
		this.move()

		// Fire if player alive
		if(this.player.alive == true)
			this.playerFire()

		// Spawn enemy
	   	if (this.game.time.now > this.spawnEnemyTime) 
	   	{
			this.spawnEnemyTime = this.game.time.now + 500
	        this.newEnemy()
	    }
	},

	takePowerup:function()
	{

	},

	// Add new types of weapon here
	playerFire:function()
	{
		if (this.game.time.now < this.fireTime)
			return
		
		if (this.weaponType == 1) {
			this.fireTime = this.game.time.now + 200;
			this.onePlayerBullet(this.player.x-10, this.player.y-this.player.height/2, 0);
			this.onePlayerBullet(this.player.x+10, this.player.y-this.player.height/2, 0);
		}
		else if (this.weaponType == 2) {
			this.fireTime = this.game.time.now + 200;
			this.onePlayerBullet(this.player.x-5, this.player.y-this.player.height, -5);
			this.onePlayerBullet(this.player.x, this.player.y-this.player.height, -2);
			this.onePlayerBullet(this.player.x, this.player.y-this.player.height, 2);
			this.onePlayerBullet(this.player.x+5, this.player.y-this.player.height, 5);
		}
		else if (this.weaponType == 3) {
			this.fireTime = this.game.time.now + 20;
			this.onePlayerBullet(this.player.x, this.player.y-this.player.height/2, random(16)-8);
		}
		else if (this.weaponType == 4) {
			this.fireTime = this.game.time.now + 15;
			this.onePlayerBullet(this.player.x, this.player.y-this.player.height/2, random(100)-50, 2);			
		}
	},

	enemyFire:function()
	{

	},

	// Creates one bullet
	// x,y is the position to spawn the bullet
	onePlayerBullet:function(x,y,angle)
	{
		var player_bullet = this.player_bullets.getFirstDead();
		this.game.physics.arcade.enable(player_bullet);
		player_bullet.anchor.setTo(0.5, 1);
		player_bullet.body.setSize(player_bullet.width, player_bullet.height, 0, 0);
		// Resets the x,y coordinates of the bullet to the given parameters
		player_bullet.reset(x, y);
		player_bullet.angle = angle;
		// -90 to correct angle (the angle is calculated mod -180)
		this.game.physics.arcade.velocityFromAngle(player_bullet.angle-90, 500, player_bullet.body.velocity);
	},

	newEnemy:function()
	{
		var enemyType = random(2)
		if(enemyType == 0){
			var img = 'enemy1'
			var hp = 200
			var speed = 150
		}
		else if(enemyType == 1){
			var img = 'enemy2'
			var hp = 300
			var speed = 200
		}
		else if(enemyType == 2){
			var img = 'enemy3'
			var hp = 400
			var speed = 250
		}

		var enemy = this.enemies.create(random(w - 30), 0, img)
		this.game.physics.arcade.enable(enemy)
 		enemy.checkWorldBounds = true
	    enemy.outOfBoundsKill = true
	    enemy.anchor.setTo(0.5, 0.5)
	    enemy.body.velocity.y = speed
	    enemy.hp = hp
	    enemy.animations.add('move', [0, 1], 4, true)
	    enemy.animations.play('move')
	},

	hitEnemy:function(enemy,bullet)
	{
		bullet.alive = false
		if (!enemy.alive) return

		enemy.hp -= 10

		this.game.add.tween(enemy).to({y:enemy.y - 2}, 100).start()

		if(enemy.hp <= 0)
		{
			enemy.alive = false
			this.explosion.x = enemy.x
			this.explosion.y = enemy.y
			this.explosion.start(true, 1200, null, 15) // this.explosion.start(explode, lifespan, frequency, quantity, forceQuantity)
			this.game.add.tween(enemy.scale).to({x:0, y:0}, 100).start()
			enemy.body.velocity.y = 0
		}
	},

	hitPlayer: function(player, enemy) {
		enemy.kill()
		this.game.plugins.screenShake.shake(10)
		this.lives -= 1
		// this.livesLabel.text = this.lives
		// this.bonus = 5

		if (this.lives == 0) 
		{
			this.player.alive = false
			// Explosion and kill player
			this.explosion.x = this.player.x
			this.explosion.y = this.player.y-this.player.height/2
			this.explosion.start(true, 1200, null, 50) // this.explosion.start(explode, lifespan, frequency, quantity, forceQuantity)
			this.game.add.tween(this.explosion).to({alpha:0}, 1200).start()
			this.player.kill()

			this.game.time.events.add(1500, function(){
				// this.music.stop()
				this.game.state.start('gameOver')
			}, this)
		}

		this.game.stage.backgroundColor = '#fff'

		this.game.time.events.add(50, function(){
			this.game.stage.backgroundColor = BG_COLOR
		}, this)
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

		// if(this.game.input.activePointer.isDown){}
		// else{}
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

	// render:function()
	// {
	// 	debug = false
	// 	if(debug)
	// 	{
	// 	    // Show hitbox
	// 	    this.game.debug.body(this.player)


	// 	    // for(var i=0  ; i<obstacles.length ; i++)
	// 	    // {
	// 	    	// this.game.debug.body(obstacles[i])
	// 	    // }
	// 	}
	// },

	scorePoint:function(obstacle){},

	// Tap on touchscreen or click with mouse
	onDown:function(pointer){},
}


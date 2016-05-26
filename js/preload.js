var preload = function(){}

preload.prototype = {
	preload:function(){

		this.game.stage.backgroundColor = BG_COLOR

		var loading = this.add.sprite(this.game.width/2,this.game.height/2,'loading')
		loading.anchor.setTo(.5,.5)
		var loading_border = this.add.image(this.game.width/2,this.game.height/2,'loading_border')
		loading_border.anchor.setTo(.5,.5)
		this.load.setPreloadSprite(loading)
		
		this.load.image('star', 'images/star.png')
		this.load.image('pixel', 'images/pixel.png')
		this.load.image('pause', 'images/pause.png')
		this.load.image('player_bullet', 'images/bullet.png')
		this.load.image('player_bullet_long', 'images/long_beam.png')
		this.load.image('player', 'images/simple_ship_2.png')
		this.load.image('powerup', 'images/powerup_small.png')
		this.load.image('enemy_bullet', 'images/bullet_green_medium.png')
		this.load.spritesheet('enemy1', 'images/alien_1_8x7_big.png',40,35)
		this.load.spritesheet('enemy2', 'images/alien_2_10x9_big.png',50,45)
		this.load.spritesheet('enemy3', 'images/alien_4.png',25,30)

		// audio
		this.load.audio('music', 'sounds/aural.mp3')
		this.load.audio('hit_enemy', 'sounds/Hit_enemy.wav')
		this.load.audio('hit_player', 'sounds/Hit_Hurt.wav')
		this.load.audio('laser_shoot', 'sounds/Laser_Shoot.wav')
		this.load.audio('explosion', 'sounds/Explosion24.wav')
		this.load.audio('explosion_enemy', 'sounds/Explosion3.wav')

		// font
		this.game.load.bitmapFont('fontUsed', 'font/ganonwhite/font.png', 'font/ganonwhite/font.xml');

	},
	
	create:function(){
		this.game.state.start('mainMenu')
	}
}
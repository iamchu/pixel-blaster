var preload = function(){}

preload.prototype = {
	preload:function(){

		this.game.stage.backgroundColor = BG_COLOR

		var loading_border = this.add.image(this.game.width/2,this.game.height/2,'loading_border')
		loading_border.anchor.setTo(.5,.5)
		var loading = this.add.sprite(this.game.width/2,this.game.height/2,'loading')
		loading.anchor.setTo(.5,.5)
		this.load.setPreloadSprite(loading)
		
		this.load.image('star', 'images/star.png')
		this.load.image('pixel', 'images/pixel.png')
		this.load.image('pause', 'images/pause.png')
		this.load.image('player_bullet', 'images/bullet.png')
		this.load.image('player', 'images/simple_ship_2.png')
		this.load.image('powerup', 'images/powerup_small.png')
		this.load.image('enemy_bullet', 'images/bullet_green_medium.png')
		this.load.spritesheet('enemy1', 'images/alien_1_8x7_big.png',40,35)
		this.load.spritesheet('enemy2', 'images/alien_2_10x9_big.png',50,45)
		this.load.spritesheet('enemy3', 'images/alien_3_12x10_big.png',60,50)

		// audio
		// this.load.audio('bg_spin', 'sounds/spin_bg_music.mp3')
		// this.load.audio('bg_edm', 'sounds/edm_bg_music.mp3')
		// this.load.audio('score', 'sounds/score.wav')
		// this.load.audio('kill', 'sounds/kill.ogg')
		// this.load.audio('music', 'sounds/abstractionRapidAcrobatics.wav')

		// font
		this.game.load.bitmapFont('fontUsed', 'font/ganonwhite/font.png', 'font/ganonwhite/font.xml');

	},
	
	create:function(){
		this.game.state.start('mainMenu')
	}
}
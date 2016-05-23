// By ViTakahashi
var mainMenu = function(){}

mainMenu.prototype = {

	create:function(){

		var w = this.game.width
		var h = this.game.height

		// Title
		var logo = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 75)
		logo.text = GAMETITLE
		logo.anchor.setTo(0.5, 0.5)
		this.game.add.tween(logo).to({ y: h/2-80 }, 1000, Phaser.Easing.Bounce.Out).start()

		// Help
		var label = this.game.add.bitmapText(w/2, h-100, 'fontUsed', '', 27);
		label.text = '  use arrows or w,a,s,d \nto control the spaceship'
		label.anchor.setTo(0.5, 0.5)
		label.alpha = 0
		this.game.add.tween(label).delay(500).to({ alpha: 1}, 1000).start()
		this.game.add.tween(label).to({y: h-120}, 500).to({y: h-100}, 500).loop().start()

		// touch input
		this.game.input.onDown.add( listener, this)

		function listener(game)
		{
			this.game.state.start('play')
		}
	}
}
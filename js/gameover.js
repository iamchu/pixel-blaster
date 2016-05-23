var gameOver = function(){}

gameOver.prototype = {
	create:function(){
		this.game.stage.backgroundColor = BG_COLOR
		// Bg image
		this.bg = this.game.add.image(0,0,'bg')

		var w = this.game.width
		var h = this.game.height

		// Title
		var logo = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 75)
		logo.text = GAMETITLE
		logo.anchor.setTo(0.5, 0.5)
		this.game.add.tween(logo).to({ y: h/2-80 }, 1000, Phaser.Easing.Bounce.Out).start()
		
		if(score>BEST_SCORE)
		{
			var message = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 30)
			message.text = 'New record!!! \nYou scored ' + score + '\nTap to try again'
			message.anchor.setTo(0.5, 0.5)
			this.game.add.tween(message).to({ y: h/2-20 }, 1000, Phaser.Easing.Bounce.Out).start()
		}
		else
		{
			var message = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 30)
			message.text = 'Game Over \nYou scored: ' + score + '\nBest: ' + BEST_SCORE + '\nTap to try again'
			message.anchor.setTo(0.5, 0.5)
			this.game.add.tween(message).to({ y: h/2-20 }, 1000, Phaser.Easing.Bounce.Out).start()
		}

		if(score>BEST_SCORE)
		{
			BEST_SCORE = score
		}

		this.game.input.onDown.add(listener, this)
		function listener(game)
		{
			BG_COLOR = COLORS_PASTEL[Math.floor(Math.random()*(COLORS_PASTEL.length-1))]
			this.game.state.start('play')
		}
	}
}
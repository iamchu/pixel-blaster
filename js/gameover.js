var gameOver = function(){}

gameOver.prototype = {
	create:function(){

		this.cursor = this.game.input.keyboard.createCursorKeys()

		this.game.stage.backgroundColor = BG_COLOR

		var w = this.game.width
		var h = this.game.height

		// Title
		var logo = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 75)
		logo.text = GAMETITLE
		logo.anchor.setTo(0.5, 0.5)
		this.game.add.tween(logo).to({ y: h/2-150 }, 1000, Phaser.Easing.Bounce.Out).start()
			
		// New record/Game over
		if(score>BEST_SCORE)
		{
			var message = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 30)
			message.text = 'New record!!! \nYou scored ' + score
			message.anchor.setTo(0.5, 0.5)
			this.game.add.tween(message).to({ y: h/2-20 }, 1000, Phaser.Easing.Bounce.Out).start()
		}
		else
		{
			var message = this.game.add.bitmapText(w/2, -100, 'fontUsed', '', 30)
			message.text = 'Game Over \nYou scored: ' + score + '\nBest: ' + BEST_SCORE
			message.anchor.setTo(0.5, 0.5)
			this.game.add.tween(message).to({ y: h/2-20 }, 1000, Phaser.Easing.Bounce.Out).start()
		}

		if(score>BEST_SCORE)
		{
			BEST_SCORE = score
		}

		// Click to try again
		var label = this.game.add.bitmapText(w/2, h-100, 'fontUsed', '', 27);
		label.text = 'move to try again'
		label.anchor.setTo(0.5, 0.5)
		label.alpha = 0
		this.game.add.tween(label).delay(500).to({ alpha: 1}, 1000).start()
		this.game.add.tween(label).to({y: h-120}, 500).to({y: h-100}, 500).loop().start()

		this.game.input.onDown.add(listener, this)
		function listener(game)
		{
			this.game.state.start('play')
		}
	},

	update:function()
	{
		if (this.cursor.left.isDown || this.cursor.right.isDown || this.cursor.up.isDown || this.cursor.down.isDown)
			this.game.state.start('play')
	}
}
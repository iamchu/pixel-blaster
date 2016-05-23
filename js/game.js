var GAMETITLE = 'Pixel Blaster'
var BEST_SCORE = 0
var BG_COLOR = '#00001a'		
var BG_COLOR = '#000033'		
// var BG_COLOR = '#204060'		

window.onload = main()
function main()
{
	var game = new Phaser.Game(450, 550, Phaser.Canvas, "game")
	game.state.add("boot", boot)
	game.state.add("preload", preload)
	game.state.add("mainMenu", mainMenu)
	game.state.add("play", play)
	game.state.add("gameOver", gameOver)
	game.state.start("boot")
}

function random(n){ return Math.floor(Math.random()*(n+1)) }
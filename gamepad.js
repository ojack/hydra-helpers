
window.connectGamepads = (log = false) => {
    window._gamepads?.stop()
	window.game = new Array(4).fill(0).map(() => ({
			x: 0,
			y: 0,
      		z: 0,
      		w: 0,
			dx: 0,
			dy: 0,
      		dz: 0, 
      		dw: 0,
      		b: new Array(16).fill(0), //buttons
            buttons: new Array(16).fill(0),
            a: new Array(4).fill(4), //axes
            axes: new Array(4).fill(4),
            pad: null,
			active: false
		}))
	let loop = null

	const checkForPads = () => {
		const _gp = navigator.getGamepads()
		if(log) console.log(_gp)
		loop = requestAnimationFrame(checkForPads)
		_gp.forEach((pad, i) => {
			game[i].active = false
			if (pad !== null) {
		    	game[i].active = true
				game[i].dx = pad.axes[0] ?? 0
              	game[i].x -= (_gp[i].axes[0] * 0.002)
             	game[i].dy = pad.axes[1] ?? 0
             	game[i].y -= window.game[i].dy * 0.002
              	game[i].dz = pad.axes[2] ?? 0
             	game[i].z -= window.game[i].dz * 0.002
              	game[i].dw = pad.axes[3] ?? 0
             	game[i].w -= window.game[i].dw * 0.002
              	game[i].buttons = pad.buttons.map(_s => _s.value)
                game[i].b = game[i].buttons // alias for buttons
                game[i].axes = pad.axes
                game[i].a = game[i].axes // alias for axes
                game[i].pad = pad // raw gamepad object
            }
		})
     
	}

	checkForPads()
	window._gamepads = {
		stop: () => cancelAnimationFrame(loop)
	}
    window.stopGamepads = window._gamepads.stop
}

//_gamepads = connectGamepads()
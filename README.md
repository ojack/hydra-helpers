# hydra helpers

set of helpers for hydra 

## gamepad
[WIP] utility for using gamepads using the GamepadAPI

### Example usage
```javascript
await loadScript("https://cdn.jsdelivr.net/gh/ojack/hydra-helpers@latest/gamepad.js")

connectGamepads(false) // set to true to log gamepads to the console

shape()
  .scrollX(() => game[0].x) // set x position from initial axes
  .scrollY(() => game[0].y)
  .out()
```

Gamepads are accessibly using indices from 0 to 4, i.e. `game[0]` refers to the first game controller. To debug the configuration of a given controller, check out 
https://hardwaretester.com/gamepad

### Accessible properties 
The gamepad states are polled continuously, and raw data is stored in `game[0].pad`

There are also some helpers: 
#### Axes
The `axes` property of each pad is aliased as `dx`, `dy`, `dz`, and `dy`. these correspond to the values of the axis at any given moment.  For easier use in positioning, the cumulative values are stored as `x`, `y`, `z`, and `w`. 

#### Buttons
Raw button values are stored in the `buttons` (also aliased as `b` property of the gamepads). For example, to make a sketch change color when a button is pressed 

Change color based on first button
```javascript
await loadScript("https://cdn.jsdelivr.net/gh/ojack/hydra-helpers@latest/gamepad.js")

connectGamepads(false)

shape()
  .color(0, 1, 0)
  .hue(() => game[0].b[1]*0.2)
  .out()
```

### Disconnecting
You can disconnect from gamepads by calling `disconnectGamepads()`

## loading local images and videos
You can use local images and videos in the web editor by running a local server, and accessing the files using their public link. 

To do this, we will use nodejs to host a static server.

1. Install NodeJS (LTS version)
https://nodejs.org/en/download 

2. Open Terminal or a command line and paste the following (replacing path/to/folder with your actual folder)
```sh
npx http-server path/to/folder -p 8000 --cors
```
On osx and linux, you can get the path to the folder by dragging them into terminal. 

1. Run the following in the web editor (replacing `waves.png` with the name of your file)
```javascript
s0.initImage("http://localhost:8000/waves.png")

src(s0).out()
```

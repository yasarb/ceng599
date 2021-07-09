# Computational Geometry Algorithm Visualizations

## METU CENG599 Term Project

Yasar Budulgan - 2463941

This website provides an interactive platform to visualize computational geometry algorithms. The main focus of this project is the algorithms using sweep line technique.

<img src="https://raw.githubusercontent.com/yasarb/ceng599/master/assets/img/home.png?token=AB3XJYJ7DWPXEEGZRWJ4QJDA6BFUS" width="700px"/>


## Available Scripts

In the project directory, you can run:

### `yarn install`
Installs required dependencies.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\

## Project

Currently implemented algorithms:

* Line Segment Intersection
* Convex Hull (Graham's Scan)
* Voronoi Diagram (Bentley-Ottman) 

Each algorithm has 2 pages, code and readme, with an optional license file.

* Code.js
  This file contains the implementation of the algorithm.

* Readme.md
  This file contains general information about the algorithm.

* License.md
  This file contains the required license declarations for the implementation.

## Player

<img src="https://raw.githubusercontent.com/yasarb/ceng599/master/assets/img/playbar.png?token=AB3XJYIEHBAS5KYNRSWXO3TA6BG56" height="32px" />

### Play Button
<img src="https://raw.githubusercontent.com/yasarb/ceng599/master/assets/img/play.png?token=AB3XJYOZIUARBPC5DJZZUYTA6BHBQ" height="32px" />
<img src="https://raw.githubusercontent.com/yasarb/ceng599/master/assets/img/playing.png?token=AB3XJYI2ANSNTXR7B2RDLKTA6BHCA" height="32px" />

User can start the visualization by pressing the "Play" button. Once the visualization started, the button turns to "Playing". This version does not support Pause/Resume functionality. In order to advance the visualization, user can use the progress bar.


### Progress Bar
<img src="https://raw.githubusercontent.com/yasarb/ceng599/master/assets/img/progressbar.png?token=AB3XJYOF7YYT7E22YVLN7STA6BHDW" height="32px" />

User can play the visualization back and forward using the progress bar. The left button plays the visualization backward and the right button plays forward. User can also drag the progress bar to play.

### Speed
<img src="https://raw.githubusercontent.com/yasarb/ceng599/master/assets/img/speed.png?token=AB3XJYMZDCWDV5WHSMUGFKLA6BHEW" height="32px" />

User can adjust the speed of the visualization by using this slider. The leftmost value in slider means the slowest and the rightmost value means the fastest visualization.

## Tools
<img src="https://raw.githubusercontent.com/yasarb/ceng599/master/assets/img/toolbar.png?token=AB3XJYNPLMXMCB76SVR2QXTA6BHF2" height="32px" />

### Random
  This button clears the scene and adds new randomly generated input data.

### Reset
  This button resets the progress. Input data is preserved.

### Clear
  This button clears the scene. User can add custom data by clicking the canvas. In order to add a point, one click to canvas is required. For drawing a line, two clicks are required. After the second click, line will be visible.

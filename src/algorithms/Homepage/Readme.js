module.exports = {
  content: `# Computational Geometry Algorithm Visualizations

## METU CENG599 Term Project

Yasar Budulgan - 2463941

This website provides an interactive platform to visualize computational geometry algorithms. The main focus of this project is the algorithms using sweep line technique.

<img src="https://github.com/yasarb/ceng599/blob/65b5be7f998cae45998f4cd37af71475f77a7c79/assets/img/home.png" width="700px"/>

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

<img src="https://github.com/yasarb/ceng599/blob/65b5be7f998cae45998f4cd37af71475f77a7c79/assets/img/playbar.png" height="32px" />

### Play Button
<img src="https://github.com/yasarb/ceng599/blob/65b5be7f998cae45998f4cd37af71475f77a7c79/assets/img/play.png" height="32px" />
<img src="https://github.com/yasarb/ceng599/blob/65b5be7f998cae45998f4cd37af71475f77a7c79/assets/img/playing.png" height="32px" />

User can start the visualization by pressing the "Play" button. Once the visualization started, the button turns to "Playing". This version does not support Pause/Resume functionality. In order to advance the visualization, user can use the progress bar.


### Progress Bar
<img src="https://github.com/yasarb/ceng599/blob/65b5be7f998cae45998f4cd37af71475f77a7c79/assets/img/progressbar.png" height="32px" />

User can play the visualization back and forward using the progress bar. The left button plays the visualization backward and the right button plays forward. User can also drag the progress bar to play.

### Speed
<img src="https://github.com/yasarb/ceng599/blob/65b5be7f998cae45998f4cd37af71475f77a7c79/assets/img/speed.png" height="32px" />

User can adjust the speed of the visualization by using this slider. The leftmost value in slider means the slowest and the rightmost value means the fastest visualization.

## Tools
<img src="https://github.com/yasarb/ceng599/blob/65b5be7f998cae45998f4cd37af71475f77a7c79/assets/img/toolbar.png" height="32px" />

### Random
  This button clears the scene and adds new randomly generated input data.

### Reset
  This button resets the progress. Input data is preserved.

### Clear
  This button clears the scene. User can add custom data by clicking the canvas. In order to add a point, one click to canvas is required. For drawing a line, two clicks are required. After the second click, line will be visible.

`,
}

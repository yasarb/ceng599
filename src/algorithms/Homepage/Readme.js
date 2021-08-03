module.exports = {
  content: `# Computational Geometry Algorithm Visualizations

## METU CENG599 Term Project

Yasar Budulgan - 2463941

This website provides an interactive platform to visualize computational geometry algorithms. The main focus of this project is the algorithms using sweep line technique.

<img src="https://res.cloudinary.com/yasarb/image/upload/v1628003540/Algoviz/home_ujixhn.png" width="700px"/>

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

<img src="https://res.cloudinary.com/yasarb/image/upload/v1628003537/Algoviz/playbar_ah6nit.png" height="32px" />

### Play Button
<img src="https://res.cloudinary.com/yasarb/image/upload/v1628003537/Algoviz/play_d3rbvr.png" height="32px" />
<img src="https://res.cloudinary.com/yasarb/image/upload/v1628003536/Algoviz/playing_nggr5g.png" height="32px" />

User can start the visualization by pressing the "Play" button. Once the visualization started, the button turns to "Playing". This version does not support Pause/Resume functionality. In order to advance the visualization, user can use the progress bar.


### Progress Bar
<img src="https://res.cloudinary.com/yasarb/image/upload/v1628003538/Algoviz/progressbar_yheyrn.png" height="32px" />

User can play the visualization back and forward using the progress bar. The left button plays the visualization backward and the right button plays forward. User can also drag the progress bar to play.

### Speed
<img src="https://res.cloudinary.com/yasarb/image/upload/v1628003537/Algoviz/speed_y21qyz.png" height="32px" />

User can adjust the speed of the visualization by using this slider. The leftmost value in slider means the slowest and the rightmost value means the fastest visualization.

## Tools
<img src="https://res.cloudinary.com/yasarb/image/upload/v1628003537/Algoviz/toolbar_occz5t.png" height="32px" />

### Random
  This button clears the scene and adds new randomly generated input data.

### Reset
  This button resets the progress. Input data is preserved.

### Clear
  This button clears the scene. User can add custom data by clicking the canvas. In order to add a point, one click to canvas is required. For drawing a line, two clicks are required. After the second click, line will be visible.

`,
}

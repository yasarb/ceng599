module.exports = {
  content: `Copyright 2010 Raymond Hill

Author: Raymond Hill
File: rhill-voronoi.js
Version: 0.9
Date: Sep. 12, 2010
Description: This is my personal Javascript implementation of
Steven Fortune's algorithm to generate Voronoi diagrams.

Portions of this software use, or depend on the work of:

* "Fortune's algorithm" by Steven Fortune: For his clever
  algorithm to compute Voronoi diagrams.
  http://ect.bell-labs.com/who/sjf/

* Alec McEachran's code to translate a parabola's focus &
  directrix into parameters for HTML5 canvas' quadraticCurveTo() method.
  http://alecmce.com/as3/parabolas-and-quadratic-bezier-curves

* "The Liang-Barsky line clipping algorithm in a nutshell!", to
  efficiently clip a line within a rectangle.
  http://www.skytopia.com/project/articles/compsci/clipping.html

* "Event properties / Mouse position" by Peter-Paul Koch, for
  his code snippet on how to correctly detect mouse coordinates.
  http://www.quirksmode.org/js/events_properties.html#position

Permission to use, copy, modify, and distribute this software for any
purpose without fee is hereby granted, provided that this entire notice
is included in all copies of any software which is or includes a copy
or modification of this software and in all copies of the supporting
documentation for such software.

THIS SOFTWARE IS BEING PROVIDED "AS IS", WITHOUT ANY EXPRESS OR IMPLIED
WARRANTY.  IN PARTICULAR, NEITHER THE AUTHORS NOR AT&T MAKE ANY
REPRESENTATION OR WARRANTY OF ANY KIND CONCERNING THE MERCHANTABILITY
OF THIS SOFTWARE OR ITS FITNESS FOR ANY PARTICULAR PURPOSE.

Update:

2011-02-14:
  Lower epsilon from 1e-5 to 1e-4, to fix problem reported at
  http://www.raymondhill.net/blog/?p=9#comment-1414
  `,
};

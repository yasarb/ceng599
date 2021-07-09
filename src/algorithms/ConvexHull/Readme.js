module.exports = {
  content: `# Convex Hull (Graham's Scan)

The **convex hull** or **convex envelope** or **convex closure** of a shape is the smallest convex set that contains it. The convex hull may be defined either as the intersection of all convex sets containing a given subset of a Euclidean space, or equivalently as the set of all convex combinations of points in the subset. For a bounded subset of the plane, the convex hull may be visualized as the shape enclosed by a rubber band stretched around the subset.

![ConvexHull1](https://raw.githubusercontent.com/yasarb/ceng599/master/assets/img/convexhull.png?token=AB3XJYJNY2DRGBC5YD6QXO3A6E5QQ)

## Graham's Scan Algorithm
**Graham's scan** is a method of finding the convex hull of a finite set of points in the plane with time complexity *O(n log n)*. It is named after Ronald Graham, who published the original algorithm in 1972. The algorithm finds all vertices of the convex hull ordered along its boundary. It uses a stack to detect and remove concavities in the boundary efficiently.

### Time Complexity

Sorting the points has time complexity *O(n log n)*. While it may seem that the time complexity of the loop is <i>O(n<sup>2</sup>)</i>, because for each point it goes back to check if any of the previous points make a "right turn", it is actually *O(n)*, because each point is considered at most twice in some sense. Each point can appear only once as a point <i>(x<sub>2</sub>, y<sub>2</sub>)</i> in a "left turn" (because the algorithm advances to the next point (x<sub>3</sub>, y<sub>3</sub>) after that), and as a point <i>(x<sub>2</sub>, y<sub>2</sub>)</i> in a "right turn" (because the point <i>(x<sub>2</sub>, y<sub>2</sub>)</i> is removed). The overall time complexity is therefore *O(n log n)*, since the time to sort dominates the time to actually compute the convex hull.

References:

* [Convex Hull Wikipedia](https://en.wikipedia.org/wiki/Convex_hull)
* [Graham's Scan Wikipedia](https://en.wikipedia.org/wiki/Graham_scan)


`,
};

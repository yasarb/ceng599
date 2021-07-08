module.exports = {
  content: `# Voronoi Diagram

A **Voronoi diagram** is a partition of a plane into regions close to each of a given set of objects. In the simplest case, these objects are just finitely many points in the plane (called seeds, sites, or generators). For each seed there is a corresponding region, called a **Voronoi cell**, consisting of all points of the plane closer to that seed than to any other. The Voronoi diagram of a set of points is dual to its Delaunay triangulation.
  
![Voronoi](https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Euclidean_Voronoi_diagram.svg/440px-Euclidean_Voronoi_diagram.svg.png)

## Fortune's Algorithm

**Fortune's algorithm** is a sweep line algorithm for generating a Voronoi diagram from a set of points in a plane using *O(n log n)* time and *O(n)* space. It was originally published by Steven Fortune in 1986 in his paper "A sweepline algorithm for Voronoi diagrams."

![Fortune](https://upload.wikimedia.org/wikipedia/commons/0/0c/Fortunes-algorithm-slowed.gif)


### Time complexity

There are *O(n)* events to process (each being associated with some feature of the Voronoi diagram) and *O(log n)* time to process an event (each consisting of a constant number of binary search tree and priority queue operations) the total time is *O(n log n)*.

References:

* [Voronoi Diagram Wikipedia](https://en.wikipedia.org/wiki/Voronoi_diagram)
* [Fortune's Algorithm Wikipedia](https://en.wikipedia.org/wiki/Fortune%27s_algorithm)


`,
};

module.exports = {
  content: `# Line Segment Intersection
  
The **multiple line segment intersection** problem supplies a list of line segments in the Euclidean plane and asks whether any two of them intersect (cross).

Simple algorithms examine each pair of segments. However, if a large number of possibly intersecting segments are to be checked, this becomes increasingly inefficient since most pairs of segments are not close to one another in a typical input sequence. The most common, and more efficient, way to solve this problem for a high number of segments is to use a sweep line algorithm, where we imagine a line sliding across the line segments and we track which line segments it intersects at each point in time using a dynamic data structure based on binary search trees. The Shamos–Hoey algorithm applies this principle to solve the line segment intersection detection problem, as stated above, of determining whether or not a set of line segments has an intersection; the Bentley–Ottmann algorithm works by the same principle to list all intersections in logarithmic time per intersection.  

<img src="https://github.com/yasarb/ceng599/blob/65b5be7f998cae45998f4cd37af71475f77a7c79/assets/img/lineseg.png" width="500px" />

## Bentley–Ottmann Algorithm

The **Bentley–Ottmann algorithm** is a sweep line algorithm for listing all crossings in a set of line segments, i.e. it finds the intersection points (or, simply, intersections) of line segments. It extends the Shamos–Hoey algorithm, a similar previous algorithm for testing whether or not a set of line segments has any crossings. 

The algorithm was initially developed by Jon Bentley and Thomas Ottmann (1979); it is described in more detail in the textbooks Preparata & Shamos (1985), O'Rourke (1998), and de Berg et al. (2000). Although asymptotically faster algorithms are now known by Chazelle & Edelsbrunner (1992) and Balaban (1995), the Bentley–Ottmann algorithm remains a practical choice due to its simplicity and low memory requirements.

### Time complexity

The Bentley–Ottmann algorithm processes a sequence of *2n+k* events, where *n* denotes the number of input line segments and *k* denotes the number of crossings. Each event is processed by a constant number of operations in the binary search tree and the event queue, and (because it contains only segment endpoints and crossings between adjacent segments) the event queue never contains more than *3n* events. All operations take time *O(log n)*. Hence the total time for the algorithm is *O((n + k) log n)*.

References:

* [Line Segment Intersection Wikipedia](https://en.wikipedia.org/wiki/Multiple_line_segment_intersection)
* [Bentley–Ottmann Algorithm Wikipedia](https://en.wikipedia.org/wiki/Bentley%E2%80%93Ottmann_algorithm)



`,
};

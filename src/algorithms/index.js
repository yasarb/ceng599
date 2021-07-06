import {default as LineSegmentIntersectionRenderer } from './LineSegmentIntersection/LineSegmentIntersection.rd3';
import {default as LineSegmentIntersectionCode } from './LineSegmentIntersection/LineSegmentIntersection.code';
import {default as ConvexHullRenderer } from './ConvexHull/ConvexHull.rd3.js';
import {default as ConvexHullCode } from './ConvexHull/ConvexHull.code';
import {default as VoronoiRenderer } from './Voronoi/Voronoi.rd3';
import {default as VoronoiCode } from './Voronoi/Voronoi.code';

const algoMapping = [
  {
    key: 'line-segment-intersection',
    name: 'Line Segment Intersection'
  },
  {
    key: 'convex-hull',
    name: 'Convex Hull'
  },
  {
    key: 'voronoi',
    name: 'Voronoi Diagrams'
  },
];

export const AlgorithmService = {

  listAlgoNames: () => {
    return algoMapping;
  },
  getAlgoTitle: (algorithmKey) => {
    return Object.assign({}, ...algoMapping.map((x) => ({[x.key]: x.name})))[algorithmKey];
  },
  getAlgoCode: (algorithmKey) => {
    const mapping = {
      'line-segment-intersection': LineSegmentIntersectionCode,
      'convex-hull': ConvexHullCode,
      'voronoi': VoronoiCode,
    };

    return mapping[algorithmKey];
  },
  getAlgoRenderer: (algorithmKey) => {
    const mapping = {
      'line-segment-intersection': LineSegmentIntersectionRenderer,
      'convex-hull': ConvexHullRenderer,
      'voronoi': VoronoiRenderer,
    };

    return mapping[algorithmKey];
  },
};

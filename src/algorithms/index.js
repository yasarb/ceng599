import {default as LineSegmentIntersectionRenderer } from './LineSegmentIntersection/LineSegmentIntersection.rd3';
import {default as ConvexHullRenderer } from './ConvexHull/ConvexHull.rd3.js';
import {default as VoronoiRenderer } from './Voronoi/Voronoi.rd3';

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
  getAlgoRenderer: (algorithmKey) => {
    const mapping = {
      'line-segment-intersection': LineSegmentIntersectionRenderer,
      'convex-hull': ConvexHullRenderer,
      'voronoi': VoronoiRenderer,
    };

    return mapping[algorithmKey];
  },
  getAlgoPages: (algorithmKey) => {
    let codeFile, licenseFile, readmeFile;

    switch (algorithmKey) {
      case 'line-segment-intersection':
        codeFile = require('./LineSegmentIntersection/Code').content;
        licenseFile = require('./LineSegmentIntersection/License').content;
        readmeFile = require('./LineSegmentIntersection/Readme').content;
        break;
      case 'convex-hull':
        codeFile = require('./ConvexHull/Code').content;
        licenseFile = require('./ConvexHull/License').content;
        readmeFile = require('./ConvexHull/Readme').content;
        break;
      case 'voronoi':
        codeFile = require('./Voronoi/Code').content;
        licenseFile = require('./Voronoi/License').content;
        readmeFile = require('./Voronoi/Readme').content;
        break;
      default:
        readmeFile = require('./Homepage/Readme').content;
        break;
    }

    if (algorithmKey) {
      const data = {};

      if (licenseFile) {
        data['license'] = {
          'key': 'license',
          'name': 'License.md',
          'type': 'markdown',
          'content': licenseFile
        };
      }

      if (codeFile) {
        data['code'] = {
          'key': 'code',
          'name': 'Code.js',
          'type': 'javascript',
          'content': codeFile
        };
      }

      if (readmeFile) {
        data['readme'] = {
          'key': 'readme',
          'name': 'Readme.md',
          'type': 'markdown',
          'content': readmeFile
        };
      }

      return data;
    }

    return null;
  }
};

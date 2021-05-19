import {default as CalculatorRenderer } from './Calculator/Calculator.rd3';
import {default as CalculatorCode } from './Calculator/Calculator.code';
import {default as ConvexHullRenderer } from './ConvexHull/ConvexHull.rd3';
import {default as ConvexHullCode } from './ConvexHull/ConvexHull.code';

const algoMapping = [
  {
    key: 'calculator',
    name: 'Calculator'
  },
  {
    key: 'convex-hull',
    name: 'Convex Hull'
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
      'calculator': CalculatorCode,
      'convex-hull': ConvexHullCode,
    };

    return mapping[algorithmKey];
  },
  getAlgoRenderer: (algorithmKey) => {
    const mapping = {
      'calculator': CalculatorRenderer,
      'convex-hull': ConvexHullRenderer,
    };

    return mapping[algorithmKey];
  },

};

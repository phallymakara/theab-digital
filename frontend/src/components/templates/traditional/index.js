import React from 'react';
import { TraditionalBadgeComponent } from './TraditionalBadgeComponent';

const RoyalGoldTemplate = React.lazy(() => import('./RoyalGoldTemplate').then(m => ({ default: m.RoyalGoldTemplate || m.default })));
const AngkorHeritageTemplate = React.lazy(() => import('./AngkorHeritageTemplate').then(m => ({ default: m.AngkorHeritageTemplate || m.default })));
const IvoryParchmentTemplate = React.lazy(() => import('./IvoryParchmentTemplate').then(m => ({ default: m.IvoryParchmentTemplate || m.default })));
const RoyalPavilionTemplate = React.lazy(() => import('./RoyalPavilionTemplate').then(m => ({ default: m.RoyalPavilionTemplate || m.default })));
const AngkorPedimentTemplate = React.lazy(() => import('./AngkorPedimentTemplate').then(m => ({ default: m.AngkorPedimentTemplate || m.default })));
const IndigoHolTemplate = React.lazy(() => import('./IndigoHolTemplate').then(m => ({ default: m.IndigoHolTemplate || m.default })));
const PhkachanSlathorTemplate = React.lazy(() => import('./PhkachanSlathorTemplate').then(m => ({ default: m.PhkachanSlathorTemplate || m.default })));
const RoyalLacquerTemplate = React.lazy(() => import('./RoyalLacquerTemplate').then(m => ({ default: m.RoyalLacquerTemplate || m.default })));
const CrimsonAngkoreachTemplate = React.lazy(() => import('./CrimsonAngkoreachTemplate').then(m => ({ default: m.CrimsonAngkoreachTemplate || m.default })));

export {
  RoyalGoldTemplate,
  AngkorHeritageTemplate,
  IvoryParchmentTemplate,
  RoyalPavilionTemplate,
  AngkorPedimentTemplate,
  IndigoHolTemplate,
  PhkachanSlathorTemplate,
  RoyalLacquerTemplate,
  CrimsonAngkoreachTemplate,
  TraditionalBadgeComponent
};

export const TRADITIONAL_TEMPLATES = {
  'royal-gold': RoyalGoldTemplate,
  'angkor-heritage': AngkorHeritageTemplate,
  'angkor-ancient-royalty': AngkorHeritageTemplate,
  'ivory-parchment': IvoryParchmentTemplate,
  'traditional-ivory-parchment': IvoryParchmentTemplate,
  'royal-pavilion': RoyalPavilionTemplate,
  'traditional-royal-pavilion': RoyalPavilionTemplate,
  'angkor-pediment': AngkorPedimentTemplate,
  'traditional-angkor-pediment': AngkorPedimentTemplate,
  'indigo-hol': IndigoHolTemplate,
  'traditional-indigo-hol': IndigoHolTemplate,
  'phkachan-slathor': PhkachanSlathorTemplate,
  'traditional-phkachan-slathor': PhkachanSlathorTemplate,
  'royal-lacquer': RoyalLacquerTemplate,
  'traditional-royal-lacquer': RoyalLacquerTemplate,
  'crimson-classic': CrimsonAngkoreachTemplate,
  'crimson-angkoreach': CrimsonAngkoreachTemplate,
  'traditional-crimson-angkoreach': CrimsonAngkoreachTemplate
};

export default TRADITIONAL_TEMPLATES;

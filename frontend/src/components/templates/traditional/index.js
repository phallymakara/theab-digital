import { RoyalLacquerTemplate } from './RoyalLacquerTemplate';
import { CrimsonAngkoreachTemplate } from './CrimsonAngkoreachTemplate';
import { IvoryParchmentTemplate } from './IvoryParchmentTemplate';
import { RoyalPavilionTemplate } from './RoyalPavilionTemplate';
import { AngkorPedimentTemplate } from './AngkorPedimentTemplate';
import { IndigoHolTemplate } from './IndigoHolTemplate';
import { PhkachanSlathorTemplate } from './PhkachanSlathorTemplate';
import { TraditionalBadgeComponent } from './TraditionalBadgeComponent';

export {
  RoyalLacquerTemplate,
  CrimsonAngkoreachTemplate,
  IvoryParchmentTemplate,
  RoyalPavilionTemplate,
  AngkorPedimentTemplate,
  IndigoHolTemplate,
  PhkachanSlathorTemplate,
  TraditionalBadgeComponent
};

export const TRADITIONAL_TEMPLATES = {
  'royal-gold': RoyalLacquerTemplate,
  'traditional-royal-lacquer': RoyalLacquerTemplate,
  'traditional-royal-gold': RoyalLacquerTemplate,
  'traditional-crimson-angkoreach': CrimsonAngkoreachTemplate,
  'crimson-angkoreach': CrimsonAngkoreachTemplate,
  'ivory-parchment': IvoryParchmentTemplate,
  'royal-pavilion': RoyalPavilionTemplate,
  'angkor-pediment': AngkorPedimentTemplate,
  'indigo-hol': IndigoHolTemplate,
  'phkachan-slathor': PhkachanSlathorTemplate
};

export default TRADITIONAL_TEMPLATES;

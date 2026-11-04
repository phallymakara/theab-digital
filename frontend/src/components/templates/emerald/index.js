import React from 'react';

const EmeraldPalaceHeritageTemplate = React.lazy(() => import('./EmeraldPalaceHeritageTemplate').then(m => ({ default: m.EmeraldPalaceHeritageTemplate || m.default })));
const EmeraldRadiantDiamondTemplate = React.lazy(() => import('./EmeraldRadiantDiamondTemplate').then(m => ({ default: m.EmeraldRadiantDiamondTemplate || m.default })));
const EmeraldNatureHeirloomTemplate = React.lazy(() => import('./EmeraldNatureHeirloomTemplate').then(m => ({ default: m.EmeraldNatureHeirloomTemplate || m.default })));
const EmeraldGlasshouseMoonlightTemplate = React.lazy(() => import('./EmeraldGlasshouseMoonlightTemplate').then(m => ({ default: m.EmeraldGlasshouseMoonlightTemplate || m.default })));
const EmeraldNoirEditorialTemplate = React.lazy(() => import('./EmeraldNoirEditorialTemplate').then(m => ({ default: m.EmeraldNoirEditorialTemplate || m.default })));
const EmeraldMalachiteSealTemplate = React.lazy(() => import('./EmeraldMalachiteSealTemplate').then(m => ({ default: m.EmeraldMalachiteSealTemplate || m.default })));

export {
  EmeraldPalaceHeritageTemplate,
  EmeraldRadiantDiamondTemplate,
  EmeraldNatureHeirloomTemplate,
  EmeraldGlasshouseMoonlightTemplate,
  EmeraldNoirEditorialTemplate,
  EmeraldMalachiteSealTemplate
};

export const EMERALD_TEMPLATES = {
  'emerald-jade': EmeraldPalaceHeritageTemplate,
  'emerald-palace-heritage': EmeraldPalaceHeritageTemplate,
  'emerald-radiant-diamond': EmeraldRadiantDiamondTemplate,
  'emerald-nature-heirloom': EmeraldNatureHeirloomTemplate,
  'emerald-glasshouse-moonlight': EmeraldGlasshouseMoonlightTemplate,
  'emerald-glasshouse': EmeraldGlasshouseMoonlightTemplate,
  'emerald-noir-editorial': EmeraldNoirEditorialTemplate,
  'emerald-noir': EmeraldNoirEditorialTemplate,
  'emerald-malachite-seal': EmeraldMalachiteSealTemplate,
  'emerald-malachite': EmeraldMalachiteSealTemplate
};

export default EMERALD_TEMPLATES;

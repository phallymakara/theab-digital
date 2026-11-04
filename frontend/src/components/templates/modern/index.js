import React from 'react';

const ModernChampagneSilkTemplate = React.lazy(() => import('./ModernChampagneSilkTemplate').then(m => ({ default: m.ModernChampagneSilkTemplate || m.default })));
const ModernNoirDiamondTemplate = React.lazy(() => import('./ModernNoirDiamondTemplate').then(m => ({ default: m.ModernNoirDiamondTemplate || m.default })));
const ModernRoseGoldRoyaleTemplate = React.lazy(() => import('./ModernRoseGoldRoyaleTemplate').then(m => ({ default: m.ModernRoseGoldRoyaleTemplate || m.default })));
const ModernSapphireAzureTemplate = React.lazy(() => import('./ModernSapphireAzureTemplate').then(m => ({ default: m.ModernSapphireAzureTemplate || m.default })));
const ModernSageManorTemplate = React.lazy(() => import('./ModernSageManorTemplate').then(m => ({ default: m.ModernSageManorTemplate || m.default })));

export {
  ModernChampagneSilkTemplate,
  ModernNoirDiamondTemplate,
  ModernRoseGoldRoyaleTemplate,
  ModernSapphireAzureTemplate,
  ModernSageManorTemplate
};

export const MODERN_TEMPLATES = {
  'modern-champagne-silk': ModernChampagneSilkTemplate,
  'modern-noir-diamond': ModernNoirDiamondTemplate,
  'modern-noir': ModernNoirDiamondTemplate,
  'modern-luxury': ModernChampagneSilkTemplate,
  'modern-rosegold-royale': ModernRoseGoldRoyaleTemplate,
  'modern-sapphire-azure': ModernSapphireAzureTemplate,
  'modern-sage-manor': ModernSageManorTemplate
};

export default MODERN_TEMPLATES;

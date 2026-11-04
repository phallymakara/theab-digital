import React from 'react';

const RomdoulMoonlightTemplate = React.lazy(() => import('./RomdoulMoonlightTemplate').then(m => ({ default: m.RomdoulMoonlightTemplate || m.default })));
const BotanicalGlasshouseTemplate = React.lazy(() => import('./BotanicalGlasshouseTemplate').then(m => ({ default: m.BotanicalGlasshouseTemplate || m.default })));
const EditorialMagazineTemplate = React.lazy(() => import('./EditorialMagazineTemplate').then(m => ({ default: m.EditorialMagazineTemplate || m.default })));
const FloralRomanceTemplate = React.lazy(() => import('./FloralRomanceTemplate').then(m => ({ default: m.FloralRomanceTemplate || m.default })));
const GoldenOrchidTemplate = React.lazy(() => import('./GoldenOrchidTemplate').then(m => ({ default: m.GoldenOrchidTemplate || m.default })));
const KhmerBlossomTemplate = React.lazy(() => import('./KhmerBlossomTemplate').then(m => ({ default: m.KhmerBlossomTemplate || m.default })));

export {
  RomdoulMoonlightTemplate,
  BotanicalGlasshouseTemplate,
  EditorialMagazineTemplate,
  FloralRomanceTemplate,
  GoldenOrchidTemplate,
  KhmerBlossomTemplate
};

export const FLORAL_TEMPLATES = {
  'floral-romdoul-moonlight': RomdoulMoonlightTemplate,
  'romdoul-moonlight': RomdoulMoonlightTemplate,
  'floral-botanical-glasshouse': BotanicalGlasshouseTemplate,
  'botanical-glasshouse': BotanicalGlasshouseTemplate,
  'floral-editorial-magazine': EditorialMagazineTemplate,
  'editorial-magazine': EditorialMagazineTemplate,
  'floral-romance': FloralRomanceTemplate,
  'floral-golden-orchid': GoldenOrchidTemplate,
  'golden-orchid': GoldenOrchidTemplate,
  'floral-cambodian-blossom': KhmerBlossomTemplate,
  'khmer-blossom': KhmerBlossomTemplate
};

export default FLORAL_TEMPLATES;

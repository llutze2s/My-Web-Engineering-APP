import { createEinkaufsliste } from './Einkauf.js';
import { createRednerliste } from './Redner.js';
import { createSVGBezier } from './SVGBezier.js';
import { createSVGDiagram } from './SVGDiagram.js';
import { createSVGKalligraphie } from './SVGKalligraphie.js';

export default {
  title: 'Übungen/Module',
  argTypes: {},
};

const TemplateEinkauf = ({ label, ...args }) => {
  return createEinkaufsliste({ label, ...args });
};

export const Einkaufsliste = TemplateEinkauf.bind({});

const TemplateRedner = ({ label, ...args }) => {
  return createRednerliste({ label, ...args });
};

export const Rednerliste = TemplateRedner.bind({});

const TemplateSVGBezier = ({ label, ...args }) => {
  return createSVGBezier({ label, ...args });
};

export const SVGBezier = TemplateSVGBezier.bind({});

const TemplateSVGDiagram = ({ label, ...args }) => {
  return createSVGDiagram({ label, ...args });
};

export const SVGDiagram = TemplateSVGDiagram.bind({});

const TemplateSVGKalligraphie = ({ label, ...args }) => {
  return createSVGKalligraphie({ label, ...args });
};

export const SVGKalligraphie = TemplateSVGKalligraphie.bind({});
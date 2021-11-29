import { createEinkaufsliste } from './Einkauf.js';
import { createRednerliste } from './Redner';

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

import { Einkauf } from './modul_einkaufsliste';

export default {
    title: 'Übungen/Einkaufsliste',
    argTypes: {
    },
};
  
const Template = (args) => Einkauf(args);

export const Primary = Template.bind({});
Primary.args = {};
  

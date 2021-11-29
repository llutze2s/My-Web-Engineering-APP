import { Einkauf } from './modul_einkaufsliste';
import { html } from 'lit-html';

export default {
    title: 'Übungen/Einkaufsliste',
    component: Einkauf,
};
  
const Template = args => <Einkauf {...args} />;

export const Default = Template.bind({});

// import '../utils/config'

import Card from './HCard';
import Dropdown from './HDropdown';
// new
import HBtn from './HBtn';
import HBtnGroup from './HBtnGroup';
import HBtnToggle from './HBtnToggle';
import HCheckbox from './HCheckbox';
import HImg from './HImg';
import HInput from './HInput';
import HSelect from './HSelect';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    HCard: typeof Card;
    HDropdown: typeof Dropdown;
    // new
    HBtn: typeof HBtn;
    HBtnGroup: typeof HBtnGroup;
    HBtnToggle: typeof HBtnToggle;
    HCheckbox: typeof HCheckbox;
    HImg: typeof HImg;
    HInput: typeof HInput;
    HSelect: typeof HSelect;
  }
}

export { Card, Dropdown, Sidebar, HBtn, HBtnGroup, HBtnToggle, HCheckbox, HImg, HInput, HSelect };

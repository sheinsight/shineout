import _extends from "@babel/runtime/helpers/extends";
import React from 'react';
import Modal from '../Modal';

var Drawer = function Drawer(props) {
  return React.createElement(Modal, _extends({}, props, {
    drawer: true
  }));
};

Drawer.defaultProps = {
  position: 'right',
  width: 'auto'
};
Drawer.displayName = 'ShineoutDrawer';
Drawer.Submit = Modal.Submit;
export default Drawer;
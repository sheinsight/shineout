import * as React from 'react'
import Modal, { ModalProps } from '../Modal'

export interface DrawerProps extends ModalProps {}

declare class Drawer extends Modal{
    render(): JSX.Element;
}

export default Drawer

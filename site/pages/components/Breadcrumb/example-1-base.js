/**
 * cn - 基本用法
 * en - base
 */

import React from 'react';
import { Breadcrumb } from 'shineout';

const dataSource = [{
  title: 'HOME',
  url: '#',
}, {
  title: 'MENU',
}, {
  title: 'SELF',
}]

export default function () {
  return (
    <Breadcrumb dataSource={dataSource} />
  )
}

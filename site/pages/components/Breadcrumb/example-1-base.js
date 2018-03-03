/**
 * cn - 基本用法
 * en - base
 */

import React from 'react';
import { Breadcrumb } from 'shineout';

const data = [{
  id: '1',
  title: 'Home',
  url: '#',
}, {
  id: '2',
  title: 'Menu',
}, {
  id: '3',
  title: 'Self',
}]

export default function () {
  return (
    <Breadcrumb data={data} />
  )
}

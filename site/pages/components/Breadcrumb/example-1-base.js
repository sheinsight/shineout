/**
 * cn - 基本用法
 * en - base
 */

import React from 'react';
import { Breadcrumb } from 'shineout';

const data = [{
  title: 'Home',
  url: '#',
}, {
  title: 'Menu',
}, {
  title: 'Self',
}]

export default function () {
  return (
    <Breadcrumb data={data} />
  )
}

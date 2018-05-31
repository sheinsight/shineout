/**
 * cn - 基本用法
 * en - base
 */

import React from 'react';
import { Breadcrumb } from 'shineout';

const data = [{
  code: '1',
  ti: 'Home',
  ur: '#',
}, {
  code: '2',
  ti: 'Menu',
}, {
  code: '3',
  ti: 'Self',
}]

export default function () {
  return (
    <Breadcrumb keygen="code" data={data} title="ti" />
  )
}

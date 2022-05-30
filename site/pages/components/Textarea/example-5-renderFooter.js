/**
 * cn - 渲染底部信息
 *    -- 渲染 textarea footer
 * en - RenderFooter
 *    -- render textarea footer
 */
 import React from 'react'
 import { Textarea } from 'shineout'

 function renderFooter (){
     return <span>Tip : Hello SHEIN !</span>
 }
 
 export default function() {
   return <Textarea rows={6} renderFooter={renderFooter} placeholder="input something" />
 }
 
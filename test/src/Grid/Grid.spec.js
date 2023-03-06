import { mount } from 'enzyme'
import React from 'react'
import { Grid } from 'shineout'
import { baseTest } from '../../utils'

/* global SO_PREFIX */

describe('Grid[base]', () => {
  test('should custom set style and className', () => {
    baseTest(Grid, `.${SO_PREFIX}-grid`)
  })
})

describe('Grid[gutter]', () => {
  test('should set gutter', () => {
    const items = 4
    const gutter = 8
    const wrapper = mount(
      <Grid gutter={gutter}>
        {Array.from({ length: items })
          .map((_i, idx) => idx + 1)
          .map(i => (
            <Grid key={i}>{i}</Grid>
          ))}
      </Grid>
    )
    expect(wrapper.find(`.${SO_PREFIX}-grid-md-100-000`).children().length).toBe(items)
    wrapper
      .find(`.${SO_PREFIX}-grid-md-100-000`)
      .children()
      .forEach(i => {
        expect(i.getDOMNode().style.paddingLeft).toBe(`${gutter / 2}px`)
        expect(i.getDOMNode().style.paddingRight).toBe(`${gutter / 2}px`)
      })
  })
})

describe('Grid[responsive]', () => {
  test('should set responsive', () => {
    const responsive = ['sm', 'md', 'lg', 'xl']
    responsive.forEach(i => {
      const wrapper = mount(
        <Grid responsive={i}>
          <Grid>1</Grid>
          <Grid>2</Grid>
        </Grid>
      )
      expect(wrapper.find(`.${SO_PREFIX}-grid-${i}-100-000`).length).toBe(1)
    })
  })
})

describe('Grid[stretch]', () => {
  test('should set stretch', () => {
    const items = 4
    const height = 400
    const wrapper = mount(
      <Grid stretch style={{ height }}>
        {Array.from({ length: items })
          .map((_i, idx) => idx + 1)
          .map(i => (
            <Grid key={i}>{i}</Grid>
          ))}
      </Grid>
    )
    expect(wrapper.find(`.${SO_PREFIX}-grid-md-100-000`).children().length).toBe(items)
    wrapper
      .find(`.${SO_PREFIX}-grid-md-100-000`)
      .children()
      .forEach(i => {
        expect(i.getDOMNode().style.height).toBe('100%')
        expect(i.getDOMNode().style.minHeight).toBe('100%')
      })
  })
})

describe('Grid[width]', () => {
  test('should set width', () => {
    const width = 1 / 4
    const wrapper = mount(
      <Grid width={width}>
        <Grid>1</Grid>
        <Grid>2</Grid>
      </Grid>
    )
    const widthClassName = (width * 100)
      .toFixed(4)
      .substr(0, width.length - 1)
      .replace('.', '-')
    console.log(widthClassName)
    expect(wrapper.find(`.${SO_PREFIX}-grid-md-25-000`).length).toBe(1)
  })
})

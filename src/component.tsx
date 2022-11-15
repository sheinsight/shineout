import React from 'react'

function create(name: 'Component' | 'PureComponent') {
  const Base: typeof React.Component = React[name]
  return class<P = {}, V = {}> extends Base<P, V> {
    $isMounted: boolean

    forceUpdateTimer: NodeJS.Timeout

    componentDidMount() {
      this.$isMounted = true
    }

    componentWillUnmount() {
      this.$isMounted = false
    }

    setState(...args: any[]) {
      if (this.$isMounted !== false) super.setState.apply(this, args)
    }

    forceUpdate() {
      if (this.$isMounted === true) super.forceUpdate()
      if (this.$isMounted === undefined) {
        if (this.forceUpdateTimer) clearTimeout(this.forceUpdateTimer)
        this.forceUpdateTimer = setTimeout(this.forceUpdate.bind(this))
      }
    }
  }
}

export const Component = create('Component')
export const PureComponent = create('PureComponent')

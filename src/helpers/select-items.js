export function toggleActive(item, cb) {
  const { activeItems } = this.state
  const index = activeItems.indexOf(item)
  if (index >= 0) {
    activeItems.splice(index, 1)
  } else {
    activeItems.push(item)
  }
  this.setState({ activeItems, selectAll: false }, cb)
}

// importing class should implement getItems() - returns all the items
export function selectAll(cb) {
  const { selectAll } = this.state
  const items = this.getItems()
  if (selectAll) {
    this.setState(
      {
        activeItems: [],
        selectAll: false,
      },
      cb
    )
  } else {
    this.setState(
      {
        activeItems: [...items],
        selectAll: true,
      },
      cb
    )
  }
}

export function isSelected(item) {
  const { activeItems } = this.state
  return activeItems.indexOf(item) >= 0
}

export function selectedItemsAction(action) {
  const { activeItems } = this.state
  action(activeItems).then(() =>
    this.setState({
      activeItems: [],
      selectAll: false,
    })
  )
}

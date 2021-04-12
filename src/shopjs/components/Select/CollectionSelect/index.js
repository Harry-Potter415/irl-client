import React from 'react'
import { StyledNav } from './styles'
import { withRouter } from 'react-router-dom'
import {
  withStyles,
  Drawer,
  InputLabel,
  MenuItem,
  Toolbar,
  FormControl,
  Container,
  Box,
  Select,
  Input,
} from '@material-ui/core'

const styles = theme => ({
  drawer: {
    position: 'relative',
  },
  menu: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  menuItem: {
    marginRight: '25px',
    width: '200px',
  },
  input: {
    width: '200px',
  },
})

const CollectionSelect = ({
  history,
  match: {
    params: { collectionHandle },
  },
  classes,
  collections,
}) => {
  const handleCollectionChange = event => {
    const value = event.target.value

    history.push(`/shop/collections/${value}`)
  }

  return (
    <StyledNav>
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawer,
        }}
        anchor="left"
      >
        <Toolbar>
          <Container>
            <form className={classes.menu}>
              <Box display="flex">
                <FormControl className={classes.menuItem}>
                  <InputLabel htmlFor="collection-handle">Collection</InputLabel>
                  <Select
                    onChange={handleCollectionChange}
                    value={collectionHandle}
                    placeholder="Collection"
                    input={<Input name="collectionHandle" id="collection-handle" />}
                  >
                    {!!collections &&
                      collections.map(({ title, handle }) => (
                        <MenuItem key={handle} value={handle}>
                          {title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Box>
            </form>
          </Container>
        </Toolbar>
      </Drawer>
    </StyledNav>
  )
}

export default withRouter(withStyles(styles)(CollectionSelect))

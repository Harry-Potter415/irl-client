import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { Clear, Search } from '@material-ui/icons'
import {
  Box,
  Zoom,
  ClickAwayListener,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  InputBase,
  Paper,
  IconButton,
} from '@material-ui/core'
import { Highlight } from 'shopjs/components'
import styled from 'styled-components'
import { algolia } from 'shopjs/services/Algolia'

const StyledBox = styled(Box)`
  background-color: #fff !important;
`
const SearchResults = styled(Paper)`
  position: absolute !important;
  top: 50px !important;
  width: 320px;
  z-index: 999 !important;
`

const useStyles = makeStyles(theme => ({
  root: {
    padding: '0px 4px',
    display: 'flex',
    borderRadius: '0px',
    alignItems: 'center',
    width: 320,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}))

const Autocomplete = props => {
  const { hitsPerPage = 5, history } = props

  const classes = useStyles()

  let [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [nbPages, setNbPages] = useState(0) // eslint-disable-line no-unused-vars
  const [nbDisplayed, setNbDisplayed] = useState(0)
  const [nbHits, setNbHits] = useState(0)

  const searchProducts = async query => {
    const results = await algolia.search(query, {
      filters: `(NOT product_type: Placement) AND (NOT product_type: Retail)`,
      page: 0,
      hitsPerPage: hitsPerPage,
    })
    let { hits, nbHits, nbPages } = results
    setProducts(hits)
    setNbPages(nbPages)
    setNbHits(nbHits)
    setNbDisplayed(Math.min(nbHits, 5))
  }

  const handleClick = product => {
    history.push(`/shop/products/${product.handle}`)
    setProducts([])
  }

  const onKeyPress = ev => {
    let { value } = ev.target
    if (ev.key === 'Enter') {
      handleClose()
      handleSearch()
    } else {
      setQuery(value)
      searchProducts(value)
    }
  }

  const handleChange = ev => {
    let { value } = ev.target
    setQuery(value)
    if (value === '') {
      handleClose()
    }
  }

  const handleSearch = ev => {
    let path = '/shop/search'
    if (query !== '') path = `/shop/search?keywords=${query}`
    history.push(path)
    handleClose()
  }

  const handleClose = () => {
    setQuery('')
    setProducts([])
  }

  return (
    <Box>
      <StyledBox className={classes.root}>
        <IconButton onClick={handleSearch} className={classes.iconButton} aria-label="menu">
          <Search />
        </IconButton>
        <InputBase
          value={query}
          onChange={e => handleChange(e)}
          onKeyPress={onKeyPress}
          className={classes.input}
          placeholder="Search Products"
        />
        {query && query.length > 0 && (
          <IconButton className={classes.iconButton} aria-label="directions" onClick={handleClose}>
            <Clear />
          </IconButton>
        )}
      </StyledBox>

      {!!products && products.length > 0 && (
        <Zoom in={true}>
          <SearchResults elevation={3}>
            <ClickAwayListener onClickAway={handleClose}>
              <List
                subheader={
                  <ListSubheader component="div">
                    Results 1-<b>{nbDisplayed}</b> of <b>{nbHits}</b>
                  </ListSubheader>
                }
              >
                {products.map((product, i) => (
                  <ListItem button key={i} onClick={e => handleClick(product, e)}>
                    <ListItemIcon>
                      <Avatar src={product.image} />
                    </ListItemIcon>
                    <ListItemText
                      primary={<Highlight variant="body1" hit={product} attribute="title" />}
                      secondary={
                        <Box>
                          <Highlight
                            color="textSecondary"
                            variant="body2"
                            hit={product}
                            attribute="vendor"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
                <ListItem button dense onClick={handleSearch}>
                  <ListItemText primary={`See all ${nbHits} results`} />
                </ListItem>
              </List>
            </ClickAwayListener>
          </SearchResults>
        </Zoom>
      )}
    </Box>
  )
}

export default withRouter(Autocomplete)

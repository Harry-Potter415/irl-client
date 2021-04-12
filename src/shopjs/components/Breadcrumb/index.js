import React, { Fragment } from 'react'
import { Box, Button, Breadcrumbs } from '@material-ui/core'
import { BreadcrumbActive } from './styles'
import { NavigateNext } from '@material-ui/icons'
import { withRouter } from 'react-router-dom'
import { cleanHandle } from 'shopjs/helpers'

const Breadcrumb = ({ current, history, match, labelReplacement = {} }) => {
  const { productHandle, brandHandle, collectionHandle } = match.params

  const currentUrl = window.location.hash

  const handleClick = path => {
    history.push(path)
  }

  const breadcrumbs = [
    {
      name: 'Home',
      to: '/shop',
    },
  ]

  if (collectionHandle) {
    breadcrumbs.push({
      name: labelReplacement.collectionHandle || cleanHandle(collectionHandle),
      to: `/shop/collections/${collectionHandle}`,
    })
  }

  if (brandHandle) {
    breadcrumbs.push({
      name: labelReplacement.brandHandle || cleanHandle(brandHandle),
      to: `/shop/brands/${brandHandle}`,
    })
  }

  if (productHandle) {
    breadcrumbs.push({
      name: labelReplacement.productHandle || cleanHandle(productHandle),
      to: `/shop/products/${productHandle}`,
    })
  }

  if (current) {
    breadcrumbs.push({
      name: current,
      to: currentUrl,
    })
  }

  return (
    <Box my={0}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
        {!!breadcrumbs &&
          breadcrumbs.map((link, i) => {
            return link.to ? (
              <Button size="small" key={i} onClick={e => handleClick(link.to)}>
                {link.name}
              </Button>
            ) : (
              <Fragment key={i}>
                <BreadcrumbActive>
                  <Button size="small">{link.name}</Button>
                </BreadcrumbActive>
              </Fragment>
            )
          })}
      </Breadcrumbs>
    </Box>
  )
}

export default withRouter(Breadcrumb)

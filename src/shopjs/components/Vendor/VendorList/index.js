import React from 'react'
import { ProductList } from 'shopjs/components'
import { withRouter } from 'react-router-dom'
import { Box, Container } from '@material-ui/core'
import { useProducts } from 'shopjs/hooks'
import { Breadcrumb } from 'shopjs/components'

const BrandList = props => {
  const { brandHandle } = props.match.params

  const [{ pages, hasNextPage, count }, { getNextPage }] = useProducts({
    query: { vendor: brandHandle },
    autoLoad: true,
  })

  return (
    <Box p={0} m={0}>
      <Breadcrumb />
      <Container>
        <Box display="flex" mt={1}>
          <ProductList
            pages={pages}
            count={count}
            hasNextPage={hasNextPage}
            getNextPage={getNextPage}
          />
        </Box>
      </Container>
    </Box>
  )
}

export default withRouter(BrandList)

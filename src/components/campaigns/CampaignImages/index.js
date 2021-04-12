import React, { Component } from 'react'
import styled from 'styled-components'
import ImageGrid from 'components/images/ImageGrid'
import Placeholder from 'components/alerts/Placeholder'
import ImageIcon from '@material-ui/icons/Image'

const Container = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`
const NoImages = styled.div`
  margin-top: 28px;
`

class CampaignImages extends Component {
  render() {
    const { campaign } = this.props
    return (
      <Container>
        {campaign.images.length > 0 ? (
          <ImageGrid images={campaign.images} />
        ) : (
          <NoImages>
            <Placeholder
              icon={<ImageIcon />}
              title="No Placement Photos"
              description="Placement images will appear here"
            />
          </NoImages>
        )}
      </Container>
    )
  }
}

export default CampaignImages

import React, { cloneElement } from 'react'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'

const Container = styled.div`
  padding: 2rem;
  background: #fdfdfd;
  border: 1px dashed #ededed;
  text-align: center;
`

const ContainerNoBorder = styled.div`
  padding: 2rem;
  text-align: center;
`

const Title = styled(Typography)`
  font-weight: bold !important;
  padding: 20px 0 10px 0;
  color: #000;
`

const Placeholder = ({ icon, title, description, noBorder }) => {
  let newIcon = cloneElement(icon, { style: { fontSize: '60px', color: '#bbb' } })

  let Wrapper = noBorder ? ContainerNoBorder : Container

  return (
    <Wrapper>
      {icon && newIcon}
      <Title variant="caption" component="div">
        {title}
      </Title>
      <Typography variant="body1" component="div">
        {description}
      </Typography>
    </Wrapper>
  )
}

export default Placeholder

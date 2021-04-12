import React from 'react'
import { Box, Tooltip, IconButton } from '@material-ui/core'
import Facebook from 'shopjs/resources/icons/social_facebook.svg'
import Twitter from 'shopjs/resources/icons/social_twitter.svg'
import Pinterest from 'shopjs/resources/icons/social_pinterest.svg'
import Linkedin from 'shopjs/resources/icons/social_linkedin.svg'
import config from 'shopjs/config'

const ShareButtons = ({ url, size = 18, title }) => {
  const { domain } = config.shop
  const { facebook, twitter, pinterest, linkedin, message } = config.shareButtons

  const handleFacebookClick = () => {
    window.open(`http://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}`, '_blank')
  }

  const handleTwitterClick = () => {
    window.open(`http://twitter.com/intent/tweet?status=${message} ${url}`, '_blank')
  }

  const handlePinterestClick = () => {
    window.open(
      `http://pinterest.com/pin/create/button?url=${url}&description=${message}`,
      '_blank'
    )
  }

  const handleLinkedinClick = () => {
    window.open(
      `http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${message}&domain=${domain}`
    )
  }

  return (
    <Box my={2}>
      {facebook && (
        <Tooltip title="Share on Facebook">
          <IconButton onClick={handleFacebookClick}>
            <img src={Facebook} width={size} alt="Facebook" />
          </IconButton>
        </Tooltip>
      )}
      {twitter && (
        <Tooltip title="Share on Twitter">
          <IconButton onClick={handleTwitterClick}>
            <img src={Twitter} width={size} alt="Twitter" />
          </IconButton>
        </Tooltip>
      )}
      {pinterest && (
        <Tooltip title="Share on Pinterest">
          <IconButton onClick={handlePinterestClick}>
            <img src={Pinterest} width={size} alt="Pinterest" />
          </IconButton>
        </Tooltip>
      )}
      {linkedin && (
        <Tooltip title="Share on Linkedin">
          <IconButton onClick={handleLinkedinClick}>
            <img src={Linkedin} width={size} alt="Linkedin" />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  )
}

export default ShareButtons

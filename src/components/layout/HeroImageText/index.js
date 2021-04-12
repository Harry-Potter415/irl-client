import React from 'react'
import styled from 'styled-components'

const Text = styled.div`
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 30px;

  min-height: 427px;
  .hero-preamble {
    font-size: 22px;
    font-weight: lighter;
  }
  .hero-title {
    font-size: 80px;
    font-weight: bold;
  }
  .hero-description {
    font-size: 26px;
    font-weight: lighter;
  }

  @media (min-width: 600px) and (max-width: 960px) {
    min-height: 330px;
    .hero-preamble {
      font-size: 22px;
    }
    .hero-title {
      font-size: 80px;
    }
    .hero-description {
      font-size: 26px;
    }
  }

  @media (max-width: 600px) {
    min-height: 208px;
    .hero-preamble {
      font-size: 16px;
    }
    .hero-title {
      font-size: 60px;
    }
    .hero-description {
      font-size: 19px;
    }
  }
`

const HeroImageText = ({ preamble, title, description }) => (
  <Text>
    {preamble && <div className="hero-preamble">{preamble}</div>}
    {title && <div className="hero-title">{title}</div>}
    {description && <div className="hero-description">{description}</div>}
  </Text>
)

export default HeroImageText

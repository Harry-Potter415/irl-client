import { pink } from '@material-ui/core/colors'

import { PRIMARY_GREEN } from 'lib/colors'
const accessToken = process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN
const hostUrl = process.env.REACT_APP_SHOPIFY_DOMAIN

const config = {
  shop: {
    name: 'ShopJS',
    domain: 'poweredbyextra.com',
    route: '/shop',
  },
  services: {
    storefrontRaw: {
      url: `https://${hostUrl}/api/graphql`,
      headers: {
        'X-Shopify-Storefront-Access-Token': accessToken,
      },
    },
    buyJsClient: {
      domain: hostUrl,
      accessToken,
    },
  },
  muiTheme: {
    palette: {
      background: {
        default: '#ffffff',
      },
      primary: {
        main: PRIMARY_GREEN,
      },
      secondary: pink,
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '0',
        },
      },
      MuiPrivateNotchedOutline: {
        root: {
          borderRadius: 0,
        },
      },
      MuiToolbar: {
        root: {
          dropShadow: '0',
        },
      },
      MuiChip: {
        root: {
          borderRadius: '0',
        },
      },
      MuiPaper: {
        root: {
          borderRadius: '0',
        },
        rounded: {
          borderRadius: '0',
        },
      },
      MuiAppBar: {
        root: {
          dropShadow: '0',
        },
        positionStatic: {
          dropShadow: '0',
        },
        positionFixed: {
          dropShadow: '0',
        },
      },
    },
  },
  shape: {
    borderRadius: '0px',
  },
  theme: {
    palette: {
      dark: true,
    },
    colors: {
      primary: '#111111',
      secondary: pink[500],
      tertiary: '#999999',
    },
  },
  searchFilters: {
    sortOrder: [
      {
        value: '',
        label: 'None',
      },
      {
        value: 'price_asc',
        label: 'Price Asc',
      },
      {
        value: 'price_desc',
        label: 'Price Desc',
      },
      {
        value: 'popular',
        label: 'Popular',
      },
    ],
    color: [
      {
        value: '',
        label: 'All',
      },
      {
        value: 'black',
        label: 'Black',
        hex: '#000000',
      },
      {
        value: 'white',
        label: 'White',
        hex: '#FFFFFF',
      },
      {
        value: 'Cream',
        label: 'Cream',
        hex: '#F0EFEB',
      },
      {
        value: 'Graphite',
        label: 'Graphite',
        hex: '#D3D6DE',
      },
      {
        value: 'Smoke Stripe',
        label: 'Smoke Stripe',
        hex: '#CECDD2',
      },
      {
        value: 'Solid White',
        label: 'Solid White',
        hex: '#FFFFFF',
      },
      {
        value: 'Steel',
        label: 'Steel',
        hex: '#D3D6DE',
      },
      {
        value: 'Window Pane',
        label: 'Window Pane',
        hex: '#D7D7D7',
      },
    ],
    size: [
      {
        value: '',
        label: 'All',
      },
      {
        value: 's',
        label: 'S',
      },
      {
        value: 'm',
        label: 'M',
      },
      {
        value: 'l',
        label: 'L',
      },
      {
        value: 'xl',
        label: 'XL',
      },
    ],
  },
  marketing: {
    notification: {
      text: 'Summer sale ends on August 31!',
      visible: true,
    },
  },
  social: {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    linkedin: 'https://www.linkedin.com',
    twitter: 'https://twitter.com',
  },
  shareButtons: {
    facebook: true,
    twitter: true,
    pinterest: true,
    linkedin: true,
    message: 'Checkout this product on Extra!',
  },
  vendors: {
    mailchimp: {
      apiKey: process.env.REACT_APP_MAILCHIMP_API_KEY,
      newsletter: 'master',
    },
    googleAnalytics: {
      apiKey: process.env.REACT_APP_SHOP_GA_ID,
    },
  },
}

export default config

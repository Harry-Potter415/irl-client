export const ROLES = ['admin', 'user']

export const USER_TYPES = {
  brand: 'brand',
  host: 'host',
}

export const PROPERTY_FORM_STEPS = ['property_step_1', 'image_upload']

export const PRODUCT_FORM_STEPS = ['product_step_1', 'image_upload']

export const CAMPAIGN_FORM_STEPS = [
  'campaign_step_1',
  'campaign_step_2',
  'campaign_step_3',
  'image_upload',
]

export const SIGNUP_BRAND_STEPS = [
  {
    key: 'user_type',
    stepperIcon: 'user_type',
  },
  {
    key: 'details',
    stepperIcon: 'signup_details',
  },
]

export const SIGNUP_HOST_STEPS = [
  {
    key: 'user_type',
    stepperIcon: 'user_type',
  },
  {
    key: 'property_types',
    stepperIcon: 'property_types',
  },
  {
    key: 'cities',
    stepperIcon: 'cities',
  },
  {
    key: 'property_details',
    stepperIcon: 'cities',
  },
  {
    key: 'details',
    stepperIcon: 'signup_details',
  },
]

export const SIGNUP_OPTIONS = {
  userType: [
    {
      title: 'Brand',
      value: 'brand',
    },
    {
      title: 'Host',
      value: 'host',
    },
  ],
  propertyTypes: [
    {
      title: 'Short Term Rental',
      value: 'short_term_rental',
    },
    {
      title: 'Coworking Space',
      value: 'coworking_space',
    },
    {
      title: 'Fitness Center',
      value: 'fitness_center',
    },
    {
      title: 'Hotel',
      value: 'hotel',
    },
    {
      title: 'Other',
      value: 'other',
    },
  ],
  ageGroups: [
    {
      label: 'Gen Z',
      value: 'Gen Z',
    },
    {
      label: 'Millenial',
      value: 'Millenial',
    },
    {
      label: 'Gen X',
      value: 'Gen X',
    },
    {
      label: 'Baby Boomers',
      value: 'Baby Boomers',
    },
  ],
  audiences: [
    {
      label: 'Corporate',
      value: 'Corporate',
    },
    {
      label: 'Family',
      value: 'Family',
    },
    {
      label: 'Wellness',
      value: 'Wellness',
    },
    {
      label: 'Eco-friendly',
      value: 'Eco-friendly',
    },
    {
      label: 'Luxury',
      value: 'Luxury',
    },
    {
      label: 'Leisure',
      value: 'Leisure',
    },
  ],
}

export const USER_CAMPAIGN_STATUSES = {
  pending: 'pending',
  accepted: 'accepted',
  rejected: 'rejected',
  shipped: 'shipped',
  delivered: 'delivered',
}

export const USER_CAMPAIGN_DISPLAY_STATUSES = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
  shipped: 'Shipped',
  delivered: 'Delivered',
}

// in `admin/user_campaigns`: POST/PUT must be done with the verb's base form ('accept')
// but GET uses the past participle ('accepted')
// @see https://trello.com/c/Uab2GLxQ/256-backend-usercampaigns-status-names-are-different-in-controller-and-model
// TODO: remove while solving the issue
export const userCampaignStatusTranslationDisplayToAction = {
  pending: 'pending',
  accepted: 'accept',
  rejected: 'reject',
  shipped: 'ship',
  delivered: 'deliver',
}

export const CAMPAIGN_RULE_TYPES = {
  permitted: 'permitted',
  forbidden: 'forbidden',
}

export const USER_DISPLAY_STATUSES = {
  pending: 'Pending',
  accepted: 'Accepted',
  rejected: 'Rejected',
}

export const REVIEW_DISPLAY_STATUSES = {
  accepted: 'Accepted',
  rejected: 'Rejected',
}

export const HOME_PAGE = {
  brand: '/dashboard',
  host: '/placements',
}

export const UPLOAD_CAMPAIGN_IMAGE_TEXT =
  'Please use lifestyle image or image that reflects how you would like your product to be used in real life.'
export const UPLOAD_PRODUCT_IMAGE_TEXT =
  'Images should be of product that our partners will receive.'

export const FEEDBACK = {
  negative: 'negative',
  neutral: 'neutral',
  positive: 'positive',
}

export const USER_TYPE_OPTIONS = {
  brand: 'Brand',
  host: 'Host',
  admin: 'Admin',
}

export const PRODUCT_TYPES = [
  {
    label: 'Apparel',
    value: 'Apparel',
  },
  {
    label: 'Beauty',
    value: 'Beauty',
  },
  {
    label: 'Decor',
    value: 'Decor',
  },
  {
    label: 'Drinks',
    value: 'Drinks',
  },
  {
    label: 'Snacks',
    value: 'Snacks',
  },
  {
    label: 'Wellness',
    value: 'Wellness',
  },
]

export const ALL_STATES = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
}

export const IGNORE_SHOPIFY_OPTIONS = ['Title', 'Minimum Order', 'Case Pack']
export const SHOPIFY_OPTIONS = {
  minimumOrder: 'Minimum Order',
  casePack: 'Case Pack',
}

export const ORDER_TYPES = {
  placement: 'Placement',
  shop: 'Shop',
}

export const STRIPE_ACCOUNT_TYPES = [
  {
    label: 'Individual',
    value: 'individual',
  },
  {
    label: 'Company',
    value: 'company',
  },
]

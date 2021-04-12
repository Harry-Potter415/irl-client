import get from 'lodash/get'

const AUTH_TOKEN_KEY = 'authToken'

const AUTHORIZATIONS = {
  host: {
    properties: {
      create: true,
      edit: resourceBelongsToUser,
    },
    campaigns: {
      apply: true,
      create: false,
      edit: false,
      viewAnalytics: false,
    },
    myCampaigns: {
      list: true,
    },
    availableCampaigns: {
      list: true,
    },
  },
  brand: {
    products: {
      create: true,
      edit: resourceBelongsToUser,
    },
    campaigns: {
      create: true,
      edit: resourceBelongsToUser,
      viewAnalytics: true,
    },
    myCampaigns: {
      list: true,
    },
    availableCampaigns: {
      list: false,
    },
  },
}

function resourceBelongsToUser(user, resource) {
  return user.id === parseInt(resource.user.id)
}

export const setToken = res => {
  const { token } = res.data.meta
  localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export const removeToken = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isAuthorized(user, action, resourceName, resource) {
  if (!user) return false
  user = user.attributes
  const auth = get(AUTHORIZATIONS, `${user.userType}.${resourceName}.${action}`)
  if (typeof auth === 'function') {
    return auth(user, resource)
  } else {
    return auth
  }
}

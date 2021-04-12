import { USER_TYPES } from 'lib/constants'

export const isAdmin = user => user && user.attributes.isAdmin
export const isHost = user => user && user.attributes.userType === USER_TYPES.host
export const isBrand = user => user && user.attributes.userType === USER_TYPES.brand

export const SOCIAL_MEDIA_NAMES = ['instagram', 'facebook', 'twitter', 'website']

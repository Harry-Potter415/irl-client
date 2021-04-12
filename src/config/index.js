import runtimeEnv from '@mars/heroku-js-runtime-env'

const env = runtimeEnv()

export const DATE_FORMAT = 'M/D/YY'

export const USER_TYPES = {
  brand: 'Brand',
  host: 'Host',
}

export const CLOUDINARY_CONFIG = {
  cloudName: env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  apiKey: env.REACT_APP_CLOUDINARY_API_KEY,
  uploadPreset: env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
  baseUrl: 'https://api.cloudinary.com/v1_1',
}

export const PER_PAGE = 20

export const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${env.REACT_APP_GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`

export const INTERCOM_APP_ID = 'hd00ok4e'

export default {
  DATE_FORMAT: 'M/D/YY',
  ...env,
}

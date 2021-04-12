import axios from 'axios'
import { CLOUDINARY_CONFIG } from 'config'

const PLACEHOLDER_URL = 'https://res.cloudinary.com/irl/image/upload/v1568553848/placeholder.png'

export function uploadFile(file, folder) {
  const url = `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.cloudName}/upload`
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)
  formData.append('api_key', CLOUDINARY_CONFIG.apiKey)
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset)
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
  }
  const ax = axios.create({
    headers,
  })
  // remove default header because it is not allowed in the cors request to cloudinary
  delete ax.defaults.headers.common['Authorization']
  return ax.post(url, formData)
}

// add image transformations to the url
// https://cloudinary.com/documentation/image_transformations
function transform(url, transformations) {
  if (!url) url = PLACEHOLDER_URL
  // find index at the end of /upload
  const index = url.indexOf('/upload') + 7
  const finalUrl = url.slice(0, index) + `/${transformations}` + url.slice(index)
  return finalUrl.replace(/(heic|webp)$/, 'jpg')
}

export function detailsImage(url) {
  const transformations = 'w_700,h_700,c_fill,g_auto'
  return transform(url, transformations)
}

export function tableImage(url) {
  const transformations = 'w_80,h_50,c_fill,g_auto'
  return transform(url, transformations)
}

export function listItemImage(url) {
  const transformations = 'w_300,h_200,c_fill,g_auto'
  return transform(url, transformations)
}

export function uploaderImage(url) {
  const transformations = 'w_600,h_400,c_fill,g_auto'
  return transform(url, transformations)
}

export function gridImage(url) {
  const transformations = 'w_300,h_200,c_fill,g_auto'
  return transform(url, transformations)
}

export const scaledImageByWidth = (url, width) => transform(url, `w_${width},c_fill,g_auto`)

export const getCloudinaryImageUrl = relativeUrl =>
  `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${relativeUrl}`

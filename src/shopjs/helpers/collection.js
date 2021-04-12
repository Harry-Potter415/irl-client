import { get, pick } from 'lodash'
import { normalize as normalizeProduct } from './products'

export const normalizeCollection = async collection =>
  collection && {
    ...pick(collection, [
      'id',
      'title',
      'handle',
      'vendor',
      'description',
      'descriptionHtml',
      'updatedAt',
    ]),
    products: collection.products && (await Promise.all(collection.products.map(normalizeProduct))),
    image: get(collection, 'images.src'),
  }

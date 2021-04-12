export const selectIsUploading = (state, uploaderId) => {
  return state.uploader[uploaderId] && state.uploader[uploaderId].isUploading
}

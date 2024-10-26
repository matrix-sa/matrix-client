import axios from 'axios'

const BlobService = (function () {
  const getBlob = async url => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })

    const blob = response.data
    const contentType = response.headers['content-type']
    const extensionType = contentType.split('/')[1]

    // Create a File object (if needed)
    return new File([blob], `media.${extensionType}`, {
      type: blob.type,
    })
  }

  return {
    getBlob,
  }
})()

export default BlobService

function extractPublicId(secureUrl) {
    const urlParts = secureUrl.split('/');
    const fileWithFormat = urlParts.pop(); // Get the file name and format (e.g., 'public_id.jpg')
    const publicId = fileWithFormat.split('.')[0]; // Extract the public_id (without format)
    return urlParts.slice(urlParts.indexOf('upload') + 2).join('/') + '/' + publicId; 
  }

  export default extractPublicId
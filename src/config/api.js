// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  UPLOAD_ENDPOINT: '/uploadfile/',
  MAX_IMAGES: 69,
  MAX_FILE_SIZE_MB: 10,
};

export const getUploadUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.UPLOAD_ENDPOINT}`;
};

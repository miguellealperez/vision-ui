export const BASE_PATH = '/os26'
export const generateUrl = (path?: string) => `${BASE_PATH}${path ? `/${path}` : ''}`

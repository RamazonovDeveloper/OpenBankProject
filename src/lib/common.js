import { API_ROUTES } from 'src/utils/constants';
import axios from 'axios';

export function storeTokenInLocalStorage(token) {
  localStorage.setItem('access_token', token);
}

export function storeCompanyInfoInLocalStorage(company) {
  localStorage.setItem('companyInfo', compnay);
}

export function getTokenFromLocalStorage() {
    return JSON.parse(localStorage.getItem('access_token'));
}

export function getCompanyInfoFromLocalStorage() {
    return JSON.parse(localStorage.getItem('companyInfo'));
}
    
export async function getAuthenticatedUser() {
  const defaultReturnObject = { token: null, company: null };
  try {
    const token = getTokenFromLocalStorage();
    const company = getCompanyInfoFromLocalStorage();
    if (!token && !company) {
      return defaultReturnObject;
    }

    // const response = await axios({
    //   method: 'POST',
    //   url: API_ROUTES.GET_USER,
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // });
    // const { authenticated = false } = response.data;

    return {token, company}
  }
  catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    
    return defaultReturnObject;
  }
}
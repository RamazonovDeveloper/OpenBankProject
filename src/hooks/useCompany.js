import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from 'src/lib/common';
import { APP_ROUTES } from 'src/utils/constants';
import Router from 'next/router';

export function useCompany() {
  const [company, setCompany] = useState(null);
  const [token, setToken] = useState(false);
  useEffect(() => {
    async function getCompanyDetails() {
      const { token, company } = await getAuthenticatedUser();
      if (!token && !company) {
        alert("yo'q")

        // Router.push(APP_ROUTES.SIGN_IN);

        return;
      }
      setCompany(company);
      setToken(token);
    }
    getCompanyDetails();
  }, []);
  
 return { company, token }; 
}
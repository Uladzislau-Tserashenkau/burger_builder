import { useState, useEffect } from "react";

export default (httpClient) => {
  const [error, setError] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((request) => {
    setError(null);
    return request;
  });

  const resInterceptor = httpClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      setError(error);
    }
  );

  useEffect(() => {
    return () => {
      httpClient.interceptors.request.eject(reqInterceptor);
      httpClient.interceptors.response.eject(resInterceptor);
    };
  }, [
    httpClient.interceptors.request,
    httpClient.interceptors.response,
    reqInterceptor,
    resInterceptor,
  ]);

  const errorConfirmedHandler = () => {
    setError(null);
  };

  return [error, errorConfirmedHandler];
};

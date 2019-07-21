import React, { useEffect, useState } from "react";

import Aux from "../Auxiliary/Auxiliary";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    useEffect(() => {
      let reqInterceptor = axios.interceptors.request.use(req => req);
      let resInterceptor = axios.interceptors.response.use(
        res => res,
        err => {
          setError(err);
        }
      );
      return () => {
        console.log("cleanup", reqInterceptor, resInterceptor);
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      };
    });

    const errorConfirmed = () => {
      setError(null);
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmed}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;

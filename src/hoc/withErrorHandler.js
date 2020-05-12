import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal";
import Aux from "./ax";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = { error: null, loading: false };

    errorConfirmedHandler = () => {
      this.setState({
        error: null,
      });
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState(() => {
          return {
            loading: true,
            error: null,
          };
        });
        return request;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (response) => {
          this.setState({ loading: false });
          return response;
        },
        (error) => {
          this.setState(() => {
            return { error: error, loading: false };
          });
          return Promise.reject(error);
        }
      );
    }

    render() {
      return (
        <Aux>
          <Modal
            show={this.state.error !== null}
            modalClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          {this.state.loading ? null : <WrappedComponent {...this.props} />}
        </Aux>
      );
    }
  };
};

export default withErrorHandler;

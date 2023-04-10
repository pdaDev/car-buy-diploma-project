import React from "react";
import { ErrorBoundary as ErrorBoundaryComponent, Container  } from 'shared'

interface IState {
    hasError: boolean
    errorCode: number | string
    errorMessage: string
}
export class ErrorBoundary extends React.Component<any, IState> {
    state = {
        hasError: false,
        errorCode: 0,
        errorMessage: ''
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState(
            {
                errorCode: error.name,
                errorMessage: error.message,
                hasError: true
            })
    }

    render() {
        const { hasError, errorMessage, errorCode } = this.state;

        if (hasError) {
            // eslint-disable-next-line react/jsx-no-undef
            return <Container size={'container'} contentAlign={'top-middle'} pt={6} m={4}>
                <ErrorBoundaryComponent code={errorCode} message={errorMessage} />
            </Container>
        }
        return this.props.children
    }
}
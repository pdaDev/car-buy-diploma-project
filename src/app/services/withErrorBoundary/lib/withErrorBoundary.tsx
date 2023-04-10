import {ComponentType, FC} from "react";
import {ErrorBoundary} from "../ui/ErrorBoundary";

export const withErrorBoundary = (Component: ComponentType) => {
    const Container: FC = (props) => {
        return <ErrorBoundary>
            <Component {...props} />
        </ErrorBoundary>
    }
    return Container
}
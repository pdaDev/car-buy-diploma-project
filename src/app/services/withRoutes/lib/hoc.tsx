import {ComponentType, FC, ReactNode, Suspense} from "react";
import {BrowserRouter, Routes} from "react-router-dom";

export const withRouter = (Component: ComponentType) => {
    const Container: FC = () => {
        return <BrowserRouter>
            <Suspense fallback={'...'}>
                <Component/>
            </Suspense>
        </BrowserRouter>

    }

    return Container
}
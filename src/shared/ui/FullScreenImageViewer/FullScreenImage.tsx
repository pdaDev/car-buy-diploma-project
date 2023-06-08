import {FC, useEffect, useRef} from "react";

interface IProps {
    image: string
    setActive: Function
}
export const FullScreenImage: FC<IProps> = ({ setActive, image }) => {
    const ref = useRef<HTMLImageElement>(null)
    useEffect(() => {
        if (ref.current) {
            const observer = new IntersectionObserver(() => {
                setActive()
            }, {
                root: null,
                rootMargin: "0px",
                threshold: 0.9, })

            observer.observe(ref.current)

            return () => {
                observer.disconnect()
            }
        }
    }, [ref])
    return <img src={image} ref={ref}/>

}
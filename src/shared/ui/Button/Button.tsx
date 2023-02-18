import {FC} from "react";
import './Button.scss';
interface IProps {
    size?: 'small' | 'medium' | 'large';
    label: string;
    disabled?: boolean;
    handleClick: (...args: any[]) => void;
}
export const Button: FC<IProps> = (
    {
        size= 'medium',
        label,
        disabled = false,
        handleClick
    }) => {
    return <button onClick={handleClick} disabled={disabled}>
        {label}
    </button>
}
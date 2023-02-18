import React, {FC, ReactNode} from "react";


interface  IProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    loading?: boolean;
    label: string;
    maxlength?: number;
    type?: 'primary' | 'secondary';
}
export const Label: FC<IProps> = ({
    level= 3,
    maxlength,
    loading = false,
    label,
    type = 'primary',
                                  }) => {
    const Label = `h${level}`
    // @ts-ignore
    return <Label>
        { label }
    </Label>
}
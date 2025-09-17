import React, { FC, ReactNode, useState } from 'react';
import { Button } from 'antd'
import clsx from 'clsx';

type ToggleThemeProps = {
    children: ReactNode;
};

const ToggleTheme: FC<ToggleThemeProps> = ({ children }) => {
    const [isLightTheme, setIsLightTheme] = useState<boolean>(true)
    const toggleTheme = () => {
        console.log('isLightTheme: ', isLightTheme)
        setIsLightTheme((prev) => !prev)
    }
    return (
        <div className={clsx('theme', { 'light': isLightTheme, 'dark': !isLightTheme })}>
            <Button onClick={toggleTheme}>{isLightTheme ? 'light' : 'dark'}</Button>

            {children}

        </div>
    );
};

export default ToggleTheme;

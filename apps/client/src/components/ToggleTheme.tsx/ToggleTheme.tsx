import React, { FC, ReactNode } from 'react';
import { Button } from 'antd'
import clsx from 'clsx';
import useStore from '@/store/store'

type ToggleThemeProps = {
    children: ReactNode;
};

const ToggleTheme: FC<ToggleThemeProps> = ({ children }) => {

    const { isLightTheme, toggleTheme } = useStore()
    return (
        <div className={clsx('theme', { 'light': isLightTheme, 'dark': !isLightTheme })}>
            <Button onClick={toggleTheme}>{isLightTheme ? 'light' : 'dark'}</Button>

            {children}

        </div>
    );
};

export default ToggleTheme;

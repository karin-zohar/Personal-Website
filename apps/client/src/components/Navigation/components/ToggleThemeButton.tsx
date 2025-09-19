import React from 'react';
import { Button } from 'antd'
import useStore from '@/store/store'

const ToggleThemeButton = () => {
    const { isLightTheme, toggleTheme } = useStore()
    return (
        <Button onClick={toggleTheme}>{isLightTheme ? 'light' : 'dark'}</Button>
    );
};

export default ToggleThemeButton;

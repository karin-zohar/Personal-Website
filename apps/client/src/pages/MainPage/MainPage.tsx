import React, { useState } from 'react';
import { Typography } from 'antd'


const MainPage = () => {
    const { Title } = Typography
    const [isLightTheme, setIsLightTheme] = useState<boolean>(true)
    const toggleTheme = () => {
        console.log('isLightTheme: ', isLightTheme)
        setIsLightTheme((prev) => !prev)
    }
    return (
        <div className='main-page'>

            <Title level={1}>
                MainPage component
            </Title>

            <p>
                This text will react to theme
            </p>

        </div>
    );
};

export default MainPage;
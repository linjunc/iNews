import React, { useMemo } from 'react';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';

const Home = (props) => {
    const location = useLocation()
    const channel = useMemo(() => location.state?.current ?? '首页', [location.state]) 
    return (
        <div>
            {channel}
        </div>  
    );
};

export default Home;
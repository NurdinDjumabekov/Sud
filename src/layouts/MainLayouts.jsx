import React from 'react';
import { Outlet } from 'react-router-dom';


function MainLayouts ()
{
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default MainLayouts;

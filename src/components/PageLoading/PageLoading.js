import React from 'react';
import { SemipolarLoading } from 'react-loadingg';
import './PageLoading.css';

const PageLoading = (props) => {
    return(
        <div className="pageloading">
            <span className="loader">
                <SemipolarLoading size="large" />
            </span>
        </div>
    )
}
//WindMillLoading 
export default PageLoading;
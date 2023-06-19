import React from "react";
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigation = useNavigate()


    let handleAdd = async () => {
        navigation('/add')
    }

    return (
        <div className="app-header">
            <h1>Note List</h1>
        </div>
    )
}

export default Header
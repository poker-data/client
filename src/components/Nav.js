import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <div className="bar">
            <span className="jugadores"><Link to="/players">Players</Link></span>   
            <span className="estadisticas"><Link to="/playerStatistics">Player Stats</Link></span> 
      </div>  
    )
}

export default Nav

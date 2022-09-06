import {Link, NavLink} from 'react-router-dom'


function Navbar(){



    return (
        <nav>
            <Link to='/countries' href="#">
                <img src="" alt="" /> {/* Acá va a ir el logo */}
            </Link>
            <div>
                <ul>
                    <li>
                        <NavLink to='/countries'>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/countries'>Create Activity</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
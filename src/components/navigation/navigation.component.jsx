import './navigation.styles.scss';

import {Link} from 'react-router-dom';

import {ReactComponent as CrownLogo} from '../../assets/crown.svg'

function Navigation() {

  return (
    <div className='navigation'>
        
        <Link className='logo-container' to='/'>
            <CrownLogo className='logo'/>
        </Link>

        <div className='nav-links-container'>
            <Link className='nav-link' to='/shop'>Shop</Link>
            <Link className='nav-link' to='/signin'>Sign In</Link>
        </div>

    </div>
  );
}

export default Navigation;

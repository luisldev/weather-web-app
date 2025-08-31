import Logo from '../../components/icons/Logo';
import WeatherSearchContainer from '../search/WeatherSearchContainer';

function Header() {
	return (
		<header className='w-full flex flex-row items-center justify-between'>
			<Logo />
			<WeatherSearchContainer />
		</header>
	);
}

export default Header;

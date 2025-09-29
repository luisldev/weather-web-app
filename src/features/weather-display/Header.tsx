import Logo from '@/components/icons/Logo';
import WeatherSearchContainer from '@/features/search/WeatherSearchContainer';

function Header() {
	return (
		<header className='w-full flex flex-row items-center justify-between'>
			<a href='/'>
				<Logo />
			</a>
			<WeatherSearchContainer />
		</header>
	);
}

export default Header;

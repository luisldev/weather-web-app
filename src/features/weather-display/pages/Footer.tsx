function Footer() {
	return (
		<footer
			id='footer'
			className='grow flex flex-col justify-end h-full w-full mt-auto mb-2 text-center text-xs text-neutral-500 dark:text-neutral-400 font-primary'
		>
			<p>
				Datos del clima proporcionados por{' '}
				<a
					href='https://www.tomorrow.io/'
					target='_blank'
					rel='noopener noreferrer'
					className='text-sky-700 hover:text-sky-500 dark:text-sky-400  dark:hover:text-sky-300 transition-colors duration-150'
				>
					Tomorrow.io
				</a>
			</p>
			<p>
				Autocompletado de ubicaciones por{' '}
				<a
					href='https://www.weatherapi.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='text-sky-700 hover:text-sky-500 dark:text-sky-400  dark:hover:text-sky-300 transition-colors duration-150'
				>
					WeatherAPI
				</a>
			</p>
			<p className='mt-2'>Hecho con ❤️ por Luis López</p>
		</footer>
	);
}

export default Footer;

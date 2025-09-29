function Footer() {
	return (
		<footer
			id='footer'
			className='flex flex-col justify-end h-full w-full mt-auto text-center text-xs text-neutral-500 dark:text-neutral-400 font-primary'
		>
			<p>
				Powered by{' '}
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
				Powered by{' '}
				<a
					href='https://www.weatherapi.com/'
					target='_blank'
					rel='noopener noreferrer'
					className='text-sky-700 hover:text-sky-500 dark:text-sky-400  dark:hover:text-sky-300 transition-colors duration-150'
				>
					WeatherAPI
				</a>
			</p>
		</footer>
	);
}

export default Footer;

import InitialPageIcon from '../../../components/icons/InicialPageIcon';

function InitialPage() {
	return (
		<section className='min-h-[70vh] flex flex-col items-center justify-center text-center p-4'>
			<div className='flex flex-col items-center justify-center gap-y-4'>
				<InitialPageIcon className='w-2/3' />
				<h2 className='text-3xl font-bold text-neutral-700 dark:text-neutral-300'>
					Bienvenido
				</h2>
				<p className='text-lg font-light text-neutral-500 dark:text-neutral-400'>
					Usa el buscador para ver los datos del clima
				</p>
			</div>
		</section>
	);
}

export default InitialPage;

import ErrorPageIcon from '../../../components/icons/ErrorPageIcon';

function ErrorPage({ message }: { message: string }) {
	return (
		<section>
			<article className='mx-auto'>
				<ErrorPageIcon className='w-1/2' />
			</article>
			<article>
				<p className='text-lg font-light text-neutral-500 dark:text-neutral-400'>
					{message}
				</p>
			</article>
		</section>
	);
}

export default ErrorPage;

import ErrorPageIcon from '@/components/icons/ErrorPageIcon';

function ErrorPage({ message }: { message: string }) {
	return (
		<section className='w-full grow flex flex-col items-center justify-center gap-y-8'>
			<article>
				<ErrorPageIcon className='w-full' />
			</article>
			<article>
				<p className='text-lg font-light text-neutral-500 dark:text-neutral-400 font-primary'>
					{message}
				</p>
			</article>
		</section>
	);
}

export default ErrorPage;

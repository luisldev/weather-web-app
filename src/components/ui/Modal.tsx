import {
	type ReactNode,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	className?: string;
	title?: string;
	showCloseButton?: boolean;
	closeOnBackdrop?: boolean;
	closeOnEscape?: boolean;
	size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
	applyBackdropBlur?: boolean;
}

function Modal({
	isOpen,
	onClose,
	children,
	className = '',
	title = '',
	showCloseButton = true,
	closeOnBackdrop = true,
	closeOnEscape = true,
	size = 'default',
}: ModalProps) {
	const [shouldRender, setShouldRender] = useState(isOpen);
	const [isClosing, setIsClosing] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);
	const modalId = useId();
	const titleId = `${modalId}-title`;
	const contentId = `${modalId}-content`;

	// Configuración de las clases de tamaño
	const sizeClasses = {
		sm: 'w-full md:max-w-md',
		default: 'w-full md:w-1/2 md:max-w-xl',
		lg: 'w-full md:w-2/3 md:max-w-2xl',
		xl: 'w-full md:w-3/4 md:max-w-4xl',
		full: 'w-full max-w-full m-4',
	};

	// Manejador de la animación de cierre, envuelto en useCallback
	const handleClose = useCallback(() => {
		requestAnimationFrame(() => {
			setIsClosing(true);
		});
		setTimeout(() => {
			onClose();
		}, 200);
	}, [onClose]);

	// Maneja la apertura y cierre suave del modal
	useEffect(() => {
		if (isOpen) {
			setShouldRender(true);
			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setIsClosing(false);
				});
			});
		} else {
			setIsClosing(true);
			const timeoutId = setTimeout(() => {
				setShouldRender(false);
			}, 200);
			return () => clearTimeout(timeoutId);
		}
	}, [isOpen]);

	// Manejo de eventos de teclado y DOM
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen && closeOnEscape) {
				handleClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.setAttribute('data-modal-open', 'true');
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.removeAttribute('data-modal-open');
		};
	}, [isOpen, closeOnEscape, handleClose]);

	function handleBackdropClick(event: React.MouseEvent) {
		if (event.target === event.currentTarget && closeOnBackdrop) {
			handleClose();
		}
	}

	if (!shouldRender) {
		return null;
	}

	const backdropClasses = `fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-200 ease-out shadow-sm backdrop-blur-md ${
		isOpen && !isClosing ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0'
	}`;

	const modalClasses = `relative h-max bg-white dark:bg-neutral-900 rounded-xl shadow-xl transition-transform duration-200 ease-out p-2 ${
		sizeClasses[size]
	} ${
		isOpen && !isClosing
			? 'scale-100 translate-y-0 opacity-100'
			: 'scale-95 translate-y-4 opacity-0'
	} ${className} flex flex-col max-h-full`;

	return createPortal(
		<div
			ref={modalRef}
			role='dialog'
			aria-modal='true'
			aria-labelledby={title ? titleId : undefined}
			aria-describedby={contentId}
			className={backdropClasses}
			onClick={handleBackdropClick}
			onKeyDown={(e) => {
				if (e.key === 'Escape' && closeOnEscape) {
					handleClose();
				}
			}}
			tabIndex={-1}
		>
			<div className={`${modalClasses}`}>
				{(title || showCloseButton) && (
					<div className='flex flex-row w-full items-center justify-between px-2 py-1'>
						{title && (
							<h2 id={titleId} className='text-lg font-semibold'>
								{title}
							</h2>
						)}
						{showCloseButton && (
							<button
								className='p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors duration-150 ease-in group ml-auto'
								type='button'
								onClick={handleClose}
								aria-label='Cerrar modal'
							>
								<div className='transform group-hover:scale-110 transition-transform duration-150'>
									<svg
										className='w-5 h-5 text-gray-500 dark:text-neutral-400'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<title>Cerrar</title>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</div>
							</button>
						)}
					</div>
				)}
				<div
					id={contentId}
					className={`flex-1 transition-opacity duration-300 delay-75 p-1 overflow-y-auto scrollbar scrollbar-thumb-rounded-full scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-600 ${
						isClosing ? 'opacity-0' : 'opacity-100'
					} ${!title && !showCloseButton ? 'p-4' : ''}`}
				>
					{children}
				</div>
			</div>
		</div>,
		document.body,
	);
}

export default Modal;

import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
//npm i framer-motion@6
const Modal = forwardRef((props, ref) => {
	const [Open, setOpen] = useState(false);

	//모달을 여는 state변경함수를 부모 컴포넌트로 전달
	useImperativeHandle(ref, () => {
		return { setOpen: () => setOpen(true) };
	});

	useEffect(() => {
		Open
			? (document.body.style.overflow = 'hidden')
			: (document.body.style.overflow = 'auto');
	}, [Open]);

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='modal'
					initial={{ scale: 0 }}
					animate={{ rotate: 360, scale: 1 }}
					transition={{
						type: 'spring',
						stiffness: 260,
						damping: 20,
					}}
					exit={{ opacity: 0, y: 300, transition: { duration: 0.5 } }}
				>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { delay: 0.6 } }}
						exit={{ opacity: 0 }}
					>
						{props.children}
					</motion.div>
					<motion.span
						className='close'
						onClick={() => setOpen(false)}
						initial={{ y: 100, opacity: 0 }}
						animate={{ y: 0, opacity: 1, transition: { delay: 0.7 } }}
						exit={{ y: 100, opacity: 0 }}
					>
						Close
					</motion.span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
});

export default Modal;

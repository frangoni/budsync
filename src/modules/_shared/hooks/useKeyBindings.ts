import { useEffect } from 'react';

interface KeyBinding {
	key: string;
	callback: (event: KeyboardEvent) => void;
	ctrlKey?: boolean;
	shiftKey?: boolean;
}

function useKeyBindings(bindings: KeyBinding[]) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			bindings.forEach(({ key, callback, ctrlKey = false, shiftKey = false }) => {
				event.preventDefault();
				if (event.key === key && event.ctrlKey === ctrlKey && event.shiftKey === shiftKey) {
					callback(event);
				}
			});
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [bindings]);
}

export default useKeyBindings;

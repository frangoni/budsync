import { notification } from 'antd';
import { GlobalConfigProps } from 'antd/es/notification/interface';

export default function useNotification(config?: GlobalConfigProps) {
	notification.config({
		placement: 'bottomLeft',
		bottom: 50,
		duration: 3,
		rtl: false,
		showProgress: true,
		pauseOnHover: true,
		...config,
	});

	return notification;
}

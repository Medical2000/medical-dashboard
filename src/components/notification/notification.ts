import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';

export const showNotification = (
    type: 'success' | 'info' | 'warning' | 'error',
    message: string,
    description?: string,
    placement?: NotificationPlacement,
    style?: object,
    className?: string,
) => {
    notification[type]({
        message,
        description,
        duration: 2,
        placement,
        style,
        className,
    });
};

import { Modal } from "antd";
import { ExclamationCircleFilled } from '@ant-design/icons';

interface Iporps {
    name?: string,
    handleClick?: () => void;
}

const { confirm } = Modal;
export const showDeleteConfirm = ({ name, handleClick }: Iporps) => {
    confirm({
        title: ` Are you sure delete this ${name}?`,
        icon: <ExclamationCircleFilled />,
        content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            handleClick && handleClick();
        },
        onCancel() {
            console.log('Cancel');
        },
    });
};
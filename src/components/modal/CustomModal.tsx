import { Modal } from 'antd'
import { ReactNode } from "react";

type CustomModalProps = {
    setIsModalVisible: (data: boolean) => void;
    open: boolean;
    children: ReactNode;
    title?: string;
    width?: string | number;
};

export const CustomModal = (props: CustomModalProps) => {
    const { setIsModalVisible, open, children, title, width } = props;

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Modal
            title={title}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
            width={width ? width : 1000} 
            okText="Save"
            cancelText="Cancel"
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        >
            {children}
        </Modal>
    );
};

import { FormInstance, Modal } from 'antd'
import { ReactNode } from "react";

type CustomModalProps = {
    setIsModalVisible: (data: boolean) => void;
    isModalVisible: boolean;
    children: ReactNode;
    title?: string;
    width?: string | number;
    form?: FormInstance<any>
};

export const CustomModal = (props: CustomModalProps) => {
    const { setIsModalVisible, isModalVisible, children, title, width, form } = props;

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        form && form.resetFields();
        setIsModalVisible(false);
    };

    return (
        <Modal
            title={title}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={width ? width : 1000}
            okText="Save"
            footer={null}
            cancelText="Cancel"
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        >
            {children}
        </Modal>
    );
};

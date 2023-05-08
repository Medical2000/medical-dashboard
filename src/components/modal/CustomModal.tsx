import { FormInstance, Modal } from 'antd'
import { ReactNode } from "react";

type CustomModalProps = {
    setIsModalVisible: (data: boolean) => void;
    handleSave?: () => void;
    isModalVisible: boolean;
    children: ReactNode;
    title?: string;
    width?: string | number;
    form?: FormInstance<any>;
    centered?: boolean;
    footer?: ReactNode;
};

export const CustomModal = (props: CustomModalProps) => {
    const { setIsModalVisible, isModalVisible, children, title, width, form, centered, footer, handleSave } = props;

    const handleOk = () => {
        handleSave && handleSave();
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
            okText="Lưu"
            centered={centered}
            // okType='submit'
            footer={footer}
            cancelText="Hủy"
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        >
            {children}
        </Modal>
    );
};

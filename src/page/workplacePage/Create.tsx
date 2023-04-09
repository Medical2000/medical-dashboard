import { Modal } from 'antd'
import React from 'react'

interface Iporps {
    open: boolean;
    hideModal: () => void;
}

const Create = ({ open, hideModal }: Iporps) => {
    return (
        <Modal
        // centered
            title="Modal"
            open={open}
            onOk={hideModal}
            onCancel={hideModal}
            okText="确认"
            cancelText="取消"
            bodyStyle={{ overflowY: "auto", maxHeight: "calc(100vh - 200px)" }}
        >
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
            <p>Bla bla ...</p>
        </Modal>
    )
}

export default Create
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { deleteWorkplace, getAllWorkplaces } from '../../redux/action/workplace';
import { Space, Table, Input, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IWorkplace } from '../../interface/workplace';
import { DeleteFilled } from '@ant-design/icons';
import { showDeleteConfirm } from '../../components/showDeleteConfirm/showDeleteConfirm';
import { showNotification } from '../../components/notification/notification';
import { resetError } from '../../redux/reducer/workplace';
import './styles.css'
import Create from './Create';


const Workplace = () => {
    const { Search } = Input;
    const dispatch = useAppDispatch();
    const workplaceSelect = useAppSelector((state) => state.workplace);
    const [open, setOpen] = useState(false);
    const columns: ColumnsType<IWorkplace> = [
        {
            title: 'Nbr.',
            dataIndex: 'nbr',
            rowScope: 'row',
        },
        {
            title: 'Name',
            render: (text) => <a>{text}</a>,
            dataIndex: 'name'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'City',
            dataIndex: 'city',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record) => (
                <DeleteFilled style={{ fontSize: '16px', color: '#555555' }} onClick={() => (handleDelete(record.id))} />
            ),
        },
    ];
    useEffect(() => {
        dispatch(getAllWorkplaces());
    }, [dispatch])

    useEffect(() => {
        if (workplaceSelect.success === false) {
            showNotification('error', 'Error', workplaceSelect.message);
            dispatch(resetError());
        } else if (workplaceSelect.success) {
            showNotification('success', 'Success', workplaceSelect.message);
            dispatch(resetError());
        };
    }, [workplaceSelect.success, dispatch])

    const handleDelete = (id: string) => {
        const handleDeleteWorkplace = () => {
            dispatch(deleteWorkplace(id));
        }
        showDeleteConfirm({ name: 'workplace', handleClick: handleDeleteWorkplace })
    };
    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Create open={open} hideModal={hideModal} />
            <div className='headerList' >
                <Search
                    placeholder="Enter search workplace..."
                    allowClear
                    size="large"
                    style={{ width: '70%' }}

                // onSearch={onSearch}
                />
                <Button
                    type="primary"
                    size='large'
                    style={{ backgroundColor: '#1C6BA4' }}
                    onClick={showModal}
                >
                    Add workplace
                </Button>
            </div>
            <Table
                loading={workplaceSelect.loading}
                bordered columns={columns}
                dataSource={workplaceSelect.workplace.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
        </>
    )
}

export default Workplace
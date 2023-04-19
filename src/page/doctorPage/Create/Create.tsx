import React from 'react';
import { FormInstance, Tabs, TabsProps } from 'antd';
import General from './General';
import { useAppDispatch } from '../../../redux/store';
import { IDoctor } from '../../../interface/doctor';
import { createDoctor } from '../../../redux/action/doctor';
import Task from './Task';

export const Creates = ({ form, setIsModalVisibleCreate }: { setIsModalVisibleCreate: (value: boolean) => void, form: FormInstance<any> }) => {

    const dispatch = useAppDispatch();
    const handleCreate = (values: IDoctor) => {
        dispatch(createDoctor({ ...values })).then((res) => {
            if (res.payload.status === 200) {
                form.resetFields();
                setIsModalVisibleCreate(false);
            };
        });
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `General`,
            children: <General handleCreate={handleCreate} form={form} />,
        },
        {
            key: '2',
            label: `Tasks`,
            children: <Task />,
        },
    ];
    return (
        <Tabs
            defaultActiveKey="1" size='large' items={items} />
    )
}

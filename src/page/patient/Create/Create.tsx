import React from 'react';
import { Button, Form, FormInstance, Tabs, TabsProps } from 'antd';
import General from './General';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import Task from './Task';
const layout = {
    labelCol: { span: 6 },
};
export const Creates = ({ form, setIsModalVisibleCreate }: { setIsModalVisibleCreate: (value: boolean) => void, form: FormInstance<any> }) => {

    const bloodGroups = useAppSelector((state) => state.bloodGroup);

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `General`,
            children: <General
            />,
        },
        {
            key: '2',
            label: `Tasks`,
            children: <Task
                bloodGroups={bloodGroups.bloodGroups} />,
        },
    ];
    return (
        <Form
            {...layout}
            form={form}
            size='large'
            name="nest-2"
            style={{ overflowX: 'hidden', height: 400 }}
        >
            <Tabs
                defaultActiveKey="1" size='large' items={items} />
        </Form>
    )
}
import React from 'react';
import { Button, Form, FormInstance, Tabs, TabsProps } from 'antd';
import General from './Create/General';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import Task from './Create/Task';
import { IDoctor } from '../../interface/doctor';
import dayjs from 'dayjs';
const layout = {
    labelCol: { span: 6 },
};
export const Update = ({ form, setIsModalVisibleCreate, data }: { setIsModalVisibleCreate: (value: boolean) => void, form: FormInstance<any>, data: IDoctor }) => {

    const DegreesSelect = useAppSelector((state) => state.degree);
    const WorkplaceSelect = useAppSelector((state) => state.workplace);
    React.useEffect(() => {
        const email = data.user.email;
        const firstname = data.user.firstname;
        const lastname = data.user.lastname;
        const address = data.user.address;
        const gender = data.user.gender;
        const user_name = data.user.user_name;
        const status = data.user.status;
        const phone = data.user.phone;
        const formatDate = dayjs(data.user.date_of_birth);
        
        form.setFieldsValue({ ...data, formatDate, email, firstname, lastname, address, gender, user_name, status, phone })
    }, [data])

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Chung`,
            children: <General
                data={data}
            />,
        },
        {
            key: '2',
            label: `Công việc`,
            children: <Task
                DegreesSelect={DegreesSelect.degrees}
                WorkplaceSelect={WorkplaceSelect.workplaces} />,
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

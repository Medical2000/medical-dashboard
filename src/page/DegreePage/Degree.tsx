import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { Table, Input, Button, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteFilled } from '@ant-design/icons';
import { showDeleteConfirm } from '../../components/showDeleteConfirm/showDeleteConfirm';
import { showNotification } from '../../components/notification/notification';
import './styles.css'

import { CustomModal } from '../../components/modal/CustomModal';
import { UpdateRole, createRole, deleteRole, getAllRoles, getOneRole } from '../../redux/action/role';

import Create from './Create';
import Update from './Update';
import { IDegree } from '../../interface/doctor';
import { UpdateDegree, createDegree, deleteDegree, getAllDegrees, getOneDegree } from '../../redux/action/degree';
import { resetError } from '../../redux/reducer/degree';



const Degree = () => {
  const { Search } = Input;
  const dispatch = useAppDispatch();
  const degreeSelect = useAppSelector((state) => state.degree);
  const [form] = Form.useForm();
  const [isModalVisibleCreate, setIsModalVisibleCreate] = useState(false);
  const [isModalVisibleUpdate, setIsModalVisibleUpdate] = useState(false);
  const columns: ColumnsType<IDegree> = [
    {
      title: 'Nbr.',
      dataIndex: 'nbr',
      rowScope: 'row',  
    },
    {
      title: 'Name',
      key: 'id',
      render: (record) => (
        <a style={{ fontWeight: 600 }} onClick={() => showModalUpdate(record.id)}>{record.name}</a>
      ),
    },
    {
      title: 'Abbreviation',
      dataIndex: 'abbreviation',
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
    dispatch(getAllDegrees());
  }, [dispatch])

  useEffect(() => {
    console.log(degreeSelect)
    if (degreeSelect.success === false) {
      showNotification('error', 'Error', degreeSelect.message);
      dispatch(resetError());
    } else if (degreeSelect.success) {
      showNotification('success', 'Success', degreeSelect.message);
      dispatch(resetError());
    };
  }, [degreeSelect.success, dispatch]);

  const handleDelete = (id: string) => {
    const handleDeleteDegree = () => {
      dispatch(deleteDegree(id));
    }
    showDeleteConfirm({ name: 'Degree', handleClick: handleDeleteDegree })
  };

  const showModalCreate = () => {
    setIsModalVisibleCreate(true);
  };

  const showModalUpdate = (id: string) => {
    dispatch(getOneDegree(id));

    setIsModalVisibleUpdate(true);
  };

  const handleCreate = (values: IDegree) => {
    dispatch(createDegree(values)).then((res) => {
      if (res.payload.status === 200) {
        form.resetFields();
        setIsModalVisibleCreate(false);
      };
    });
  };

  const handleUpdate = (values: IDegree) => {
    dispatch(UpdateDegree(values)).then((res) => {
      if (res.payload.status === 200) {
        // form.resetFields();
        setIsModalVisibleUpdate(false);
      };
    });
  };

  return (
    <>
      <CustomModal
        title='Create a new  Degree'
        isModalVisible={isModalVisibleCreate}
        setIsModalVisible={setIsModalVisibleCreate}
        form={form}
        width={800}
      >
        <Create
          handleCreate={handleCreate}
          form={form}
        />
      </CustomModal>

      <CustomModal
        title='Update a Degree'
        isModalVisible={isModalVisibleUpdate}
        setIsModalVisible={setIsModalVisibleUpdate}
        width={800}
      >
        <Update
          handleUpdate={handleUpdate}
          data={degreeSelect.degree}
          form={form}
        />
      </CustomModal>

      <div className='headerList' >
        <Search
          placeholder="Enter search Degree..."
          allowClear
          size="large"
          style={{ width: '70%' }}

        // onSearch={onSearch}
        />
        <Button
          type="primary"
          size='large'
          style={{ backgroundColor: '#1C6BA4' }}
          onClick={showModalCreate}
        >
          Add Degree
        </Button>
      </div>

      <Table
        loading={degreeSelect.loading}
        bordered columns={columns}
        dataSource={degreeSelect.degrees.map((item, index) => ({ ...item, nbr: index + 1, key: index }))} />
    </>
  )
}

export default Degree;
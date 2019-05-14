import React, { useState, useEffect } from 'react'
import { Table, Modal, Form, Input, Button, Row, Col, Tooltip } from 'antd'
import ProductForm from './ProductForm'
import * as service from '../service/productService'

const Search = Input.Search

export default function Product() {
  const [data, setData] = useState([])

  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)

  let formRef
  let formRefs = []

  const showModal = () => {
    setVisible(true)
  }

  const handleCreate = e => {
    console.log('Creating...')
    formRef.getForm().validateFields(async (err, values) => {
      if (!err) {        
        const created = await service.create(values)

        setData(data.concat(created))
      }
    })
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
    setVisible(false)
  }

  const handleCancel = e => {
    console.log('Cancelled.')
    setVisible(false)
  }

  const showModalEdit = () => {
    setVisibleEdit(true)
  }

  const handleCancelEdit = e => {
    console.log('Cancelled.')
    setVisibleEdit(false)
  }

  const handleSaveEdit = id => {
    console.log('Saving...')
    console.log(formRef.getForm().getFieldsValue())
    // setTimeout(() => {
    //   this.setState({ loading: false, visible: false });
    // }, 3000);
    setVisibleEdit(false)
  }

  const handleDeleteEdit = id => {
    console.log('Deleting...')

    setVisibleEdit(false)
  }

  const saveFormRef = (_formRef, index) => {
    formRef = _formRef
  }

  const saveFormRefEdition = (_formRef, index) => {
    return function(_formRef) {
      console.log(index)
      formRefs[index] = _formRef
    }
  }

  useEffect(() => {
    const fetchData = async() => {
      setData(await service.getAll()) 
    }
    fetchData()
  }, [])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Unit Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      key: 'action',
      width: 100,
      align: 'center',
      render: (text, record, index) => {
        return (
          <div>
            <Tooltip title="Edit">
              <Button
                icon="form"
                style={{ width: 40 }}
                onClick={showModalEdit}
              />
            </Tooltip>
            <ProductForm
              ref={saveFormRefEdition(index)}
              visible={visibleEdit}
              edition={true}
              onCancel={handleCancelEdit}
              onSave={handleSaveEdit}
              onDelete={handleDeleteEdit}
              product={record}
            />
          </div>
        )
      }
    }
  ]

  return (
    <React.Fragment>
      <Row style={{ paddingBottom: 25 }} gutter={6}>
        <Col span={18}>
          <Search placeholder="Search" onSearch={value => console.log(value)} />
        </Col>
        <Col span={6}>
          <Button
            type="primary"
            icon="plus"
            style={{ width: '100%' }}
            onClick={showModal}
          >
            New Product
          </Button>
          <ProductForm
            ref={saveFormRef}
            visible={visible}
            edition={false}
            onCancel={handleCancel}
            onCreate={handleCreate}
          />
        </Col>
      </Row>
      <Table columns={columns} dataSource={data} rowKey={record => record.id} />
    </React.Fragment>
  )
}

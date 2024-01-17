import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import { Space, Table, Form, Card, Input, Pagination, Button, Select, Modal, Upload, Tooltip, Badge, Segmented, Avatar, Checkbox, notification, Drawer, Divider, Watermark, message } from 'antd';
import { Row, Col } from 'react-bootstrap';
import CrearBodegaForm from './crearbodega';
import imgmesas from './res/imgmesas.png';

const EditarBodegaForm = () => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [bodegas, setBodegas] = useState([]);
    const [visible, setVisible] = useState(false);
    const [editingBodega, setEditingBodega] = useState(null);
    const [form] = Form.useForm();
    const [selectedOpcion, setSelectedOpcion] = useState('Bodegas');
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [openp, setOpenp] = useState(false);
    const columns = [
        {
            title: 'ID de Sucursal',
            dataIndex: 'id_sucursal',
            key: 'id_sucursal',
        },
        {
            title: 'Nombre de la Bodega',
            dataIndex: 'nombrebog',
            key: 'nombrebog',
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => handleEditar(record)}>Editar</Button>
                </Space>
            ),
        },
    ];
    const onClosep = () => {
        setOpenp(false);
    };

    const Changueopcion = (value) => {
        setSelectedOpcion(value);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const showDrawerp = () => {
        setOpenp(true);
    };

    const handleEditar = (record) => {
        form.setFieldsValue(record);
        setEditingBodega(record.id ? record : null);
        setVisible(true);
        setEditModalVisible(true);
    };

    const handleCancelar = () => {
        fetchData(currentPage);
        setEditingProductId(null);
        setInitialFormValues(null);
        setEditModalVisible(false);
    };
    
    const handleGuardar = async () => {
        try {
            if (!editingBodega) {
                console.error('No se ha seleccionado ninguna bodega para editar.');
                return;
            }

            const values = await form.validateFields();
            const response = await fetch(`https://pedidosbak-production.up.railway.app/bodega/editar/${editingBodega.id}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            if (response.ok) {
                const data = await response.json();
                message.success(data.mensaje);
                setVisible(false);
                setEditingBodega(null);
            } else {
                const data = await response.json();
                message.error(data.error || 'Error al editar la bodega');
            }
        } catch (error) {
            console.error('Error al editar la bodega:', error);
        }
    };



    const cargarBodegas = async () => {
        try {
            const response = await fetch('https://pedidosbak-production.up.railway.app/bodega/listar/');
            const data = await response.json();
            setBodegas(data.bodegas);
        } catch (error) {
            console.error('Error al obtener la lista de bodegas:', error);
        }
    };

    useEffect(() => {
        form.resetFields();
        if (!editModalVisible) {
            cargarBodegas(currentPage);
        }
    }, [bodegas]);

    return (
        <div>
            <Row>
                <Col md={12}>
                    <Segmented
                        options={[
                            {
                                label: (
                                    <Tooltip title="Bodegas">
                                        <div style={{ padding: 4 }}>
                                            <Avatar shape="square" src={imgmesas} size="large" />
                                        </div>
                                    </Tooltip>
                                ),
                                value: 'Bodegas',
                            }
                        ]}
                        value={selectedOpcion}
                        onChange={Changueopcion}
                    />
                </Col>
                {selectedOpcion === 'Bodegas' && (
                    <>
                        <Divider>Control bodegas</Divider>
                        <Col md={12}>
                            <Button type="primary" style={{ width: '100%', margin: '2%' }} onClick={showDrawerp}>
                                Crear nueva bodega
                            </Button>
                        </Col>
                        <Col md={12}>
                            <Row>
                                <Table columns={columns} dataSource={bodegas} rowKey="id" />
                                <Modal
                                    title="Editar Bodega"
                                    visible={visible}
                                    onCancel={handleCancelar}
                                    onOk={handleGuardar}
                                    okText="Guardar"
                                    cancelText="Cancelar"
                                >
                                    <Form form={form} layout="vertical">
                                        <Form.Item label="Nombre de la Bodega" name="nombrebog">
                                            <Input />
                                        </Form.Item>
                                        <Form.Item label="Descripción" name="descripcion">
                                            <Input.TextArea />
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </Row>
                            <Pagination current={currentPage} total={total} onChange={handlePageChange} pageSize={8} style={{ marginTop: '16px', textAlign: 'center' }} />
                        </Col>
                    </>
                )}
            </Row>
            <Drawer
                title="Crear Bodega"
                width={720}
                onClose={onClosep}
                open={openp}
                styles={{
                    body: {
                        paddingBottom: 80,
                    },
                }}
            >
                <CrearBodegaForm />
            </Drawer>
        </div>
    );
};

export default EditarBodegaForm;
=======
import { Table, Space, Button, Modal, Form, Input, Select, message } from 'antd';

const { Option } = Select;

const ListarEditarBodegas = () => {
  const [bodegas, setBodegas] = useState([]);
  const [sucursales, setSucursales] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingBodega, setEditingBodega] = useState(null);
  const [form] = Form.useForm();

  const columns = [
    {
      title: 'ID de Sucursal',
      dataIndex: 'id_sucursal',
      key: 'id_sucursal',
    },
    {
      title: 'Nombre de la Bodega',
      dataIndex: 'nombrebog',
      key: 'nombrebog',
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={() => handleEditar(record)}>Editar</Button>
        </Space>
      ),
    },
  ];

  const handleEditar = (record) => {
    form.setFieldsValue(record);
    setEditingBodega(record);
    setVisible(true);
  };

  const handleCancelar = () => {
    setVisible(false);
    setEditingBodega(null);
  };

  const handleGuardar = async () => {
    try {
      const values = await form.validateFields();
      const response = await fetch(`http://pedidosbak-production.up.railway.app/bodega/editar/${editingBodega.id_sucursal}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.mensaje);
        setVisible(false);
        setEditingBodega(null);
        cargarBodegas();
      } else {
        const data = await response.json();
        message.error(data.error || 'Error al editar la bodega');
      }
    } catch (error) {
      console.error('Error al editar la bodega:', error);
    }
  };

  const cargarBodegas = async () => {
    try {
      const response = await fetch('http://pedidosbak-production.up.railway.app/bodega/listar/');
      const data = await response.json();
      setBodegas(data.bodegas);
    } catch (error) {
      console.error('Error al obtener la lista de bodegas:', error);
    }
  };

  const cargarSucursales = async () => {
    try {
      const response = await fetch('http://pedidosbak-production.up.railway.app/sucursal/sucusarleslist/');
      const data = await response.json();
      setSucursales(data.sucursales);
    } catch (error) {
      console.error('Error al obtener la lista de sucursales:', error);
    }
  };

  useEffect(() => {
    cargarBodegas();
    cargarSucursales();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={bodegas} rowKey="id_sucursal" />
      <Modal
        title="Editar Bodega"
        visible={visible}
        onCancel={handleCancelar}
        onOk={handleGuardar}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Nombre de la Bodega" name="nombrebog">
            <Input />
          </Form.Item>
          <Form.Item label="Descripción" name="descripcion">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="ID de Sucursal" name="id_sucursal">
            <Select>
              {sucursales.map((sucursal) => (
                <Option key={sucursal.id_sucursal} value={sucursal.id_sucursal}>
                  {sucursal.snombre}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListarEditarBodegas;
>>>>>>> 777b8a1edfef1dc28b1b4e984052a7d8f60713ea

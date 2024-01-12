import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';

const EditarTipoProducto = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [data, setTiposProductos] = useState([]);
  const [tipoProductoId, setTipoProductoId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetch('https://pedidosbak-production.up.railway.app/producto/listarproductos/')
      .then(response => response.json())
      .then(data => setTiposProductos(data.tipos_productos))
      .catch(error => console.error('Error fetching tipos de productos:', error));
  }, []);

  const columns = [
    {
      title: 'Nombre del Tipo de Producto',
      dataIndex: 'tpnombre',
      key: 'tpnombre',
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
        <Button type="link" onClick={() => handleEdit(record.id_tipoproducto)}>
          Editar
        </Button>
      ),
    },
  ];

  const handleEdit = (id) => {
    setTipoProductoId(id);
    setModalVisible(true);

    const tipoProductoSeleccionado = data.find(tipo => tipo.id_tipoproducto === id);

    form.setFieldsValue({
      name: tipoProductoSeleccionado.tpnombre,
      description: tipoProductoSeleccionado.descripcion,
    });
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const onFinish = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('tpnombre', values.name);
      formData.append('descripcion', values.description);

      const response = await fetch(`https://pedidosbak-production.up.railway.app/producto/editar_tipo_producto/${tipoProductoId}/`, {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        message.success(responseData.mensaje);
        setModalVisible(false);

        fetch('https://pedidosbak-production.up.railway.app/producto/listarproductos/')
          .then(response => response.json())
          .then(data => setTiposProductos(data.tipos_productos))
          .catch(error => console.error('Error fetching tipos de productos:', error));
      } else {
        message.error(responseData.error || 'Hubo un error al realizar la solicitud');
      }
    } catch (error) {
      message.error('Hubo un error al realizar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Table dataSource={data} columns={columns} rowKey="id_tipoproducto" />
      <Modal
        title="Editar Tipo de Producto"
        open={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Nombre del tipo de producto"
            name="name"
            rules={[
              { required: true, message: 'Por favor ingresa el nombre del tipo de producto' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('name') && getFieldValue('name').length > 300) {
                    return Promise.reject('El nombre del tipo de producto no puede exceder los 300 caracteres.');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Descripción" name="description"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (getFieldValue('description') && getFieldValue('description').length > 500) {
                    return Promise.reject('La descripción no puede exceder los 500 caracteres.');
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          {form.getFieldValue('description') && form.getFieldValue('description').length > 500 && (
            <p style={{ color: 'red' }}>La descripción no puede exceder los 500 caracteres.</p>
          )}
          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Guardar cambios
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditarTipoProducto;

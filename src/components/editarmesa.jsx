import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';

const EditarMesa = () => {
  const [mesas, setMesas] = useState([]);
  const [editingMesa, setEditingMesa] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetch('https://pedidosbak-production.up.railway.app/Mesas/ver_mesas/')
      .then(response => response.json())
      .then(data => setMesas(data.mesas))
      .catch(error => console.error('Error al obtener las mesas:', error));
  }, []);

  const showEditModal = (mesa) => {
    setEditingMesa(mesa);
    form.setFieldsValue({
      observacion: mesa.observacion,
      estado: mesa.estado,
      activa: mesa.activa.toString(),
      max_personas: mesa.max_personas.toString(),
    });
    showModal();
  };

  const handleEdit = async () => {
    try {
      const values = form.getFieldsValue();
      const mesa_id = editingMesa.id_mesa;

      const formData = new FormData();
      formData.append('observacion', values.observacion);
      formData.append('estado', values.estado);
      formData.append('activa', values.activa);
      formData.append('max_personas', values.max_personas);

      await fetch(`https://pedidosbak-production.up.railway.app/Mesas/editar_mesa/${mesa_id}/`, {
        method: 'POST',
        body: formData,
      });

      fetch('https://pedidosbak-production.up.railway.app/Mesas/ver_mesas/')
        .then(response => response.json())
        .then(data => setMesas(data.mesas))
        .catch(error => console.error('Error al obtener las mesas:', error));

      hideModal();
      
      message.success('Mesa editada con éxito');
    } catch (error) {
      console.error('Error al editar la mesa:', error);
      message.error('Error al editar la mesa');
    }
  };

  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setEditingMesa(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Observación',
      dataIndex: 'observacion',
      key: 'observacion',
    },
    {
      title: 'Estado',
      dataIndex: 'estado',
      key: 'estado',
      render: estado => {
        const estadoMapping = {
          'D': 'Disponible',
          'R': 'Reservada',
          'U': 'En uso',
          'A': 'Atendida',
        };
        return estadoMapping[estado];
      },
    },
    {
      title: 'Activa',
      dataIndex: 'activa',
      key: 'activa',
      render: activa => (activa ? 'Activa' : 'Desactivada'),
    },
    {
      title: 'Max Personas',
      dataIndex: 'max_personas',
      key: 'max_personas',
    },
    {
      title: 'Acciones',
      dataIndex: 'acciones',
      key: 'acciones',
      render: (_, mesa) => (
        <Button type="primary" onClick={() => showEditModal(mesa)}>
          Editar
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Mesas</h1>
      <Table dataSource={mesas} columns={columns} rowKey="id_mesa" />

      <Modal
        title="Editar Mesa"
        visible={visible}
        onOk={handleEdit}
        onCancel={hideModal}
      >
        <Form form={form}>
          <Form.Item label="Observación" name="observacion">
            <Input />
          </Form.Item>
          <Form.Item label="Estado" name="estado">
            <Select>
              <Select.Option value="D">Disponible</Select.Option>
              <Select.Option value="R">Reservada</Select.Option>
              <Select.Option value="U">En uso</Select.Option>
              <Select.Option value="A">Atendida</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Activa" name="activa">
            <Select>
              <Select.Option value="1">Activa</Select.Option>
              <Select.Option value="0">Desactivada</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Max Personas" name="max_personas">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default EditarMesa;

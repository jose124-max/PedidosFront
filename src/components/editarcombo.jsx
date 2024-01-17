import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Avatar, Modal } from 'antd';

const EditarCombo = () => {
  const [combos, setCombos] = useState(null);
  const [selectedCombo, setSelectedCombo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pedidosbak-production.up.railway.app/combos/ver_combos/');
        if (!response.ok) {
          throw new Error('Error fetching combos');
        }
        const data = await response.json();
        setCombos(data.combos);
      } catch (error) {
        console.error('Error fetching combos:', error);
      }
    };

    fetchData();
  }, []);

  const handleComboClick = (combo) => {
    setSelectedCombo(combo);
  };

  const handleCloseModal = () => {
    setSelectedCombo(null);
  };

<<<<<<< HEAD
  if (!combos) {
    return <div>Cargando...</div>;
  }
=======
  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('id_catcombo', values.id_catcombo);
      formData.append('puntoscb', values.puntoscb);
      formData.append('nombrecb', values.nombrecb);
      formData.append('descripcioncombo', values.descripcioncombo);
      formData.append('preciounitario', values.preciounitario);

      const response = await fetch(`https://pedidosbak-production.up.railway.app/combos/editarcombo/${selectedCombo.id_combo}/`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al editar combo');
      }

      message.success('Combo editado con éxito');
      fetchCombos();
      handleCloseModal();

    } catch (error) {
      console.error('Error al editar combo:', error);
      message.error('Error al editar combo');
    }
  };

  const fetchCombos = async () => {
    try {
      const responseCombos = await fetch('https://pedidosbak-production.up.railway.app/combos/ver_combos/');
      if (!responseCombos.ok) {
        throw new Error('Error fetching combos');
      }
      const dataCombos = await responseCombos.json();
      setCombos(dataCombos.combos);
    } catch (error) {
      console.error('Error fetching combos:', error);
    }
  };
>>>>>>> 777b8a1edfef1dc28b1b4e984052a7d8f60713ea

  return (
    <div>
      <Row gutter={16}>
        {combos.map((combo, index) => (
          <Col span={8} key={index}>
            <Card
              style={{ marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => handleComboClick(combo)}
            >
              <Card.Meta
                avatar={<Avatar src={`data:image/jpeg;base64,${combo.imagen}`} size={100} />}
                title={combo.nombrecb}
                description={`Descripción: ${combo.descripcioncombo}\nPrecio Unitario: $${combo.preciounitario}`}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para mostrar todos los productos del combo seleccionado */}
      <Modal
        title={`Productos de ${selectedCombo ? selectedCombo.nombrecb : ''}`}
        visible={!!selectedCombo}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedCombo && selectedCombo.productos.length > 0 ? (
          <div>
            <p>Productos:</p>
            <ul>
              {selectedCombo.productos.map((producto) => (
                <li key={producto.id_producto}>{producto.nombreproducto}</li>
              ))}
            </ul>
          </div> 
        ) : (
          <p>No hay productos asociados a este combo</p>
        )}
      </Modal>
    </div>
  );
};

export default EditarCombo;

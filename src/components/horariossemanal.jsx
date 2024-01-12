import React, { useEffect, useState } from 'react';

const HorariosSemanales = () => {

    useEffect(() => {
        return () => {
        };
    }, []);

    return (
        <>
            <h1>Horarios Semanales</h1>
            <div style={{ flex: 1, marginRight: '50px', padding: '2px' }}>
                <Table
                    columns={[
                        { title: 'NombreH', dataIndex: 'Horarios', key: 'Horarios' },
                        { title: 'Horarios', dataIndex: 'Horarios', key: 'Horarios' },
                    ]}
                    dataSource={[
                        {
                            title: 'Estado',
                            dataIndex: 'Estado',
                            key: 'Estado',
                            Estado:
                                <Switch
                                    defaultChecked={sucursalData && sucursalData.sestado === '1'}
                                    checked={sucursalData && sucursalData.sestado === '1'}
                                    onChange={(checked) => handleSwitchChange(checked)}
                                />
                        },
                    ]}
                    pagination={false}
                    size="middle"
                    bordered
                />
            </div>
            <div style={{ flex: 1, marginRight: '50px', padding: '2px' }}>
            </div>
        </>
    );
};

export default HorariosSemanales;
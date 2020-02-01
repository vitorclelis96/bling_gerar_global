import React from 'react';
import Table from 'react-bootstrap/Table';


const RelatorioGlobal = (props) => {
    return (
        <React.Fragment>
            <Table responsive bordered size="sm" >
                <thead>
                    <th>#</th>
                    <th>Nome Produto</th>
                    <th>Quantidade</th>
                </thead>
                <tbody>
                    {props.items.map((item) => {
                        return (
                            <tr key={item.codigo}>
                                <td>{item.codigo}</td>
                                <td>{item.nome}</td>
                                <td>{item.quantidade}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </React.Fragment>
        
    )
}

export default RelatorioGlobal;
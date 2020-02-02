import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const LISTA_ROTAS = ["", "Eldorado/Waldeque", "Durval de Barros", "Serrinha", "Betim", "Industrial", "Nova Contagem", "Barreiro", "Cabana", "Sarzedo/Mario Campos", "Jardim Canada", "Alipio de Melo"];

const RotaSelector = (props) => {
    return (
        <Form onSubmit={props.onSubmit}>
            {
                props.listaClientes.map((cliente) => {
                    return (
                        <Form.Group as={Row} key={cliente}>
                            <Form.Label column sm="4">
                                {cliente.toString()}
                            </Form.Label>
                            <Col sm="8">
                                <Form.Control as="select" name={cliente} 
                                    onChange={props.onChange}>
                                        {LISTA_ROTAS.map(rota => {
                                            return (<option value={rota}>{rota}</option>)
                                        })}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                    )
                })
            }
            <Button 
                variant="primary" 
                type="submit" disabled={props.disabled}>
                Enviar
            </Button>
        </Form>
    )
}


export default RotaSelector;


/* const a = <form onSubmit={clienteRotaHandler}>
{listClients.map((client) => {
  return (
    <div key={client}>
      {client.toString()} : 
      <input 
        type="text" 
        name={client.toString()}
        placeholder="Rota" 
        onChange={clientRotaMapHandler}
        required
      />
    </div>
  )
})}
<button type="submit">Submit</button>
</form> */


/* const b = (
    <Form.Control
        type="text"
        name={cliente.toString()}
        placeholder="Rota" 
        onChange={props.onChange}
    />
) */
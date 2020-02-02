import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const RotaSelector = (props) => {
    return (
        <Form onSubmit={props.onSubmit}>
            <Form.Group>
                <Form.Label>Selecione a Rota para imprimir.</Form.Label>
                <Form.Control as="select" onChange={props.onChange}>
                    <option value={null}></option>
                    {
                        props.routes.map((route) => {
                            return (
                                <option 
                                    key={route} 
                                    value={route}
                                >{route.toString()}
                                </option>
                            )
                        })
                    }
                </Form.Control>
            </Form.Group>
            <Button 
                variant="primary" 
                type="submit" disabled={props.disabled}>
                Enviar
            </Button>        
        </Form>
     )
}


export default RotaSelector;



/* 
<form onSubmit={generateGlobalHandler}>
    <select value={selectedRoute} onChange={selectedRouteHandler}>
    <option></option>
    {uniqueRoutes.map((route) => {
        return (
        <option key={route} value={route}>{route.toString()}</option>
        )
    })}
    </select>
    <button type="submit">Submit</button>
</form>
 */
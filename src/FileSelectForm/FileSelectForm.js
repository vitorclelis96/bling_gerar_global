import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';


const FileSelectForm = (props) => {
    return (
        <Form enctype="multipart/form-data" onSubmit={props.onSubmit}>
            <Form.Group as={Row} controlId="formFileInput">
                <Col sm="10">
                    <Form.Control type="file" name="file" onChange={props.onChange} />
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={props.disabled}>Enviar</Button>
        </Form>
    )
}


export default FileSelectForm;



/* const a = (
    <form onSubmit={props.onSubmit} enctype="multipart/form-data">
          <input type="file" name="file" onChange={props.onChange} />
          <button type="submit">Submit</button>
        </form>
) */
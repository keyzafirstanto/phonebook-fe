import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'





export default function TextInput(props) {
    return (
        <Col lg={props.sizeLG} xs={props.sizeXS}>
            <Form.Group className="mb-3">
                <Form.Label>{props.label}</Form.Label>
                <Form.Control
                    disabled={props.disabled}
                    name={props.name}
                    type={props.type}
                    placeholder={props.value || props.placeholder } 
                    onBlur={props.handelChange}
                    defaultValue={props.value}
                />
                <Form.Text className='error'>
                    {props.error.map((error, index) => <li key={index}>{error}</li>)}
                </Form.Text>
            </Form.Group>
        </Col>
    )
}
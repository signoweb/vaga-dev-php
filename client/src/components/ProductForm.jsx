import TextInput from "./TextInput";
import Row from "./Row";

export default function ProductForm(props) {
    return (
        <>
            <form className="col s12" onSubmit={(e) => e.preventDefault()}>
                <Row>
                    <TextInput 
                        name='sku_produto' 
                        className={`col m6 s12`}
                        label='Código' 
                        value={props.shape.sku_produto} 
                        handler={props.inputHandler}
                        active={props.active}
                        required
                    />
                    <TextInput 
                        name='titulo_produto' 
                        className='col m6 s12'
                        label='Nome' 
                        value={props.shape.titulo_produto} 
                        handler={props.inputHandler}
                        active={props.active}
                        required
                    />
                </Row>
                <Row>
                    <TextInput 
                        name='preco' 
                        className='col m6 s12'
                        label='Preço' 
                        value={props.shape.preco} 
                        handler={props.inputHandler}
                        active={props.active}
                        required
                    />
                    <TextInput 
                        name='estoque' 
                        className='col m6 s12'
                        label='Estoque' 
                        value={props.shape.estoque} 
                        handler={props.inputHandler}
                        active={props.active}
                        required
                    />
                </Row>
                {
                    props.children
                }
            </form>
        </>
    )
}
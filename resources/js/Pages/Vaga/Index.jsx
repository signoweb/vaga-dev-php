export default function Index(props) {
    const vagas = props.vagas
    return (
        vagas.map((vaga) => (
            <div>{vaga.nome}</div>
        ))
    )
}
import React from 'react'

const Suggestions = (props) => {
  const options = props.lista.map(r => (
    <li key={r.id}>
      {r.nome}
    </li>
  ))
  return <ul>{options}</ul>
}

export default Suggestions

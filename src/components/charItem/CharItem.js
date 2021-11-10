import './charItem.scss'

const CharItem = (props) => {
  const { name, thumbnail, style, onCharSelected} = props
  return (
    <li className='char__item' onClick={onCharSelected}>
      <img src={thumbnail} alt={name} style={style} />
      <div className='char__name'>{name}</div>
    </li>
  )
}

export default CharItem

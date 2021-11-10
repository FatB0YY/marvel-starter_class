import './charList.scss'
import PropTypes from 'prop-types'
import MarvelService from '../../services/MarvelService'
import CharItem from '../charItem/CharItem'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import React, { Component } from 'react'

class CharList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      charArray: [],
      loading: true,
      error: false,
      newItemsLoading: false,
      offset: 210,
      charEnded: false,
    }
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.onRequest()
  }

  onRequest = (offset) => {
    this.onCharListLoading()
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onCharListLoading = () => {
    this.setState({
      newItemsLoading: true,
    })
  }

  onCharListLoaded = (newCharArray) => {
    let ended = false
    if (newCharArray < 9) {
      ended = true
    }

    this.setState((state) => ({
      charArray: [...state.charArray, ...newCharArray],
      loading: false,
      newItemsLoading: false,
      offset: state.offset + 9,
      charEnded: ended,
    }))
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    })
  }

  renderItems(arr) {
    const items = arr.map((item, idx) => {
      let styleImg = { objectFit: 'cover' }
      if (item.thumbnail.includes('image_not_available')) {
        styleImg = { objectFit: 'contain' }
      }

      const { id, ...itemProps } = item
      return (
        <CharItem
          key={id}
          {...itemProps}
          style={styleImg}
          onCharSelected={() => this.props.onCharSelected(id)}
        />
      )
    })

    // А эта конструкция вынесена для центровки спиннера/ошибки
    return <ul className='char__grid'>{items}</ul>
  }

  render() {
    const { charArray, loading, error, newItemsLoading, offset, charEnded } =
      this.state

    const items = this.renderItems(charArray)

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? items : null

    return (
      <div className='char__list'>
        {errorMessage}
        {spinner}
        {content}
        <button
          onClick={() => this.onRequest(offset)}
          disabled={newItemsLoading}
          style={{ display: charEnded ? 'none' : 'block' }}
          className='button button__main button__long'
        >
          <div className='inner'>load more</div>
        </button>
      </div>
    )
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList

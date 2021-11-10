import './randomChar.scss'
import mjolnir from '../../resources/img/mjolnir.png'
import MarvelService from '../../services/MarvelService'
import Spinner from '../spinner/Spinner'
import ErrorMessage from '../errorMessage/ErrorMessage'
import { Component } from 'react'

class RandomChar extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     char: {},
  //     loading: true,
  //     error: false,
  //   }
  //   // костыль, так не надо делать.
  //   // тк мы не можемвызывать setState на компоненте,
  //   // который еще не появился на странице (constuctor render mount).
  //   // this.updateChar()
  //   console.log('constructor');
  // }

  state = {
    char: {},
    loading: true,
    error: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateChar()
    // this.timerId = setInterval(this.updateChar, 10000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false })
  }

  onError = () => {
    this.setState({ loading: false, error: true })
  }

  onCharLoading = () => {
    this.setState({
      loading: true,
    })
  }

  updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
    this.onCharLoading()
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  render() {
    const { char, loading, error } = this.state

    const errorMessage = error ? <ErrorMessage /> : null
    const spinner = loading ? <Spinner /> : null
    const content = !(loading || error) ? <View char={char} /> : null

    return (
      <div className='randomchar'>
        {errorMessage}
        {spinner}
        {content}
        <div className='randomchar__static'>
          <p className='randomchar__title'>
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className='randomchar__title'>Or choose another one</p>
          <button onClick={this.updateChar} className='button button__main'>
            <div className='inner'>try it</div>
          </button>
          <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
        </div>
      </div>
    )
  }
}

const View = ({ char }) => {
  let styleImg = { objectFit: 'cover' }
  if (char.thumbnail.includes('image_not_available')) {
    styleImg = { objectFit: 'contain' }
  }

  return (
    <div className='randomchar__block'>
      <img
        src={char.thumbnail}
        alt='Random character'
        className='randomchar__img'
        style={styleImg}
      />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{char.name}</p>
        <p className='randomchar__descr'>{char.description}</p>
        <div className='randomchar__btns'>
          <a href={char.homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={char.wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar

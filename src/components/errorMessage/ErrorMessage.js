import img from './error.gif'

const ErrorMessage = () => {
  const style = {
    display: 'block',
    width: '250px',
    height: '250px',
    objectFit: 'contain',
    margin: '0 auto',
  }
  return <img style={style} src={img} alt='error' />
}

export default ErrorMessage

import './TextComponent.scss'

const TextComponent = ({ title, value }) => {
  return (
    <div className='text-component-wrapper'>
      <p>{title}</p>
      <p>{value}</p>
    </div>
  )
}

export default TextComponent
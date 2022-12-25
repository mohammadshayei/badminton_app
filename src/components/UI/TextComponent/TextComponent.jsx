import './TextComponent.scss'
import { useTheme } from '../../../styles/ThemeProvider';

const TextComponent = ({ title, value, style }) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className='text-component-wrapper' style={{ ...style }}>
      {title && <p>{title}:</p>}
      <p
        style={{
          color: value ? theme.on_background : theme.darken_border_color,
          opacity: value ? 0.5 : 1
        }}
      >{value ? value : "وجود ندارد"}</p>
    </div>
  )
}

export default TextComponent
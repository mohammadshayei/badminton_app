import './TextComponent.scss'
import { useTheme } from '../../../styles/ThemeProvider';

const TextComponent = ({ title, value }) => {
  const themeState = useTheme();
  const theme = themeState.computedTheme;

  return (
    <div className='text-component-wrapper'>
      <p>{title}</p>:
      <p
        style={{ color: value ? theme.secondary : theme.darken_border_color }}
      >{value ? value : "وجود ندارد"}</p>
    </div>
  )
}

export default TextComponent
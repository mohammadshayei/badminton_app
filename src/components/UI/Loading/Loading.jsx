import './Loading.scss'
import { Icon } from '@iconify/react';
import { useTheme } from '../../../styles/ThemeProvider';
import { stringFa } from '../../../assets/strings/stringFaCollection';

const Loading = (props) => {
    const themeState = useTheme();
    const theme = themeState.computedTheme;

    return (
        <div className='loadinig-container' style={{ color: theme.on_background, ...props.style }}>
            <Icon className='loading-spinner' icon="line-md:loading-twotone-loop" color={theme.primary} />
            <p className='loading'>
                {stringFa.loading}
            </p>
        </div>
    )
}

export default Loading

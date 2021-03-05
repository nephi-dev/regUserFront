import {useNameContext} from '../../context/index'
import {
    HeaderContainer, HeaderMessage, PageWrapper
} from './styles'

const Header = () => {
    const {userName} = useNameContext()
    const loadUserMessage = () => {
        if (userName === 'Visitante') {
            return `Olá ${userName}, você precisa logar para visualizar o sistema!`
        } else {
            return `Olá ${userName}, bem vindo ao nosso sistema!`
        }
    }
    return (
        <>
            <HeaderContainer>
                <HeaderMessage>{loadUserMessage()}</HeaderMessage>
            </HeaderContainer>
            <PageWrapper />
        </>
    )
}

export default Header
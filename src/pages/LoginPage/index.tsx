import {useState} from 'react'
import {
    PageContainer, LoginContainer,
    StyledOption, StyledSelection,
    LoginButton
} from './styles'
import CommonInput from '../../components/CommonInput/index'
import {loginUser} from '../../services/api'
import {UserLoginData} from '../../services/types'
import {capitalize} from '../../utils/commonFunctions'
import {useNameContext} from '../../context/index'
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'

type UsableLogin = 'email' | 'cpf' | 'pis'


const LoginPage = () => {
    const [loginType, setLoginType] = useState<UsableLogin>('email')
    const [loginTypeValue, setLoginTypeValue] = useState('')
    const [password, setPassword] = useState('')
    const {setUserName} = useNameContext()
    const history = useHistory()

    const loginUserHanddler = async () => {
        const loginData: UserLoginData = {
            cpf: '',
            email: '',
            pis: '',
            password: '',
            using: ''
        }
        let using: keyof UserLoginData = loginType.toLowerCase() as UsableLogin
        if (using !== 'email') {
            loginData[using] = Number(loginTypeValue)
        } else {
            loginData[using] = loginTypeValue
        }
        loginData.password = password
        loginData.using = loginType.toLowerCase()

        const tokens = await loginUser(loginData)
        
        if (tokens.username){
            setUserName(tokens.username)
            history.push('')
        }
    }

    const mountLoginTypeInput = () => {
        if (loginType === 'email') {
            return <CommonInput setValue={setLoginTypeValue} name={capitalize(loginType)} type='email'/>
        } else {
            return <CommonInput setValue={setLoginTypeValue} name={loginType.toUpperCase()} type='text'/>
        }
    }
    return (
        <PageContainer>
            <LoginContainer>
                <div>
                    <span>Entrar usando: </span>
                    <StyledSelection id="" onChange={e => setLoginType(e.target.value as UsableLogin)}>
                        <StyledOption value="email">Email</StyledOption>
                        <StyledOption value="cpf">CPF</StyledOption>
                        <StyledOption value="pis">PIS</StyledOption>
                    </StyledSelection>
                </div>
                {mountLoginTypeInput()}
                <CommonInput setValue={setPassword} name='Senha' type='password'/>
                <LoginButton onClick={loginUserHanddler}>Login</LoginButton>
                <p>
                    Não tem conta? <Link to="/register">Registre-se aqui!</Link>
                </p>
            </LoginContainer>
        </PageContainer>
    )
}

export default LoginPage
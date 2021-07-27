import { jwtUtils } from '../utils'
class JwtMiddelware {
    public async tokenDecrypt(jwtToken) {
        jwtToken.replace('Bearer ', "")
        const tokenDecrypt = await jwtUtils.tokenDecrypt(jwtToken)
        return tokenDecrypt;
    }
}
export default JwtMiddelware;
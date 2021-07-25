import { jwtUtils } from '../utils'
class JwtMiddelware {
    public async tokenDecrypt(jwtToken) {
        jwtToken.replace('Bearer ', "")
        const tokenDecrypt = await jwtUtils.tokenDecrypt(jwtToken)
        console.log('tokenDecrypt :>> ', tokenDecrypt);
        return tokenDecrypt;
    }
}
export default JwtMiddelware;
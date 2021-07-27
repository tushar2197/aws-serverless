import { jwtUtils, messageUtils } from '../utils'
class JwtMiddelware {
    public async tokenDecrypt(jwtToken) {
        console.log(`true`, true)

     const ExtractJwt=   jwtToken.split(" ");
        const tokenDecrypt = await jwtUtils.tokenDecrypt(ExtractJwt[1])
        return messageUtils.success(tokenDecrypt);
    }
}
export default JwtMiddelware;
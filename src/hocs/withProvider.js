import {getProvider} from "../common/utils/provider.util";
import {getPassportContract, getVoterContract} from "../common/services/contracts.services";

export const withProvider = Wrapped => {
    const { ethereum } = window;
    if (!ethereum) {
        return <></>;
    }
    const provider = getProvider(ethereum);

    const contracts = {
        voter: getVoterContract(provider),
        passport: getPassportContract(provider),
        passportSigner: getPassportContract(provider.getSigner()),
        voterSigner: getVoterContract(provider.getSigner()),
    }

    return props => {
        return <Wrapped provider={provider} contracts={contracts} {...props}/>
    }
}
import {ethers} from "ethers";

export const getProvider = (ethereum) => {
    return new ethers.providers.Web3Provider(ethereum, 'any');
}
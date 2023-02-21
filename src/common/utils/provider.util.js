import {ethers} from "ethers";

export const getProvider = () => {
    const { ethereum } = window;
    return new ethers.providers.Web3Provider(ethereum);
}
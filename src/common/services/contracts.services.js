import {ethers} from "ethers";
import passportAbi from "./abi/BlaizePassport.abi.json";

export const getVoterContract = (provider) => {
    return new ethers.Contract('0x0AabFAc4cd0841E54E10fd9C97cF9A506080ad38', passportAbi, provider);
}
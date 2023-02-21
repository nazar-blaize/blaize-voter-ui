import {ethers} from "ethers";
import passportAbi from "./abi/BlaizePassport.abi.json";
import voteAbi from "./abi/BlaizeVoting.abi.json";
import {PASSPORT_CONTRACT_ADDRESS, VOTER_CONTRACT_ADDRESS} from "../constants/contract.constants";

export const getVoterContract = (provider) => {
    return new ethers.Contract(VOTER_CONTRACT_ADDRESS, voteAbi, provider);
}

export const getPassportContract = (provider) => {
    return new ethers.Contract(PASSPORT_CONTRACT_ADDRESS, passportAbi, provider);
}
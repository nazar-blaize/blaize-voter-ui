import {ETHERSCAN_BASE_URL} from "../constants/common.constants";

export const getEtherscanLink = (hash) => {
    return `${ETHERSCAN_BASE_URL}/tx/${hash}`;
}
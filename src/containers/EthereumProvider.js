import {Result} from "antd";

export const EthereumProvider = (props) => {
    const { ethereum } = window;

    if (!ethereum) {
        return  <Result
            status="warning"
            title="For using application install Metamask"
        />
    }

    return props.children;
}
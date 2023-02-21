import {Result} from "antd";
import {UserProvider} from "../hocs/UserProvider";

export const EthereumProvider = (props) => {
    const {ethereum} = window;

    if (!ethereum) {
        return <Result
            status="warning"
            title="For using application install Metamask"
        />
    }

    return <UserProvider>
        {props.children}
    </UserProvider>;
}
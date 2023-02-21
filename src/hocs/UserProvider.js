import {useEffect, useState} from "react";
import {UserContext} from "../store/user.context";
import {withProvider} from "./withProvider";
import {Button, Result, Spin} from "antd";
import {REQUIRED_NETWORK} from "../common/constants/common.constants";

export const UserProvider = withProvider(({provider, children}) => {
    const [account, setAccount] = useState();
    const [accountConnecting, setAccountConnecting] = useState(false);

    const checkNetwork = async () => {
        await provider.provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: REQUIRED_NETWORK }],
        });
    }

    const checkWalletIsConnected = async () => {
        const accounts = await provider.provider.request({method: 'eth_accounts'});

        if (accounts.length !== 0) {
            const account = accounts[0];
            console.log("Found an authorized account: ", account);
            await checkNetwork();
            setAccount(account);
        } else {
            console.log("No authorized account found");
        }
    }

    const connectWalletHandler = async () => {
        try {
            setAccountConnecting(true);
            const accounts = await provider.provider.request({method: 'eth_requestAccounts'});
            console.log("Found an account! Address: ", accounts[0]);
            await checkNetwork();
            setAccount(accounts[0]);
        } catch (err) {
            console.log(err)
        } finally {
            setAccountConnecting(true);
        }
    }

    useEffect(() => {
        checkWalletIsConnected();
    }, [checkWalletIsConnected, account])

    if (!account) {
        return <Spin spinning={accountConnecting}>
            <Result
                title="You need connect account"
                extra={
                    <Button type="primary" key="console" onClick={() => connectWalletHandler()}>
                        Connect wallet
                    </Button>
                }
            />
        </Spin>
    }


    return <UserContext.Provider value={[account, setAccount]}>
        {children}
    </UserContext.Provider>
})
import {useContext} from "react";
import {UserContext} from "../store/user.context";

export const useAccount = () => {
    const [state] = useContext(UserContext);

    return [state];
}
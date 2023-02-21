import './App.css';
import {EthereumProvider} from "./containers/EthereumProvider";
import {UserProfile} from "./components/UserProfile";
import {LastVotes} from "./components/LastVotes";
import {Space} from "antd";
import {CreateVote} from "./components/CreateVote";

function App() {
    return (<EthereumProvider>
        <Space direction="vertical" size="middle" style={{display: 'flex', margin: '20px'}}>
            <UserProfile/>
            <LastVotes/>
            <CreateVote/>
        </Space>
    </EthereumProvider>)
}

export default App;
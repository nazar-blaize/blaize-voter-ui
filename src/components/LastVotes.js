import {Card, List, Typography, message} from "antd";
import {withProvider} from "../hocs/withProvider";
import {useEffect, useState} from "react";

export const LastVotes = withProvider(({contracts}) => {
    const [votes, setVotes] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const fetchVotes = async () => {
        try {
            const lastVote = await contracts.voter.lastVote()
            const promises = [];
            for (let index = lastVote.toNumber(); index > 0; index--) {
                promises.push((async () => {
                    return {
                        name: await contracts.voter.getVoteName(index - 1),
                        options: await contracts.voter.getVoteOptions(index - 1)
                    }
                })());
            }
            const result = await Promise.all(promises);
            setVotes(result);
        } catch (e) {
            messageApi.open({
                type: 'error',
                content: e.reason,
            });
        }
    }
    useEffect(() => {
        fetchVotes()
    }, []);
    return <>
        {contextHolder}
        <Card title="Last Votes" >
            {votes.map(v => <List
                header={<Typography.Title level={4}>{v.name}</Typography.Title>}
                bordered
                style={{marginBottom: '20px'}}
                key={v.name}
                dataSource={v.options}
                renderItem={(item) => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />)}
        </Card>
    </>
})
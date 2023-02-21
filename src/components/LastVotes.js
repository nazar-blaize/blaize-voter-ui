import {Card, List, Typography, message, Button} from "antd";
import {withProvider} from "../hocs/withProvider";
import {useCallback, useEffect, useState} from "react";
import {getEtherscanLink} from "../common/utils/links.util";

export const LastVotes = withProvider(({contracts}) => {
    const [votes, setVotes] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    const fetchVotes = useCallback(async () => {
        try {
            const lastVote = await contracts.voter.lastVote()
            const promises = [];
            for (let index = lastVote.toNumber(); index > 0; index--) {
                promises.push((async () => {
                    return {
                        name: await contracts.voter.getVoteName(index - 1),
                        options: await contracts.voter.getVoteOptions(index - 1),
                        id: index - 1,
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
    }, [contracts.voter, messageApi])
    useEffect(() => {
        fetchVotes()
    }, [fetchVotes]);

    const sendVote = async (voteId, optionId) => {
        try {
            const tx = await contracts.voterSigner.vote(voteId, optionId);
            console.log(getEtherscanLink(tx.hash))
        } catch (e) {
            console.error(e);
            messageApi.open({
                type: 'error',
                content: e.reason,
            });
        }
    }

    return <>
        {contextHolder}
        <Card title="Last Votes">
            {votes.map(v => <List
                header={<Typography.Title level={4}>{v.name}</Typography.Title>}
                bordered
                style={{marginBottom: '20px'}}
                key={v.id}
                dataSource={v.options}
                renderItem={(item, optionIndex) => (
                    <List.Item>
                        <Button style={{marginRight: '10px'}} onClick={() => sendVote(v.id, optionIndex)}>Vote</Button>
                        {item}
                    </List.Item>
                )}
            />)}
        </Card>
    </>
})
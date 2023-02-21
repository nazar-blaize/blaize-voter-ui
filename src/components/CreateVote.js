import {Button, Card, Form, Input, message, Modal, Select, Typography} from "antd";
import {useState} from "react";
import {withProvider} from "../hocs/withProvider";
import {getEtherscanLink} from "../common/utils/links.util";

export const CreateVote = withProvider(({contracts}) => {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [form] = Form.useForm();
    const [voteCreationHash, setVoteCreationHash] = useState();

    const showModal = () => {
        setOpen(true);
    };

    const handleModalLoading = async () => {
        setConfirmLoading(true);
        try {
            const values = await form.validateFields();
            console.log(values)
            const result = await contracts.voterSigner.create(values.name, values.options);
            setVoteCreationHash(result.hash);
            console.log(result);
        } catch (e) {
            console.log(e);
            messageApi.open({
                type: 'error',
                content: e.reason,
            });
        } finally {
            setOpen(false);
            setConfirmLoading(false);
        }
    };

    return <>
        {contextHolder}
        <Card title="Create Vote">
            {voteCreationHash && <p>
                Hash: <Typography.Link href={getEtherscanLink(voteCreationHash)} target="_blank">
                {voteCreationHash}
            </Typography.Link>
            </p>}
            <Button onClick={showModal}>Create vote</Button>
        </Card>
        <Modal
            title="Registration"
            open={open}
            onOk={handleModalLoading}
            confirmLoading={confirmLoading}
            onCancel={() => setOpen(false)}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{name: '', options: []}}
            >
                <Form.Item label="Poll Name" required name={"name"}>
                    <Input placeholder="enter..."/>
                </Form.Item>
                <Form.Item label="Vote options" required name={"options"}>
                    <Select
                        mode="tags"
                        // style={{ width: '100%' }}
                        // onChange={handleChange}
                        tokenSeparators={[',']}
                        // options={options}
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>
})
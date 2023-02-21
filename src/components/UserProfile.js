import {Button, Card, Form, Input, message, Modal} from "antd";
import {withProvider} from "../hocs/withProvider";
import {useAccount} from "../hooks/useAccount";
import {useCallback, useEffect, useState} from "react";

export const UserProfile = withProvider(({contracts}) => {
    const [account] = useAccount();
    const [person, setPerson] = useState();

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const [messageApi, contextHolder] = message.useMessage();

    const [form] = Form.useForm();


    const showModal = () => {
        setOpen(true);
    };

    const handleModalLoading = async () => {
        setConfirmLoading(true);
        try {
            const values = await form.validateFields();
            console.log(values)
            await register(values.firstName, values.lastName, values.governmentId);
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

    const register = async (firstName, secondName, governmentId) => {
        const rr = await contracts.passportSigner.register(firstName, secondName, governmentId)
        console.log(rr);
    }

    const fetchPerson = useCallback(async () => {
        const fetchedPerson = await contracts.passport.getPerson(account);
        setPerson(fetchedPerson);
        console.log(fetchedPerson);
    }, [account, contracts.passport])

    useEffect(() => {
        fetchPerson();
    }, [fetchPerson, account, contracts.passport])

    return <>
        {contextHolder}
            <Card title="User info">
                <p>Address: {account}</p>
                {person?.isValue ? <>
                    <p>FirstName: {person.firstName}</p>
                    <p>SecondName: {person.secondName}</p>
                    <p>Verified: {person.verified ? 'Yes' : 'No('}</p>
                    <p>GovernmentID: {person.governmentId}</p>
                </> : <Button onClick={showModal}>Register</Button>}
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
                    initialValues={{firstName: '', lastName: '', governmentId: ''}}
                >
                    <Form.Item label="First Name" required name={"firstName"}>
                        <Input placeholder="enter..."/>
                    </Form.Item>
                    <Form.Item label="Second Name" required name={"lastName"}>
                        <Input placeholder="enter..."/>
                    </Form.Item>
                    <Form.Item label="GovernmentID" required name={"governmentId"}>
                        <Input placeholder="enter..."/>
                    </Form.Item>
                </Form>
            </Modal>
    </>
})
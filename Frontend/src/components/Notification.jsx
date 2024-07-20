import {useSelector} from 'react-redux'
import { Container } from '@mantine/core'

const Notification = () => {
    const notification = useSelector(state => state.notification)
    const notifyStyle = {
        backgroundColor: 'whitesmoke',
        paddingTop: 12,
        paddingLeft: 12,
        paddingBottom: 10,
        border: 'dashed',
        borderWidth: 1,
        borderRadius: '8px',
        marginBottom: 0
    }

    if (notification === null || notification === '') {
        return (<></>)
    }

    if (notification.includes('ERROR')) {
        return (
            <div>
            <p></p>
            <Container size='50%'>
                <div style={notifyStyle} className ='Error'>{notification}</div>
            </Container>
            </div>
        )
    }

    return (
        <div>
        <p></p>
        <Container size='50%'>
            <div style={notifyStyle} className ='Notification'>{notification}</div>
        </Container>
        </div>
    )
}

export default Notification

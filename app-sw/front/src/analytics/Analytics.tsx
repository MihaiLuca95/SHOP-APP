import { useEffect } from "react";
import { Options } from "./Analytics.type";

class UserAction {
    type: string;
    constructor(type: string) {
        this.type = type;
    }
}

// const endpoint = 'http://localhost:3001/api/analytics'

const  Analytics = (options: Options) => {
    const {endpoint, events} = options;
    const eventListener = () => {

        console.log('User has clicked inside the window');
        //post /api/analytics
        const userAction = new UserAction('click');
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userAction)
        })
    };

    // when mount | update
    useEffect(() => {
        // Vanilla JS event binding
        // Observer pattern
        window.addEventListener('click', eventListener);

        // when unmount
        return function cleanup() {
            window.removeEventListener('click', eventListener);
        }
    }, [])

    return <div> Hello Analytics</div>
}

export default Analytics;
import { PubSubClient } from 'twitch-pubsub-client';
import { ApiClient, StaticAuthProvider } from 'twitch';

async function startup() {
    const authProvider = new StaticAuthProvider(
        'gp762nuuoqcoxypju8c569th9wz7q5',
        'ronlwe5iesbyrsaipcnywq5k10qmn5',
        ['channel:read:redemptions'],
    );
    const apiClient = new ApiClient({
        authProvider: authProvider,
    });
    const client = new PubSubClient();
    const userId = await client.registerUserListener(apiClient);

    const redemptionListener = await client.onRedemption(userId, (msg) => {
        console.log(msg.rewardName);
    });
}

startup()
    .catch((err) => console.error(err));

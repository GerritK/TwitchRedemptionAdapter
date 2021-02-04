import { PubSubClient } from 'twitch-pubsub-client';
import { ApiClient, StaticAuthProvider } from 'twitch';
import * as mqtt from 'mqtt';
import * as fs from 'fs';

async function startup() {
    const config = await getConfig();
    console.log(config);

    // MQTT
    const mqttClient = mqtt.connect(config.mqtt.host);
    mqttClient.on('connect', () => {
        console.log('MQTT CONNECT');
        mqttClient.subscribe('#');
    });
    mqttClient.on('message', (topic, message) => {
        console.log(topic, message.toString());
    });
    mqttClient.on('error', (err) => console.error(err));

    // Twitch
    const authProvider = new StaticAuthProvider(
        config.twitch.clientId,
        config.twitch.accessToken,
        ['channel:read:redemptions'],
    );
    const apiClient = new ApiClient({
        authProvider,
    });
    const client = new PubSubClient();
    const userId = await client.registerUserListener(apiClient);

    const redemptionListener = await client.onRedemption(userId, (msg) => {
        const reward = config.rewardMap.find((r) => r.id === msg.rewardId);
        mqttClient.publish(reward.topic, msg.redemptionDate.getTime().toString(10));
    });
}

async function getConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile('./config.json', (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            try {
                const result = JSON.parse(data.toString());
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    });
}

startup()
    .catch((err) => console.error(err));

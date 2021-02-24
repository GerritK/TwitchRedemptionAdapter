# Twitch MQTT Redemption Adapter

This is an simple Twitch PubSub redemption to MQTT adapter. Use it with Node-RED or something else.

## Credentials

You have to enter your PubSub credentials to `config.json`. Use your own twitch app or generate a token with something like [Twitch Token Generator](https://twitchtokengenerator.com/). You need to give permissions to `channel:read:redemptions`.

## Config

Use the `config.json` to setup MQTT host and the reward mapping.
Add an object to the `rewardMap` array containing the twitch reward id and the mqtt topic. You can get the id by starting the adapter and redeem an reward. The id will be written to console.

## MQTT Payload

Currently the MQTT payload is the timestamp of redemption.

## License

Feel free to use it under MIT

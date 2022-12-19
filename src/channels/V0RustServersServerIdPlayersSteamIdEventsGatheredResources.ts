import ServerPlayerResourceGathered from '../models/ServerPlayerResourceGathered';
import * as Nats from 'nats';
import {
  ErrorCode,
  NatsTypescriptTemplateError
} from '../NatsTypescriptTemplateError';
/**
 * Module which wraps functionality for the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources` channel
 * @module v0RustServersServerIdPlayersSteamIdEventsGatheredResources
 */
/**
 * Internal functionality to setup subscription on the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param nc to subscribe with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 * @param steam_id parameter to use in topic
 * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
 */
export function subscribe(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string) => void,
  nc: Nats.NatsConnection,
  codec: Nats.Codec < any > , server_id: string, steam_id: string,
  options ? : Nats.SubscriptionOptions
): Promise < Nats.Subscription > {
  return new Promise(async (resolve, reject) => {
    let subscribeOptions: Nats.SubscriptionOptions = {
      ...options
    };
    try {
      let subscription = nc.subscribe(`v0.rust.servers.${server_id}.players.${steam_id}.events.gatheredResources`, subscribeOptions);
      (async () => {
        for await (const msg of subscription) {
          const unmodifiedChannel = `v0.rust.servers.{server_id}.players.{steam_id}.events.gatheredResources`;
          let channel = msg.subject;
          const serverIdSplit = unmodifiedChannel.split("{server_id}");
          const steamIdSplit = serverIdSplit[1].split("{steam_id}");
          const splits = [
            serverIdSplit[0],
            steamIdSplit[0],
            steamIdSplit[1]
          ];
          channel = channel.substring(splits[0].length);
          const serverIdEnd = channel.indexOf(splits[1]);
          const serverIdParam = "" + channel.substring(0, serverIdEnd);
          channel = channel.substring(serverIdEnd + splits[1].length);
          const steamIdEnd = channel.indexOf(splits[2]);
          const steamIdParam = "" + channel.substring(0, steamIdEnd);
          let receivedData: any = codec.decode(msg.data);
          onDataCallback(undefined, ServerPlayerResourceGathered.unmarshal(receivedData), serverIdParam, steamIdParam);
        }
        console.log("subscription closed");
      })();
      resolve(subscription);
    } catch (e: any) {
      reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
    }
  })
}
/**
 * Internal functionality to setup jetstrema pull on the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param js client to pull with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 * @param steam_id parameter to use in topic
 */
export function jetStreamPull(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string,
    jetstreamMsg ? : Nats.JsMsg) => void,
  js: Nats.JetStreamClient,
  codec: Nats.Codec < any > , server_id: string, steam_id: string,
) {
  const stream = `v0.rust.servers.${server_id}.players.${steam_id}.events.gatheredResources`;
  (async () => {
    const msg = await js.pull(stream, 'durableName');
    const unmodifiedChannel = `v0.rust.servers.{server_id}.players.{steam_id}.events.gatheredResources`;
    let channel = msg.subject;
    const serverIdSplit = unmodifiedChannel.split("{server_id}");
    const steamIdSplit = serverIdSplit[1].split("{steam_id}");
    const splits = [
      serverIdSplit[0],
      steamIdSplit[0],
      steamIdSplit[1]
    ];
    channel = channel.substring(splits[0].length);
    const serverIdEnd = channel.indexOf(splits[1]);
    const serverIdParam = "" + channel.substring(0, serverIdEnd);
    channel = channel.substring(serverIdEnd + splits[1].length);
    const steamIdEnd = channel.indexOf(splits[2]);
    const steamIdParam = "" + channel.substring(0, steamIdEnd);
    let receivedData: any = codec.decode(msg.data);
    onDataCallback(undefined, ServerPlayerResourceGathered.unmarshal(receivedData), serverIdParam, steamIdParam, msg);
  })();
}
/**
 * Internal functionality to setup jetstream push subscription on the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param nc to subscribe with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 * @param steam_id parameter to use in topic
 * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
 */
export function jetStreamPushSubscribe(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string,
    jetstreamMsg ? : Nats.JsMsg) => void,
  js: Nats.JetStreamClient,
  codec: Nats.Codec < any > , server_id: string, steam_id: string,
  options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
): Promise < Nats.JetStreamSubscription > {
  return new Promise(async (resolve, reject) => {
    try {
      let subscription = js.subscribe(`v0.rust.servers.${server_id}.players.${steam_id}.events.gatheredResources`, options);
      (async () => {
        for await (const msg of await subscription) {
          const unmodifiedChannel = `v0.rust.servers.{server_id}.players.{steam_id}.events.gatheredResources`;
          let channel = msg.subject;
          const serverIdSplit = unmodifiedChannel.split("{server_id}");
          const steamIdSplit = serverIdSplit[1].split("{steam_id}");
          const splits = [
            serverIdSplit[0],
            steamIdSplit[0],
            steamIdSplit[1]
          ];
          channel = channel.substring(splits[0].length);
          const serverIdEnd = channel.indexOf(splits[1]);
          const serverIdParam = "" + channel.substring(0, serverIdEnd);
          channel = channel.substring(serverIdEnd + splits[1].length);
          const steamIdEnd = channel.indexOf(splits[2]);
          const steamIdParam = "" + channel.substring(0, steamIdEnd);
          let receivedData: any = codec.decode(msg.data);
          onDataCallback(undefined, ServerPlayerResourceGathered.unmarshal(receivedData), serverIdParam, steamIdParam);
        }
        console.log("subscription closed");
      })();
      resolve(subscription);
    } catch (e: any) {
      reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
    }
  })
}
/**
 * Internal functionality to setup jetstream pull subscription on the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param nc to subscribe with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 * @param steam_id parameter to use in topic
 */
export function jetStreamPullSubscribe(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string,
    jetstreamMsg ? : Nats.JsMsg) => void,
  js: Nats.JetStreamClient,
  codec: Nats.Codec < any > , server_id: string, steam_id: string,
  options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
): Promise < Nats.JetStreamPullSubscription > {
  return new Promise(async (resolve, reject) => {
    try {
      const subscription = await js.pullSubscribe(`v0.rust.servers.${server_id}.players.${steam_id}.events.gatheredResources`, options);
      (async () => {
        for await (const msg of subscription) {
          const unmodifiedChannel = `v0.rust.servers.{server_id}.players.{steam_id}.events.gatheredResources`;
          let channel = msg.subject;
          const serverIdSplit = unmodifiedChannel.split("{server_id}");
          const steamIdSplit = serverIdSplit[1].split("{steam_id}");
          const splits = [
            serverIdSplit[0],
            steamIdSplit[0],
            steamIdSplit[1]
          ];
          channel = channel.substring(splits[0].length);
          const serverIdEnd = channel.indexOf(splits[1]);
          const serverIdParam = "" + channel.substring(0, serverIdEnd);
          channel = channel.substring(serverIdEnd + splits[1].length);
          const steamIdEnd = channel.indexOf(splits[2]);
          const steamIdParam = "" + channel.substring(0, steamIdEnd);
          let receivedData: any = codec.decode(msg.data);
          onDataCallback(undefined, ServerPlayerResourceGathered.unmarshal(receivedData), serverIdParam, steamIdParam);
        }
      })();
      resolve(subscription);
    } catch (e: any) {
      reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
    }
  })
}
/**
 * Internal functionality to setup jetstrema fetch on the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param js client to fetch with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 * @param steam_id parameter to use in topic
 */
export function jetsStreamFetch(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string,
    jetstreamMsg ? : Nats.JsMsg) => void,
  js: Nats.JetStreamClient,
  codec: Nats.Codec < any > , server_id: string, steam_id: string,
  durable: string, options ? : Partial < Nats.PullOptions >
) {
  const stream = `v0.rust.servers.${server_id}.players.${steam_id}.events.gatheredResources`;
  (async () => {
    let msgs = await js.fetch(stream, durable, options);
    for await (const msg of msgs) {
      const unmodifiedChannel = `v0.rust.servers.{server_id}.players.{steam_id}.events.gatheredResources`;
      let channel = msg.subject;
      const serverIdSplit = unmodifiedChannel.split("{server_id}");
      const steamIdSplit = serverIdSplit[1].split("{steam_id}");
      const splits = [
        serverIdSplit[0],
        steamIdSplit[0],
        steamIdSplit[1]
      ];
      channel = channel.substring(splits[0].length);
      const serverIdEnd = channel.indexOf(splits[1]);
      const serverIdParam = "" + channel.substring(0, serverIdEnd);
      channel = channel.substring(serverIdEnd + splits[1].length);
      const steamIdEnd = channel.indexOf(splits[2]);
      const steamIdParam = "" + channel.substring(0, steamIdEnd);
      let receivedData: any = codec.decode(msg.data);
      onDataCallback(undefined, ServerPlayerResourceGathered.unmarshal(receivedData), serverIdParam, steamIdParam, msg);
    }
  })();
}
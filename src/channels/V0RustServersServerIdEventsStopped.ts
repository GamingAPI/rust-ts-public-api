import ServerStopped from '../models/ServerStopped';
import * as Nats from 'nats';
import {
  ErrorCode,
  NatsTypescriptTemplateError
} from '../NatsTypescriptTemplateError';
/**
 * Module which wraps functionality for the `v0/rust/servers/{server_id}/events/stopped` channel
 * @module v0RustServersServerIdEventsStopped
 */
/**
 * Internal functionality to setup subscription on the `v0/rust/servers/{server_id}/events/stopped` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param nc to subscribe with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
 */
export function subscribe(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerStopped, server_id ? : string) => void,
  nc: Nats.NatsConnection,
  codec: Nats.Codec < any > , server_id: string,
  options ? : Nats.SubscriptionOptions
): Promise < Nats.Subscription > {
  return new Promise(async (resolve, reject) => {
    let subscribeOptions: Nats.SubscriptionOptions = {
      ...options
    };
    try {
      let subscription = nc.subscribe(`v0.rust.servers.${server_id}.events.stopped`, subscribeOptions);
      (async () => {
        for await (const msg of subscription) {
          const unmodifiedChannel = `v0.rust.servers.{server_id}.events.stopped`;
          let channel = msg.subject;
          const serverIdSplit = unmodifiedChannel.split("{server_id}");
          const splits = [
            serverIdSplit[0],
            serverIdSplit[1]
          ];
          channel = channel.substring(splits[0].length);
          const serverIdEnd = channel.indexOf(splits[1]);
          const serverIdParam = "" + channel.substring(0, serverIdEnd);
          let receivedData: any = codec.decode(msg.data);
          onDataCallback(undefined, ServerStopped.unmarshal(receivedData), serverIdParam);
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
 * Internal functionality to setup jetstrema pull on the `v0/rust/servers/{server_id}/events/stopped` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param js client to pull with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 */
export function jetStreamPull(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerStopped, server_id ? : string,
    jetstreamMsg ? : Nats.JsMsg) => void,
  js: Nats.JetStreamClient,
  codec: Nats.Codec < any > , server_id: string,
) {
  const stream = `v0.rust.servers.${server_id}.events.stopped`;
  (async () => {
    const msg = await js.pull(stream, 'durableName');
    const unmodifiedChannel = `v0.rust.servers.{server_id}.events.stopped`;
    let channel = msg.subject;
    const serverIdSplit = unmodifiedChannel.split("{server_id}");
    const splits = [
      serverIdSplit[0],
      serverIdSplit[1]
    ];
    channel = channel.substring(splits[0].length);
    const serverIdEnd = channel.indexOf(splits[1]);
    const serverIdParam = "" + channel.substring(0, serverIdEnd);
    let receivedData: any = codec.decode(msg.data);
    onDataCallback(undefined, ServerStopped.unmarshal(receivedData), serverIdParam, msg);
  })();
}
/**
 * Internal functionality to setup jetstream push subscription on the `v0/rust/servers/{server_id}/events/stopped` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param nc to subscribe with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
 */
export function jetStreamPushSubscribe(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerStopped, server_id ? : string,
    jetstreamMsg ? : Nats.JsMsg) => void,
  js: Nats.JetStreamClient,
  codec: Nats.Codec < any > , server_id: string,
  options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
): Promise < Nats.JetStreamSubscription > {
  return new Promise(async (resolve, reject) => {
    try {
      let subscription = js.subscribe(`v0.rust.servers.${server_id}.events.stopped`, options);
      (async () => {
        for await (const msg of await subscription) {
          const unmodifiedChannel = `v0.rust.servers.{server_id}.events.stopped`;
          let channel = msg.subject;
          const serverIdSplit = unmodifiedChannel.split("{server_id}");
          const splits = [
            serverIdSplit[0],
            serverIdSplit[1]
          ];
          channel = channel.substring(splits[0].length);
          const serverIdEnd = channel.indexOf(splits[1]);
          const serverIdParam = "" + channel.substring(0, serverIdEnd);
          let receivedData: any = codec.decode(msg.data);
          onDataCallback(undefined, ServerStopped.unmarshal(receivedData), serverIdParam);
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
 * Internal functionality to setup jetstream pull subscription on the `v0/rust/servers/{server_id}/events/stopped` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param nc to subscribe with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 */
export function jetStreamPullSubscribe(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerStopped, server_id ? : string,
    jetstreamMsg ? : Nats.JsMsg) => void,
  js: Nats.JetStreamClient,
  codec: Nats.Codec < any > , server_id: string,
  options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
): Promise < Nats.JetStreamPullSubscription > {
  return new Promise(async (resolve, reject) => {
    try {
      const subscription = await js.pullSubscribe(`v0.rust.servers.${server_id}.events.stopped`, options);
      (async () => {
        for await (const msg of subscription) {
          const unmodifiedChannel = `v0.rust.servers.{server_id}.events.stopped`;
          let channel = msg.subject;
          const serverIdSplit = unmodifiedChannel.split("{server_id}");
          const splits = [
            serverIdSplit[0],
            serverIdSplit[1]
          ];
          channel = channel.substring(splits[0].length);
          const serverIdEnd = channel.indexOf(splits[1]);
          const serverIdParam = "" + channel.substring(0, serverIdEnd);
          let receivedData: any = codec.decode(msg.data);
          onDataCallback(undefined, ServerStopped.unmarshal(receivedData), serverIdParam);
        }
      })();
      resolve(subscription);
    } catch (e: any) {
      reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
    }
  })
}
/**
 * Internal functionality to setup jetstrema fetch on the `v0/rust/servers/{server_id}/events/stopped` channel 
 * 
 * @param onDataCallback to call when messages are received
 * @param js client to fetch with
 * @param codec used to convert messages
 * @param server_id parameter to use in topic
 */
export function jetsStreamFetch(
  onDataCallback: (
    err ? : NatsTypescriptTemplateError,
    msg ? : ServerStopped, server_id ? : string,
    jetstreamMsg ? : Nats.JsMsg) => void,
  js: Nats.JetStreamClient,
  codec: Nats.Codec < any > , server_id: string,
  durable: string, options ? : Partial < Nats.PullOptions >
) {
  const stream = `v0.rust.servers.${server_id}.events.stopped`;
  (async () => {
    let msgs = await js.fetch(stream, durable, options);
    for await (const msg of msgs) {
      const unmodifiedChannel = `v0.rust.servers.{server_id}.events.stopped`;
      let channel = msg.subject;
      const serverIdSplit = unmodifiedChannel.split("{server_id}");
      const splits = [
        serverIdSplit[0],
        serverIdSplit[1]
      ];
      channel = channel.substring(splits[0].length);
      const serverIdEnd = channel.indexOf(splits[1]);
      const serverIdParam = "" + channel.substring(0, serverIdEnd);
      let receivedData: any = codec.decode(msg.data);
      onDataCallback(undefined, ServerStopped.unmarshal(receivedData), serverIdParam, msg);
    }
  })();
}
import * as TestClient from './testclient/';
import {
  ErrorCode,
  NatsTypescriptTemplateError
} from './NatsTypescriptTemplateError';
import * as Nats from 'nats';
import * as v0RustServersServerIdEventsStartedChannel from "./channels/V0RustServersServerIdEventsStarted";
import * as v0RustServersServerIdEventsStoppedChannel from "./channels/V0RustServersServerIdEventsStopped";
import * as v0RustServersServerIdEventsPlayerSteamIdChattedChannel from "./channels/V0RustServersServerIdEventsPlayerSteamIdChatted";
import ServerStarted from "./models/ServerStarted";
import ServerStopped from "./models/ServerStopped";
import ChatMessage from "./models/ChatMessage";
export {
  v0RustServersServerIdEventsStartedChannel
};
export {
  v0RustServersServerIdEventsStoppedChannel
};
export {
  v0RustServersServerIdEventsPlayerSteamIdChattedChannel
};
export {
  ServerStarted
};
export {
  ServerStopped
};
export {
  ChatMessage
};
export {
  ErrorCode,
  NatsTypescriptTemplateError
}
export {
  TestClient
};
/**
 * @class NatsAsyncApiClient
 * 
 * The generated client based on your AsyncAPI document.
 */
export class NatsAsyncApiClient {
  private nc ? : Nats.NatsConnection;
  private codec ? : Nats.Codec < any > ;
  private options ? : Nats.ConnectionOptions;
  /**
   * Try to connect to the NATS server with the different payloads.
   * @param options to use, payload is omitted if sat in the AsyncAPI document.
   */
  connect(options: Nats.ConnectionOptions, codec ? : Nats.Codec < any > ): Promise < void > {
    return new Promise(async (resolve: () => void, reject: (error: any) => void) => {
      if (!this.isClosed()) {
        return reject('Client is still connected, please close it first.');
      }
      this.options = options;
      if (codec) {
        this.codec = codec;
      } else {
        this.codec = Nats.JSONCodec();
      }
      try {
        this.nc = await Nats.connect(this.options);
        resolve();
      } catch (e: any) {
        reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.INTERNAL_NATS_TS_ERROR, e));
      }
    })
  }
  /**
   * Disconnect all clients from the server
   */
  async disconnect() {
    if (!this.isClosed() && this.nc !== undefined) {
      await this.nc.drain();
    }
  }
  /**
   * Returns whether or not any of the clients are closed
   */
  isClosed() {
    if (!this.nc || this.nc!.isClosed()) {
      return true;
    }
    return false;
  }
  /**
   * Try to connect to the NATS server with user credentials
   *
   * @param userCreds to use
   * @param options to connect with
   */
  async connectWithUserCreds(userCreds: string, options ? : Nats.ConnectionOptions, codec ? : Nats.Codec < any > ) {
    await this.connect({
      user: userCreds,
      ...options
    }, codec);
  }
  /**
   * Try to connect to the NATS server with user and password
   * 
   * @param user username to use
   * @param pass password to use
   * @param options to connect with
   */
  async connectWithUserPass(user: string, pass: string, options ? : Nats.ConnectionOptions, codec ? : Nats.Codec < any > ) {
    await this.connect({
      user: user,
      pass: pass,
      ...options
    }, codec);
  }
  /**
   * Try to connect to the NATS server which has no authentication
   
    * @param host to connect to
    * @param options to connect with
    */
  async connectToHost(host: string, options ? : Nats.ConnectionOptions, codec ? : Nats.Codec < any > ) {
    await this.connect({
      servers: [host],
      ...options
    }, codec);
  }
  /**
   * Connects the client to the AsyncAPI server called production.
   * GamingAPI NATS production broker
   */
  async connectToProduction(codec ? : Nats.Codec < any > ) {
    await this.connect({
      servers: ["148.251.43.103:4222"]
    }, codec);
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/events/started`
   * 
   * Channel for the API to process for when a server has started
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdEventsStarted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStarted, server_id ? : string) => void, server_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsStartedChannel.subscribe(
            onDataCallback,
            this.nc,
            this.codec, server_id,
            options
          );
          if (flush) {
            await this.nc.flush();
          }
          resolve(sub);
        } catch (e: any) {
          reject(e);
        }
      } else {
        reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
      }
    });
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/events/stopped`
   * 
   * Channel for the API to process for when a server has stopped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdEventsStopped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStopped, server_id ? : string) => void, server_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsStoppedChannel.subscribe(
            onDataCallback,
            this.nc,
            this.codec, server_id,
            options
          );
          if (flush) {
            await this.nc.flush();
          }
          resolve(sub);
        } catch (e: any) {
          reject(e);
        }
      } else {
        reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
      }
    });
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/events/player/{steam_id}/chatted`
   * 
   * Event for when a player used the chat
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdEventsPlayerSteamIdChatted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ChatMessage, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsPlayerSteamIdChattedChannel.subscribe(
            onDataCallback,
            this.nc,
            this.codec, server_id, steam_id,
            options
          );
          if (flush) {
            await this.nc.flush();
          }
          resolve(sub);
        } catch (e: any) {
          reject(e);
        }
      } else {
        reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
      }
    });
  }
}
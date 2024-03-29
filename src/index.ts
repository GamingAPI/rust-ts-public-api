import * as TestClient from './testclient/';
import {
  ErrorCode,
  NatsTypescriptTemplateError
} from './NatsTypescriptTemplateError';
import * as Nats from 'nats';
import * as v0RustServersServerIdEventsStartedChannel from "./channels/V0RustServersServerIdEventsStarted";
import * as v0RustServersServerIdEventsStoppedChannel from "./channels/V0RustServersServerIdEventsStopped";
import * as v0RustServersServerIdEventsPlayerSteamIdChattedChannel from "./channels/V0RustServersServerIdEventsPlayerSteamIdChatted";
import * as v0RustServersServerIdEventsWipedChannel from "./channels/V0RustServersServerIdEventsWiped";
import * as v0RustServersServerIdPlayersSteamIdEventsConnectedChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsConnected";
import * as v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsDisconnected";
import * as v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsGatheredResources";
import * as v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsRespawned";
import * as v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsCombatHit";
import * as v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup";
import * as v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot";
import * as v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted";
import * as v0RustServersServerIdEventsCommandChannel from "./channels/V0RustServersServerIdEventsCommand";
import * as v0RustServersServerIdPlayersSteamIdEventsReportedChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsReported";
import * as v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsUnbanned";
import * as v0RustServersServerIdPlayersSteamIdEventsBannedChannel from "./channels/V0RustServersServerIdPlayersSteamIdEventsBanned";
import ServerStarted from "./models/ServerStarted";
import ServerStopped from "./models/ServerStopped";
import ChatMessage from "./models/ChatMessage";
import ServerPlayerConnected from "./models/ServerPlayerConnected";
import ServerPlayerDisconnected from "./models/ServerPlayerDisconnected";
import ServerPlayerResourceGathered from "./models/ServerPlayerResourceGathered";
import ServerPlayerRespawned from "./models/ServerPlayerRespawned";
import ServerPlayerCombatPlayerhit from "./models/ServerPlayerCombatPlayerhit";
import ServerPlayerItemPickup from "./models/ServerPlayerItemPickup";
import ServerPlayerItemLoot from "./models/ServerPlayerItemLoot";
import ServerPlayerItemCrafted from "./models/ServerPlayerItemCrafted";
import ServerCommand from "./models/ServerCommand";
import ServerPlayerReported from "./models/ServerPlayerReported";
import ServerPlayerUnbanned from "./models/ServerPlayerUnbanned";
import ServerPlayerBanned from "./models/ServerPlayerBanned";
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
  v0RustServersServerIdEventsWipedChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsConnectedChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel
};
export {
  v0RustServersServerIdEventsCommandChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsReportedChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel
};
export {
  v0RustServersServerIdPlayersSteamIdEventsBannedChannel
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
  ServerPlayerConnected
};
export {
  ServerPlayerDisconnected
};
export {
  ServerPlayerResourceGathered
};
export {
  ServerPlayerRespawned
};
export {
  ServerPlayerCombatPlayerhit
};
export {
  ServerPlayerItemPickup
};
export {
  ServerPlayerItemLoot
};
export {
  ServerPlayerItemCrafted
};
export {
  ServerCommand
};
export {
  ServerPlayerReported
};
export {
  ServerPlayerUnbanned
};
export {
  ServerPlayerBanned
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
  private js ? : Nats.JetStreamClient;
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
        this.js = this.nc.jetstream();
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
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/started`
   * 
   * Channel for the API to process for when a server has started
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdEventsStarted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStarted, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsStartedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/events/started`
   * 
   * Channel for the API to process for when a server has started
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdEventsStarted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStarted, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsStartedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/events/started`
   * 
   * Channel for the API to process for when a server has started
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdEventsStarted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStarted, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdEventsStartedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/started`
   * 
   * Channel for the API to process for when a server has started
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdEventsStarted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStarted, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsStartedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
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
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/stopped`
   * 
   * Channel for the API to process for when a server has stopped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdEventsStopped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStopped, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsStoppedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/events/stopped`
   * 
   * Channel for the API to process for when a server has stopped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdEventsStopped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStopped, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsStoppedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/events/stopped`
   * 
   * Channel for the API to process for when a server has stopped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdEventsStopped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStopped, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdEventsStoppedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/stopped`
   * 
   * Channel for the API to process for when a server has stopped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdEventsStopped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerStopped, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsStoppedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/player/{steam_id}/chatted`
   * 
   * Event for when a player used the chat
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdEventsPlayerSteamIdChatted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ChatMessage, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsPlayerSteamIdChattedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/events/player/{steam_id}/chatted`
   * 
   * Event for when a player used the chat
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdEventsPlayerSteamIdChatted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ChatMessage, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsPlayerSteamIdChattedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/events/player/{steam_id}/chatted`
   * 
   * Event for when a player used the chat
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdEventsPlayerSteamIdChatted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ChatMessage, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdEventsPlayerSteamIdChattedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/player/{steam_id}/chatted`
   * 
   * Event for when a player used the chat
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdEventsPlayerSteamIdChatted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ChatMessage, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsPlayerSteamIdChattedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/events/wiped`
   * 
   * Channel for the API to process when a server has just wiped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdEventsWiped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : null, server_id ? : string) => void, server_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsWipedChannel.subscribe(
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
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/wiped`
   * 
   * Channel for the API to process when a server has just wiped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdEventsWiped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : null, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsWipedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/events/wiped`
   * 
   * Channel for the API to process when a server has just wiped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdEventsWiped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : null, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsWipedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/events/wiped`
   * 
   * Channel for the API to process when a server has just wiped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdEventsWiped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : null, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdEventsWipedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/wiped`
   * 
   * Channel for the API to process when a server has just wiped
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdEventsWiped(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : null, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsWipedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/connected`
   * 
   * Channel for the API to process for when a player connects to a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsConnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerConnected, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsConnectedChannel.subscribe(
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/connected`
   * 
   * Channel for the API to process for when a player connects to a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsConnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerConnected, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsConnectedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/connected`
   * 
   * Channel for the API to process for when a player connects to a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsConnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerConnected, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsConnectedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/connected`
   * 
   * Channel for the API to process for when a player connects to a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsConnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerConnected, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsConnectedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/connected`
   * 
   * Channel for the API to process for when a player connects to a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsConnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerConnected, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsConnectedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/disconnected`
   * 
   * Channel for the API to process for when a player disconnects from a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsDisconnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerDisconnected, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel.subscribe(
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/disconnected`
   * 
   * Channel for the API to process for when a player disconnects from a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsDisconnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerDisconnected, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/disconnected`
   * 
   * Channel for the API to process for when a player disconnects from a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsDisconnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerDisconnected, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/disconnected`
   * 
   * Channel for the API to process for when a player disconnects from a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsDisconnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerDisconnected, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/disconnected`
   * 
   * Channel for the API to process for when a player disconnects from a server
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsDisconnected(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerDisconnected, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources`
   * 
   * Channel for the API to process for when a player gathers some resources
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsGatheredResources(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel.subscribe(
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources`
   * 
   * Channel for the API to process for when a player gathers some resources
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsGatheredResources(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources`
   * 
   * Channel for the API to process for when a player gathers some resources
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsGatheredResources(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources`
   * 
   * Channel for the API to process for when a player gathers some resources
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsGatheredResources(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources`
   * 
   * Channel for the API to process for when a player gathers some resources
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsGatheredResources(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerResourceGathered, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/respawned`
   * 
   * Channel for the API to process for when a player respawn
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsRespawned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerRespawned, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel.subscribe(
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/respawned`
   * 
   * Channel for the API to process for when a player respawn
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsRespawned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerRespawned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/respawned`
   * 
   * Channel for the API to process for when a player respawn
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsRespawned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerRespawned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/respawned`
   * 
   * Channel for the API to process for when a player respawn
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsRespawned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerRespawned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/respawned`
   * 
   * Channel for the API to process for when a player respawn
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsRespawned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerRespawned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/combat/hit`
   * 
   * Channel for the API to process for when a player hits another player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsCombatHit(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerCombatPlayerhit, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel.subscribe(
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/combat/hit`
   * 
   * Channel for the API to process for when a player hits another player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsCombatHit(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerCombatPlayerhit, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/combat/hit`
   * 
   * Channel for the API to process for when a player hits another player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsCombatHit(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerCombatPlayerhit, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/combat/hit`
   * 
   * Channel for the API to process for when a player hits another player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsCombatHit(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerCombatPlayerhit, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/combat/hit`
   * 
   * Channel for the API to process for when a player hits another player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsCombatHit(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerCombatPlayerhit, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/pickup`
   * 
   * Channel for the API to process for when a player pickup items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemPickup, server_id ? : string, steam_id ? : string, item_id ? : string) => void, server_id: string, steam_id: string, item_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel.subscribe(
            onDataCallback,
            this.nc,
            this.codec, server_id, steam_id, item_id,
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
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/pickup`
   * 
   * Channel for the API to process for when a player pickup items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemPickup, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id, item_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/pickup`
   * 
   * Channel for the API to process for when a player pickup items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemPickup, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id, item_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/pickup`
   * 
   * Channel for the API to process for when a player pickup items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemPickup, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id, item_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/pickup`
   * 
   * Channel for the API to process for when a player pickup items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemPickup, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id, item_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/loot`
   * 
   * Channel for the API to process for when a player loots an item ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemLoot, server_id ? : string, steam_id ? : string, item_id ? : string) => void, server_id: string, steam_id: string, item_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel.subscribe(
            onDataCallback,
            this.nc,
            this.codec, server_id, steam_id, item_id,
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
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/loot`
   * 
   * Channel for the API to process for when a player loots an item ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemLoot, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id, item_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/loot`
   * 
   * Channel for the API to process for when a player loots an item ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemLoot, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id, item_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/loot`
   * 
   * Channel for the API to process for when a player loots an item ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemLoot, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id, item_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/loot`
   * 
   * Channel for the API to process for when a player loots an item ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemLoot, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id, item_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/crafted`
   * 
   * Channel for the API to process for when a player crafts items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemCrafted, server_id ? : string, steam_id ? : string, item_id ? : string) => void, server_id: string, steam_id: string, item_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel.subscribe(
            onDataCallback,
            this.nc,
            this.codec, server_id, steam_id, item_id,
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
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/crafted`
   * 
   * Channel for the API to process for when a player crafts items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemCrafted, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id, item_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/crafted`
   * 
   * Channel for the API to process for when a player crafts items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemCrafted, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id, item_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/crafted`
   * 
   * Channel for the API to process for when a player crafts items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemCrafted, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id, item_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/crafted`
   * 
   * Channel for the API to process for when a player crafts items ingame
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerItemCrafted, server_id ? : string, steam_id ? : string, item_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string, item_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id, item_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/events/command`
   * 
   * Channel for the API to process for when a server command is run
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdEventsCommand(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerCommand, server_id ? : string) => void, server_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsCommandChannel.subscribe(
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
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/command`
   * 
   * Channel for the API to process for when a server command is run
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdEventsCommand(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerCommand, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsCommandChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/events/command`
   * 
   * Channel for the API to process for when a server command is run
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdEventsCommand(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerCommand, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdEventsCommandChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/events/command`
   * 
   * Channel for the API to process for when a server command is run
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdEventsCommand(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerCommand, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdEventsCommandChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/events/command`
   * 
   * Channel for the API to process for when a server command is run
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdEventsCommand(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerCommand, server_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdEventsCommandChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/reported`
   * 
   * Channel for the API to process for when a player is reported
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsReported(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerReported, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsReportedChannel.subscribe(
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/reported`
   * 
   * Channel for the API to process for when a player is reported
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsReported(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerReported, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsReportedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/reported`
   * 
   * Channel for the API to process for when a player is reported
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsReported(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerReported, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsReportedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/reported`
   * 
   * Channel for the API to process for when a player is reported
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsReported(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerReported, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsReportedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/reported`
   * 
   * Channel for the API to process for when a player is reported
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsReported(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerReported, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsReportedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/unbanned`
   * 
   * Channel for notifying a server unbanned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsUnbanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerUnbanned, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel.subscribe(
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/unbanned`
   * 
   * Channel for notifying a server unbanned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsUnbanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerUnbanned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/unbanned`
   * 
   * Channel for notifying a server unbanned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsUnbanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerUnbanned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/unbanned`
   * 
   * Channel for notifying a server unbanned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsUnbanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerUnbanned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/unbanned`
   * 
   * Channel for notifying a server unbanned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsUnbanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerUnbanned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Subscribe to the `v0/rust/servers/{server_id}/players/{steam_id}/events/banned`
   * 
   * Channel for notifying a server banned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public subscribeToV0RustServersServerIdPlayersSteamIdEventsBanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerBanned, server_id ? : string, steam_id ? : string) => void, server_id: string, steam_id: string,
    flush ? : boolean,
    options ? : Nats.SubscriptionOptions
  ): Promise < Nats.Subscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsBannedChannel.subscribe(
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
  /**
   * JetStream pull function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/banned`
   * 
   * Channel for notifying a server banned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullV0RustServersServerIdPlayersSteamIdEventsBanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerBanned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsBannedChannel.jetStreamPull(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
  /**
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/banned`
   * 
   * Channel for notifying a server banned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPushSubscribeToV0RustServersServerIdPlayersSteamIdEventsBanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerBanned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = await v0RustServersServerIdPlayersSteamIdEventsBannedChannel.jetStreamPushSubscribe(
            onDataCallback,
            this.js,
            this.codec,
            server_id, steam_id,
            options
          );
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
   * Push subscription to the `v0/rust/servers/{server_id}/players/{steam_id}/events/banned`
   * 
   * Channel for notifying a server banned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param flush ensure client is force flushed after subscribing
   * @param options to subscribe with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamPullSubscribeToV0RustServersServerIdPlayersSteamIdEventsBanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerBanned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    options: Nats.ConsumerOptsBuilder | Partial < Nats.ConsumerOpts >
  ): Promise < Nats.JetStreamPullSubscription > {
    return new Promise(async (resolve, reject) => {
      if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
        try {
          const sub = v0RustServersServerIdPlayersSteamIdEventsBannedChannel.jetStreamPullSubscribe(
            onDataCallback,
            this.js,
            this.codec, server_id, steam_id,
            options
          );
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
   * JetStream fetch function.
   * 
   * Pull message from `v0/rust/servers/{server_id}/players/{steam_id}/events/banned`
   * 
   * Channel for notifying a server banned a player
   * 
   * @param onDataCallback to call when messages are received
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param options to pull message with, bindings from the AsyncAPI document overwrite these if specified
   */
  public jetStreamFetchV0RustServersServerIdPlayersSteamIdEventsBanned(
    onDataCallback: (
      err ? : NatsTypescriptTemplateError,
      msg ? : ServerPlayerBanned, server_id ? : string, steam_id ? : string,
      jetstreamMsg ? : Nats.JsMsg) => void, server_id: string, steam_id: string,
    durable: string, options ? : Partial < Nats.PullOptions >
  ): void {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      v0RustServersServerIdPlayersSteamIdEventsBannedChannel.jetsStreamFetch(
        onDataCallback,
        this.js,
        this.codec, server_id, steam_id,
        durable,
        options
      );
    } else {
      throw NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED);
    }
  }
}
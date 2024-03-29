import {
  ErrorCode,
  NatsTypescriptTemplateError
} from '../NatsTypescriptTemplateError';
import * as Nats from 'nats';
import * as v0RustServersServerIdEventsStartedChannel from "./testchannels/V0RustServersServerIdEventsStarted";
import * as v0RustServersServerIdEventsStoppedChannel from "./testchannels/V0RustServersServerIdEventsStopped";
import * as v0RustServersServerIdEventsPlayerSteamIdChattedChannel from "./testchannels/V0RustServersServerIdEventsPlayerSteamIdChatted";
import * as v0RustServersServerIdEventsWipedChannel from "./testchannels/V0RustServersServerIdEventsWiped";
import * as v0RustServersServerIdPlayersSteamIdEventsConnectedChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsConnected";
import * as v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsDisconnected";
import * as v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsGatheredResources";
import * as v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsRespawned";
import * as v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsCombatHit";
import * as v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup";
import * as v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot";
import * as v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted";
import * as v0RustServersServerIdEventsCommandChannel from "./testchannels/V0RustServersServerIdEventsCommand";
import * as v0RustServersServerIdPlayersSteamIdEventsReportedChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsReported";
import * as v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsUnbanned";
import * as v0RustServersServerIdPlayersSteamIdEventsBannedChannel from "./testchannels/V0RustServersServerIdPlayersSteamIdEventsBanned";
import ServerStarted from "../models/ServerStarted";
import ServerStopped from "../models/ServerStopped";
import ChatMessage from "../models/ChatMessage";
import ServerPlayerConnected from "../models/ServerPlayerConnected";
import ServerPlayerDisconnected from "../models/ServerPlayerDisconnected";
import ServerPlayerResourceGathered from "../models/ServerPlayerResourceGathered";
import ServerPlayerRespawned from "../models/ServerPlayerRespawned";
import ServerPlayerCombatPlayerhit from "../models/ServerPlayerCombatPlayerhit";
import ServerPlayerItemPickup from "../models/ServerPlayerItemPickup";
import ServerPlayerItemLoot from "../models/ServerPlayerItemLoot";
import ServerPlayerItemCrafted from "../models/ServerPlayerItemCrafted";
import ServerCommand from "../models/ServerCommand";
import ServerPlayerReported from "../models/ServerPlayerReported";
import ServerPlayerUnbanned from "../models/ServerPlayerUnbanned";
import ServerPlayerBanned from "../models/ServerPlayerBanned";
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
/**
 * @class NatsAsyncApiTestClient
 * 
 * The test/mirror client which is the reverse to the normal NatsAsyncApiClient.
 */
export class NatsAsyncApiTestClient {
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
   * Publish to the `v0/rust/servers/{server_id}/events/started` channel 
   * 
   * Channel for the API to process for when a server has started
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   */
  public publishToV0RustServersServerIdEventsStarted(
    message: ServerStarted, server_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdEventsStartedChannel.publish(
        message,
        this.nc,
        this.codec, server_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/started` jetstream channel 
   * 
   * Channel for the API to process for when a server has started
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdEventsStarted(
    message: ServerStarted, server_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdEventsStartedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/stopped` channel 
   * 
   * Channel for the API to process for when a server has stopped
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   */
  public publishToV0RustServersServerIdEventsStopped(
    message: ServerStopped, server_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdEventsStoppedChannel.publish(
        message,
        this.nc,
        this.codec, server_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/stopped` jetstream channel 
   * 
   * Channel for the API to process for when a server has stopped
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdEventsStopped(
    message: ServerStopped, server_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdEventsStoppedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/player/{steam_id}/chatted` channel 
   * 
   * Event for when a player used the chat
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdEventsPlayerSteamIdChatted(
    message: ChatMessage, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdEventsPlayerSteamIdChattedChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/player/{steam_id}/chatted` jetstream channel 
   * 
   * Event for when a player used the chat
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdEventsPlayerSteamIdChatted(
    message: ChatMessage, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdEventsPlayerSteamIdChattedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/wiped` channel 
   * 
   * Channel for the API to process when a server has just wiped
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   */
  public publishToV0RustServersServerIdEventsWiped(
    message: null, server_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdEventsWipedChannel.publish(
        message,
        this.nc,
        this.codec, server_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/wiped` jetstream channel 
   * 
   * Channel for the API to process when a server has just wiped
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdEventsWiped(
    message: null, server_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdEventsWipedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/connected` channel 
   * 
   * Channel for the API to process for when a player connects to a server
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsConnected(
    message: ServerPlayerConnected, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsConnectedChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/connected` jetstream channel 
   * 
   * Channel for the API to process for when a player connects to a server
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsConnected(
    message: ServerPlayerConnected, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsConnectedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/disconnected` channel 
   * 
   * Channel for the API to process for when a player disconnects from a server
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsDisconnected(
    message: ServerPlayerDisconnected, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/disconnected` jetstream channel 
   * 
   * Channel for the API to process for when a player disconnects from a server
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsDisconnected(
    message: ServerPlayerDisconnected, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsDisconnectedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources` channel 
   * 
   * Channel for the API to process for when a player gathers some resources
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsGatheredResources(
    message: ServerPlayerResourceGathered, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/gatheredResources` jetstream channel 
   * 
   * Channel for the API to process for when a player gathers some resources
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsGatheredResources(
    message: ServerPlayerResourceGathered, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsGatheredResourcesChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/respawned` channel 
   * 
   * Channel for the API to process for when a player respawn
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsRespawned(
    message: ServerPlayerRespawned, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/respawned` jetstream channel 
   * 
   * Channel for the API to process for when a player respawn
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsRespawned(
    message: ServerPlayerRespawned, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsRespawnedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/combat/hit` channel 
   * 
   * Channel for the API to process for when a player hits another player
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsCombatHit(
    message: ServerPlayerCombatPlayerhit, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/combat/hit` jetstream channel 
   * 
   * Channel for the API to process for when a player hits another player
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsCombatHit(
    message: ServerPlayerCombatPlayerhit, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsCombatHitChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/pickup` channel 
   * 
   * Channel for the API to process for when a player pickup items ingame
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup(
    message: ServerPlayerItemPickup, server_id: string, steam_id: string, item_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id, item_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/pickup` jetstream channel 
   * 
   * Channel for the API to process for when a player pickup items ingame
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickup(
    message: ServerPlayerItemPickup, server_id: string, steam_id: string, item_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsItemsItemIdPickupChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id, item_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/loot` channel 
   * 
   * Channel for the API to process for when a player loots an item ingame
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot(
    message: ServerPlayerItemLoot, server_id: string, steam_id: string, item_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id, item_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/loot` jetstream channel 
   * 
   * Channel for the API to process for when a player loots an item ingame
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdLoot(
    message: ServerPlayerItemLoot, server_id: string, steam_id: string, item_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsItemsItemIdLootChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id, item_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/crafted` channel 
   * 
   * Channel for the API to process for when a player crafts items ingame
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted(
    message: ServerPlayerItemCrafted, server_id: string, steam_id: string, item_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id, item_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/items/{item_id}/crafted` jetstream channel 
   * 
   * Channel for the API to process for when a player crafts items ingame
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   * @param item_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsItemsItemIdCrafted(
    message: ServerPlayerItemCrafted, server_id: string, steam_id: string, item_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsItemsItemIdCraftedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id, item_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/command` channel 
   * 
   * Channel for the API to process for when a server command is run
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   */
  public publishToV0RustServersServerIdEventsCommand(
    message: ServerCommand, server_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdEventsCommandChannel.publish(
        message,
        this.nc,
        this.codec, server_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/events/command` jetstream channel 
   * 
   * Channel for the API to process for when a server command is run
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdEventsCommand(
    message: ServerCommand, server_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdEventsCommandChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/reported` channel 
   * 
   * Channel for the API to process for when a player is reported
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsReported(
    message: ServerPlayerReported, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsReportedChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/reported` jetstream channel 
   * 
   * Channel for the API to process for when a player is reported
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsReported(
    message: ServerPlayerReported, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsReportedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/unbanned` channel 
   * 
   * Channel for notifying a server unbanned a player
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsUnbanned(
    message: ServerPlayerUnbanned, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/unbanned` jetstream channel 
   * 
   * Channel for notifying a server unbanned a player
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsUnbanned(
    message: ServerPlayerUnbanned, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsUnbannedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/banned` channel 
   * 
   * Channel for notifying a server banned a player
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public publishToV0RustServersServerIdPlayersSteamIdEventsBanned(
    message: ServerPlayerBanned, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsBannedChannel.publish(
        message,
        this.nc,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
  /**
   * Publish to the `v0/rust/servers/{server_id}/players/{steam_id}/events/banned` jetstream channel 
   * 
   * Channel for notifying a server banned a player
   * 
   * @param message to publish
   * @param server_id parameter to use in topic
   * @param steam_id parameter to use in topic
   */
  public jetStreamPublishToV0RustServersServerIdPlayersSteamIdEventsBanned(
    message: ServerPlayerBanned, server_id: string, steam_id: string,
    options ? : Nats.PublishOptions
  ): Promise < void > {
    if (!this.isClosed() && this.nc !== undefined && this.codec !== undefined && this.js !== undefined) {
      return v0RustServersServerIdPlayersSteamIdEventsBannedChannel.jetStreamPublish(
        message,
        this.js,
        this.codec, server_id, steam_id,
        options
      );
    } else {
      return Promise.reject(NatsTypescriptTemplateError.errorForCode(ErrorCode.NOT_CONNECTED));
    }
  }
}
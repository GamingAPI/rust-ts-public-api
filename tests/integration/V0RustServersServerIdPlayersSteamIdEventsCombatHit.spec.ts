import {
  describe,
  it,
  before
} from 'mocha';
import {
  expect
} from 'chai';
import * as Client from '../../src'
import * as TestClient from '../../src/testclient'
import {
  NatsTypescriptTemplateError
} from '../../src/NatsTypescriptTemplateError';
describe('v0/rust/servers/{server_id}/players/{steam_id}/events/combat/hit can talk to itself', () => {
  var client: Client.NatsAsyncApiClient;
  var testClient: TestClient.NatsAsyncApiTestClient;
  before(async () => {
    client = new Client.NatsAsyncApiClient();
    testClient = new TestClient.NatsAsyncApiTestClient();
    const natsHost = process.env.NATS_HOST || "0.0.0.0"
    const natsPort = process.env.NATS_PORT || "4222"
    const natsUrl = `${natsHost}:${natsPort}`
    await client.connectToHost(natsUrl);
    await testClient.connectToHost(natsUrl);
  });
  it('can send message', async () => {
    var receivedError: NatsTypescriptTemplateError | undefined = undefined;
    var receivedMsg: Client.ServerPlayerCombatPlayerhit | undefined = undefined;
    var receivedServerId: string | undefined = undefined;
    var receivedSteamId: string | undefined = undefined;
    var publishMessage: TestClient.ServerPlayerCombatPlayerhit = TestClient.ServerPlayerCombatPlayerhit.unmarshal({
      "hit_timestamp": "2016-08-29T09:12:33.001Z",
      "player_hit": {
        "hit_area_id": 0,
        "hit_distance": 0,
        "hit_damage": 0,
        "isKill": true,
        "victim": {
          "steam_id": "string",
          "position": {
            "x": 0,
            "y": 0,
            "z": 0
          },
          "active_item": {
            "uid": 0,
            "item_id": 0
          }
        },
        "attacker": {
          "steam_id": "string",
          "position": {
            "x": 0,
            "y": 0,
            "z": 0
          },
          "active_item": {
            "uid": 0,
            "item_id": 0
          }
        }
      }
    });
    var ServerIdToSend: string = "string";
    var SteamIdToSend: string = "string";
    const subscription = await client.subscribeToV0RustServersServerIdPlayersSteamIdEventsCombatHit((err, msg, server_id, steam_id) => {
        receivedError = err;
        receivedMsg = msg;
        receivedServerId = server_id;
        receivedSteamId = steam_id;
      }, ServerIdToSend, SteamIdToSend,
      true
    );
    const tryAndWaitForResponse = new Promise((resolve, reject) => {
      let isReturned = false;
      setTimeout(() => {
        if (!isReturned) {
          reject(new Error("Timeout"));
        }
      }, 3000)
      setInterval(async () => {
        if (subscription.getReceived() === 1) {
          resolve(undefined);
          isReturned = true
        }
      }, 100);
    });
    await testClient.publishToV0RustServersServerIdPlayersSteamIdEventsCombatHit(publishMessage, ServerIdToSend, SteamIdToSend);
    await tryAndWaitForResponse;
    expect(receivedError).to.be.undefined;
    expect(receivedMsg).to.not.be.undefined;
    expect(receivedMsg!.marshal()).to.equal(publishMessage.marshal());
    expect(receivedServerId).to.be.equal(ServerIdToSend);
    expect(receivedSteamId).to.be.equal(SteamIdToSend);
  });
  after(async () => {
    await client.disconnect();
    await testClient.disconnect();
  });
});
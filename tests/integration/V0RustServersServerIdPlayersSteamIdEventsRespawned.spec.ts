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
describe('v0/rust/servers/{server_id}/players/{steam_id}/events/respawned can talk to itself', () => {
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
    var receivedMsg: Client.ServerPlayerRespawned | undefined = undefined;
    var receivedServerId: string | undefined = undefined;
    var receivedSteamId: string | undefined = undefined;
    var publishMessage: TestClient.ServerPlayerRespawned = TestClient.ServerPlayerRespawned.unmarshal({
      "steam_id": "string",
      "respawn_timestamp": "2016-08-29T09:12:33.001Z",
      "respawn_position": {
        "x": 0,
        "y": 0,
        "z": 0
      }
    });
    var ServerIdToSend: string = "string";
    var SteamIdToSend: string = "string";
    const subscription = await client.subscribeToV0RustServersServerIdPlayersSteamIdEventsRespawned((err, msg, server_id, steam_id) => {
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
    await testClient.publishToV0RustServersServerIdPlayersSteamIdEventsRespawned(publishMessage, ServerIdToSend, SteamIdToSend);
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
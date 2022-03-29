import PubNub from "pubnub";

const TEST_CHANNEL = "TEST_CHANNEL";
const message = {
  title: "greeting",
  description: "hello world!",
};

class Listener {
  constructor() {
    this.status = function (statusEvent) {
      // console.log(statusEvent);
    };

    // function that tells peers what to do after receiving a message on a channel
    this.message = function (messageEvent) {
      console.log("Message title is: " + messageEvent.message.title);
      console.log(
        "Message Description is: " + messageEvent.message.description
      );
    };

    this.presence = function (presenceEvent) {
      // handle presence
      console.log(presenceEvent);
    };
  }
}

class PubSub {
  constructor() {
    this.pubnub = new PubNub({
      publishKey: "pub-c-e25510fd-7eaa-4562-b2b7-d959147ee092",
      subscribeKey: "sub-c-22cd16f2-ad4d-11ec-b6fc-9aa0759238d3",
    });

    /*
        All the instance of this class, when initiated, 
        will subscribe to the TEST_CHANNEL
    */
    this.pubnub.subscribe({
      channels: [TEST_CHANNEL],
    });

    // Listener tell a peer what to do
    // when a new message is publised on the subscribed channel
    this.pubnub.addListener(new Listener());
  }

  // Publish the message object to the channel
  async publish(channel, message) {
    const result = await this.pubnub.publish({
      channel: channel,
      message: message,
    });

    return result;
  }
}

const pubsub = new PubSub();

/*
    Need to set this to make sure the output shown
    because if a peer subscribe and publish at the same time
    the message in Listener.message() might not be shown
*/
setTimeout(() => {
  pubsub.publish(TEST_CHANNEL, message);
}, 500);

export { PubSub };

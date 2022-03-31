import PubNub from "pubnub";
import { Block } from "./models/block.js";

const CHANNELS = {
  TEST: "TEST",
  BLOCK: "BLOCK",
};

class Listener {
  constructor(blockchain) {
    this.blockchain = blockchain;
  }

  // function that tells peers what to do after receiving a message on a channel
  message(messageEvent) {
    console.log(`\n -- Channel: ${messageEvent.channel}`);
    const newBlock = messageEvent.message;

    // Getting a copy of an array without referencing its address
    const chainLength = this.blockchain.chain.length;
    const potential_chain = this.blockchain.chain.slice(0, chainLength);
    potential_chain.push(newBlock);

    try {
      this.blockchain.replace_chain(potential_chain);
      console.log(" -- Successfully replaced the local chain");
      console.log("block data: ");
      console.log(newBlock);
    } catch (error) {
      console.log(" -- Did not replace chain:");
      console.log(error);
    }
  }
}

class PubSub {
  constructor(blockchain) {
    this.pubnub = new PubNub({
      publishKey: "pub-c-e25510fd-7eaa-4562-b2b7-d959147ee092",
      subscribeKey: "sub-c-22cd16f2-ad4d-11ec-b6fc-9aa0759238d3",
    });

    /*
        All the instance of this class, when initiated, 
        will subscribe to the all the channels
    */
    this.pubnub.subscribe({
      channels: [...Object.values(CHANNELS)],
    });

    // Listener tell a peer what to do
    // when a new message is publised on the subscribed channel
    this.pubnub.addListener(new Listener(blockchain));
  }

  // Publish the message object to the channel
  async publish(channel, message) {
    const result = await this.pubnub.publish({
      channel: channel,
      message: message,
    });

    return result;
  }

  broadcast_block(block) {
    this.publish(CHANNELS["BLOCK"], block);
  }
}

/*
    Need to setTimeout to make sure the output shown
    because if a peer subscribe and publish at the same time
    the message in Listener.message() might not be shown
*/

// const message = {
//   title: "greeting",
//   description: "hello world!",
// };
// const pubsub = new PubSub();
// setTimeout(() => {
//   pubsub.publish(CHANNELS["TEST"], message);
// }, 500);

export { PubSub };

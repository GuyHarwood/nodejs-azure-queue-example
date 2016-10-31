
'use strict';

var azure = require('azure-storage');
var Base64Encoder = azure.QueueMessageEncoder.TextBase64QueueMessageEncoder;

var config = require('./config.json');

var storageAccount = process.env.AZURE_STORAGE_ACCOUNT || config.azureStorageAccount;
var accessKey = process.env.AZURE_STORAGE_ACCESS_KEY || config.azureStorageAccessKey;
var queueName = process.env.AZURE_QUEUE_NAME || config.azureQueueName;

var queueService = azure.createQueueService(storageAccount, accessKey);
queueService.messageEncoder = new Base64Encoder(); // default is TextXMLQueueMessageEncoder, set to null if you want to use plain text

var i = 0;
(function pushAndPop (i) {
  pushMessage(i, function () {
    popMessages();
    if (i < 5) { setTimeout(pushAndPop.bind(this, i + 1), 3000); }
  });
})(i);


function popMessages () {
  var options = {
    numOfMessages: 1, // up to 32 messages, default is 1
    visibilityTimeout: 20 // delay in sec before the message is visible again, default is 30
  };
  queueService.getMessages(queueName, options, function(error, serverMessages) {
    var message;
    var content;

    if (error) {
      console.error('unable to get message from the queue', error);
      return;
    }

    if (serverMessages.length === 0) {
      console.info('no message in the queue');
      return;
    }

    message = serverMessages[0];
    content = JSON.parse(message.messageText);

    console.log('message %s retrieved: %s', content.counter, content.message);

    queueService.deleteMessage(queueName, message.messageId, message.popReceipt, function (error) {
      if (error) {
        console.error('unable to delete message %s', content.counter, error);
        return;
      }
      console.log('message %s deleted', content.counter);
    });
  });
}

function pushMessage (counter, callback) {
  // Message can only be a string, so we stringifiy our object
  var msg = JSON.stringify({message: 'Hello World ' + counter, counter: counter});
  queueService.createMessage(queueName, msg, function (error) {
    if (error) {
      console.error('unable to push message %s', counter, error);
      return;
    }

    console.log('message %s pushed in the queue', counter);
    callback();
  });
}

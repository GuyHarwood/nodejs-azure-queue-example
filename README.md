# Example: Azure Queues with Node.js

This Node.js script shows how to push messages to an Azure Queue and how to get messages from the same queue.

When writing this repo, [Azure Storage Explorer](http://storageexplorer.com/) only supports Base64 encoding. This is why the messages are by default encoded in Base64 in this example.

## Install

```
npm i
```

## Configure

Two variables are needed to access your Azure Queue:

- `AZURE_STORAGE_ACCOUNT`: name of your storage account.
- `AZURE_STORAGE_ACCESS_KEY`: access key to your storage account. You can get it on the Azure portal, under the *Settings* tab, in the *Access keys* menu.
- `AZURE_QUEUE_NAME`: name of the queue

To use this script, you can either configure environment variables or edit the `config.json` file.

## Run

```
node index.js
```

## Output

The script pushes an `Hello World` message and then directly gets it from the queue 5 times in a row. Example of output is:

```
message 0 pushed in the queue
message 0 retrieved: Hello World 0
message 0 deleted
message 1 pushed in the queue
message 1 retrieved: Hello World 1
message 1 deleted
message 2 pushed in the queue
message 2 retrieved: Hello World 2
message 2 deleted
message 3 pushed in the queue
message 3 retrieved: Hello World 3
message 3 deleted
message 4 pushed in the queue
message 4 retrieved: Hello World 4
message 4 deleted
message 5 pushed in the queue
message 5 retrieved: Hello World 5
message 5 deleted
```

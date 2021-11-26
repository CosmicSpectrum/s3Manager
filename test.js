const FileStorageLib = require('./fileStorageLib')

async function run() {
    let GoogleCloudStorage = new FileStorageLib();
    let result = await GoogleCloudStorage.createBucket("test");
    console.log(result)
}

run()
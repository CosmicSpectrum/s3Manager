const {Storage} =require('@google-cloud/storage');

module.exports = class FileStorageLib{
    /**
     * Creates an object with the endpoint info
     * @param {*} endpoint string of the endpoint
     */
    constructor(){
        this.connection = new Storage({projectId: "auctionPlatform",
            keyFilename: "./connectionCardentials/coral-gate-333316-4cefbde5f0e8.json"
        });
    }

    /**
     * This function will create a new bucket in the storage
     * @param {*} bucketName The bucket name
     */
    createBucket(bucketName){
        return new Promise((resolve,reject)=>{
            this.connection.createBucket(bucketName,(err,result)=>{
                if(err)
                    reject(err)
                resolve(result)
            })
        })
    }
}

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');

module.exports = class s3Managment{
    /**
     * Creates an object with the endpoint info
     */
    constructor(accessKeyId,secretAccessKey,bucket){
        this.s3Bucket = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            Bucket: bucket
        })
    }

    /**
     * this function will upload data to the s3 bucket
     * @param {*} file file buffer
     * @param {*} bucketName bucket name as a string
     * @returns 
     */
    upload(file,bucketName){
        return new Promise((resolve,reject)=>{
            const params = {
                Bucket: bucketName,
                Key: uuidv4(),
                Body: file
            }
            this.s3Bucket.upload(params,(err,data)=>{
                if(err)
                    reject(err)
                resolve(data)
            })
        })
    }
    download(){}
    delete(){}
}

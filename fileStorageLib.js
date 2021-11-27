const AWS = require('aws-sdk');
const {
    v4: uuidv4
} = require('uuid');

module.exports = class s3Managment {
    /**
     * Creates an object with the endpoint info
     * @param {*} accessKeyId The allowed user id
     * @param {*} secretAccessKey The user secret
     * @param {*} bucket The target bucket name
     */
    constructor(accessKeyId, secretAccessKey, bucket) {
        this.s3Bucket = new AWS.S3({
            accessKeyId: accessKeyId,
            secretAccessKey: secretAccessKey,
            Bucket: bucket
        })
        this.bucketName = bucket
    }

    /**
     * this function will upload data to the s3 bucket
     * @param {*} file file buffer
     * @param {*} bucketName bucket name as a string
     * @returns Return err or the result of the operation
     */
    async upload(file) {
        return new Promise((resolve, reject) => {
            this.s3Bucket.createBucket(() => {
                const params = {
                    Bucket: this.bucketName,
                    Key: uuidv4(),
                    Body: file
                }
                this.s3Bucket.upload(params, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    resolve({
                        fileKey: params.Key
                    })
                })
            })
        })
    }

    /**
     * This function will return a file buffer as requested
     * @param {*} Key The object key
     */
    download(fileKey) {
        return new Promise((resolve, reject) => {
            this.s3Bucket.createBucket(() => {
                const params = {
                    Bucket: this.bucketName,
                    Key: fileKey
                }
                this.s3Bucket.getObject(params, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    resolve(data);
                })
            })
        })
    }

    /**
     * delete an object from the existing bucket.
     * @param {*} fileKey the file uuid.
     * @returns the result of the operation
     */
    delete(fileKey) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: this.bucketName,
                Key: fileKey
            }
            this.s3Bucket.deleteObject(params, (err, result) => {
                if (err)
                    console.log(err)
                resolve(result);
            })
        })
    }
}
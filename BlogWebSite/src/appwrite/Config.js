import {Client, ID, Databases, Storage, Query} from 'appwrite'
import environmentImports from '../environmentImports/environmentImports';

export class Services {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(environmentImports.appwriteUrl)
            .setProject(environmentImports.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({slug, title, content, status, userId}) {
        try{
            return await this.databases.createDocument(environmentImports.appwriteDatabaseId, environmentImports.appwriteCollectionId, slug,
                {
                    title,
                    content,
                    status,
                    userId,
                })
        }catch(error) {
            console.log("Appwrite servies :: getCurrentUser :: error", error);
        }
    }

    async updatePost(slug, {title, content, status}) {
        try{
            return await this.databases.updateDocument(environmentImports.appwriteDatabaseId, environmentImports.appwriteCollectionId, slug, 
            {
                title, 
                content,
                status
            })
        }catch(error) {
            console.log("Appwrite servies :: getCurrentUser :: error", error);
            return false;
        }
    }

    async deletePost(slug) {
        try{
            return await this.databases.deleteDocument(environmentImports.appwriteDatabaseId, environmentImports.appwriteCollectionId, slug)
        }catch(error) {
            console.log("Appwrite servies :: getCurrentUser :: error", error);
            return false;
        }
    }

    async getpost(slug) {
        try{
            return await this.databases.getDocument(environmentImports.appwriteDatabaseId, environmentImports.appwriteCollectionId, slug);
        }catch(error) {
            console.log("Appwrite servies :: getCurrentUser :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try{
            return await this.databases.listDocuments(environmentImports.appwriteDatabaseId, environmentImports.appwriteCollectionId, queries)
        }
        catch{
            console.log("Appwrite servies :: getCurrentUser :: error", error);
            return false;
        }
    }

    //file upload services
    async uploadFile(file) {
        try{
            return await this.bucket.createFile(environmentImports.appwriteBucketId, ID.unique(), file);
        }catch(error) {
            console.log("Appwrite servies :: getCurrentUser :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try{
            await this.bucket.deleteFile(environmentImports.appwriteBucketId, fileId);
            return true;
        }catch(error) {
            console.log("Appwrite servies :: getCurrentUser :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(environmentImports.appwriteBucketId, fileId);
    }

}

const services = new Services();

export default services;
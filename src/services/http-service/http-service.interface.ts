export default interface IHttpService{
    post: (url: string, body: object) => Promise<any>;
}
export class Player {
    public playerNickname:string;
    private authToken:string;
    public ready:boolean;

    public get token(){
        return this.authToken
    }

    constructor(nickname:string,authToken:string,ready:boolean) {
        this.playerNickname = nickname;
        this.authToken=authToken;
        this.ready=ready
    }
}
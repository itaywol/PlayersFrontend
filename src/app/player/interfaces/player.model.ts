export class Player {
    public playerNickname:string;
    public authToken:string;
    public ready:boolean;

    constructor(nickname:string,authToken:string,ready:boolean) {
        this.playerNickname = nickname;
        this.authToken=authToken;
        this.ready=ready
    }
}
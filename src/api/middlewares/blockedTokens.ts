
// Singleton List of blocked tokens by userId
export class BlockedTokens {
    private static instance: BlockedTokens;

    private  blockedTokens : Map<number, string[]> ;

    private constructor() { 
        this.blockedTokens = new Map<number, string[]>();
    }

    public static getInstance(): BlockedTokens {
        if (!BlockedTokens.instance) {
            BlockedTokens.instance = new BlockedTokens();
        }

        return BlockedTokens.instance;
    }
 
    // Checks if token is blocked
    public tokenIsBlocked(userId : number, token: string):boolean {
        console.log(this.blockedTokens)
        if (!this.blockedTokens.get(userId)){
            return false;
        }
        console.log(this.blockedTokens)
        return this.blockedTokens.get(userId).filter(t => t == token).length > 0;     
    }

    // Add blocked token to user list
    public addTokenBlocked(userId : number, token: string) {
        console.log(this.blockedTokens)
        if (!this.blockedTokens.get(userId)){
            this.blockedTokens.set(userId,[]);
        }
        this.blockedTokens.get(userId).push(token);
        console.log(this.blockedTokens)
    }
}
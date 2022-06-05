import { Sandbox, SandboxOptions, SandboxPlayer } from "ZEPETO.Multiplay";
import { DataStorage } from "ZEPETO.Multiplay.DataStorage";
import { Player, Transform, Vector3 } from "ZEPETO.Multiplay.Schema";

export default class extends Sandbox {

    onCreate(options: SandboxOptions) {
        this.onMessage("onChangedTransform", (client, messsage) => {
            const player = this.state.players.get(client.sessionId);
            
            const transform = new Transform();
            transform.position = new Vector3();
            transform.position.x = messsage.position.x;
            transform.position.y = messsage.position.y;
            transform.position.z = messsage.position.z;

            transform.rotation = new Vector3();
            transform.rotation.x = messsage.rotation.x;
            transform.rotation.y = messsage.rotation.y;
            transform.rotation.z = messsage.rotation.z;
            
            player.transform = transform;
        });

        this.onMessage("onChangedState", (client, message) => {
            const player = this.state.players.get(client.sessionId);
            player.state = message.state;
        });
    }

    async onJoin(client: SandboxPlayer) {
        console.log(`[OnJoin] seessionid: ${client.sessionId}, HashCode: ${client.hashCode}, userId: ${client.userId}`);

        const player = new Player();
        player.sessionid = client.sessionId;

        if (client.hashCode) {
            player.zepetoHash = client.hashCode;
        }

        if (client.userId) {
            player.zepetoUserId = client.userId;
        }

        const storage: DataStorage = client.loadDataStorage();
        let visit_cnt = await storage.get("VisitCount") as number;
        if (visit_cnt == null) visit_cnt = 0;

        console.log(`[OnJoin] ${client.sessionId}'s visiting count : ${visit_cnt}`);

        await storage.set("VisitCount", ++visit_cnt);
        
        this.state.players.set(client.sessionId, player);
    }

    onLeave(client: SandboxPlayer, consented?: boolean) {
        this.state.players.delete(client.sessionId);
    }
}
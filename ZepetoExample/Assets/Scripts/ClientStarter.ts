import { CharacterState, LocalPlayer, SpawnInfo, ZepetoPlayers } from 'ZEPETO.Character.Controller';
import { Room, RoomData } from 'ZEPETO.Multiplay';
import { Player, State, Vector3 } from 'ZEPETO.Multiplay.Schema';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script';
import { ZepetoWorldMultiplay } from 'ZEPETO.World';
import * as UnityEngine from 'UnityEngine';
import HitCheck from './HitCheck';

export default class ClientStarter extends ZepetoScriptBehaviour {

    public multiplay: ZepetoWorldMultiplay;
    private room: Room;
    private currentPlayers: Map<string, Player> = new Map<string, Player>();

    Start() {    
        this.multiplay.RoomCreated += (room: Room) => {
            this.room = room;
        };

        this.multiplay.RoomJoined += (room : Room) => {
            room.OnStateChange += this.OnStateChange;
        }

        this.StartCoroutine(this.SendMessageLoop(0.1));
    }

    * SendMessageLoop(tick: number) {
        while(true) {
            yield new UnityEngine.WaitForSeconds(tick);

            if (this.room != null && this.room.IsConnected) {
                const hasPlayer = ZepetoPlayers.instance.HasPlayer(this.room.SessionId);
                if (hasPlayer) {
                    const myPlayer = ZepetoPlayers.instance.GetPlayer(this.room.SessionId);
                    if (myPlayer.character.CurrentState != CharacterState.Idle) {
                        this.SendTransform(myPlayer.character.transform);
                    }
                }
            }
        }
    }

    OnStateChange(state: State, isFirst: boolean) {
        if (isFirst) {
            ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {
                const myPlayer = ZepetoPlayers.instance.LocalPlayer.zepetoPlayer;
                myPlayer.character.OnChangedState.AddListener((cur, prev) => {
                    this.SendState(cur);
                });
            });

            ZepetoPlayers.instance.OnAddedPlayer.AddListener((sessionId: string) => {
                const isLocal = this.room.SessionId === sessionId;
                if (!isLocal) {
                    const player: Player = this.currentPlayers.get(sessionId);
                    player.OnChange += (changeValues) => this.OnUpdatePlayer(sessionId, player);
                }
            });
        }

        let join = new Map<string, Player>();
        let leave = new Map<string, Player>(this.currentPlayers);

        state.players.ForEach((sessionId: string, player: Player) => {
            if (!this.currentPlayers.has(sessionId)) {
                join.set(sessionId, player);
            }
            leave.delete(sessionId);
        }); 

        join.forEach((player: Player, sessionid: string) => this.OnJoinPlayer(sessionid, player));
        leave.forEach((player: Player, sessionid: string) => this.OnLeavePlayer(sessionid, player));
    }
    
    OnUpdatePlayer(sessionId: string, player: Player) {
        const position = this.ParseVector3(player.transform.position);
        const zepetoPlayer = ZepetoPlayers.instance.GetPlayer(sessionId);
        zepetoPlayer.character.MoveToPosition(position);

        if (player.state === CharacterState.JumpIdle || player.state === CharacterState.JumpMove) {
            zepetoPlayer.character.Jump();
        }
    }

    OnJoinPlayer(sessionid: string, player: Player) {
        console.log(`[OnJoinPlayer] ${sessionid}`);

        this.currentPlayers.set(sessionid, player);

        const spawnInfo = new SpawnInfo();
        const position = new UnityEngine.Vector3(0, 0, 0);
        const rotation = new UnityEngine.Vector3(0, 0, 0);

        spawnInfo.position = position;
        spawnInfo.rotation = UnityEngine.Quaternion.Euler(rotation);

        const isLocal = this.room.SessionId === player.sessionid;
        ZepetoPlayers.instance.CreatePlayerWithUserId(sessionid, player.zepetoUserId, spawnInfo, isLocal);
        
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {            
            let _player : LocalPlayer = ZepetoPlayers.instance.LocalPlayer;
            
            // ???????????? ???????????? ??????
            _player.zepetoPlayer.character.gameObject.AddComponent<HitCheck>();
        }); 
    }

    OnLeavePlayer(sessionid: string, player: Player) {
        console.log(`[OnLeavePlayer] ${sessionid}`);

        this.currentPlayers.delete(sessionid);
        ZepetoPlayers.instance.RemovePlayer(sessionid);
    }

    SendState(state: CharacterState) {
        const data = new RoomData();
        data.Add("state", state);
        this.room.Send("onChangedState", data.GetObject());
    }

    SendTransform(transform: UnityEngine.Transform) {
        const data = new RoomData();
        const pos = new RoomData();
        pos.Add("x", transform.localPosition.x);
        pos.Add("y", transform.localPosition.y);
        pos.Add("z", transform.localPosition.z);
        data.Add("position", pos.GetObject());

        const rot = new RoomData();
        rot.Add("x", transform.localEulerAngles.x);
        rot.Add("y", transform.localEulerAngles.y);
        rot.Add("z", transform.localEulerAngles.z);
        data.Add("rotation", rot.GetObject());

        this.room.Send("onChangedTransform", data.GetObject());
    }

    ParseVector3(vector3: Vector3): UnityEngine.Vector3 {
        return new UnityEngine.Vector3(
            vector3.x,
            vector3.y,
            vector3.z
        );
    }
}
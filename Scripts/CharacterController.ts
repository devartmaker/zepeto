import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { SpawnInfo, ZepetoPlayers, LocalPlayer, ZepetoCharacter } from 'ZEPETO.Character.Controller'
import { WorldService } from 'ZEPETO.World';  
import HitCheck from './HitCheck';

export default class CharacterController extends ZepetoScriptBehaviour {    
    Start() {        
        // (Editor를 통해 로그인한)UserId를 가져옵니다.  
        ZepetoPlayers.instance.CreatePlayerWithUserId(WorldService.userId, new SpawnInfo(), true);             
        ZepetoPlayers.instance.OnAddedLocalPlayer.AddListener(() => {            
            let _player : LocalPlayer = ZepetoPlayers.instance.LocalPlayer;

            // 충돌체크 콤포넌트 추가
            _player.zepetoPlayer.character.gameObject.AddComponent<HitCheck>();
        });    
    }
}
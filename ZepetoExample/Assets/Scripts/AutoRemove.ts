import { Object } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class AutoRemove extends ZepetoScriptBehaviour {
    private timer: number;

    Start() {    
        //10초 후에 자동으로 삭제
        this.timer = setTimeout(() => this.Remove(), 10000);
    }

    Remove() {
        Object.Destroy(this.gameObject);
    }

    OnDestroy() {
        clearTimeout(this.timer);
    }
}
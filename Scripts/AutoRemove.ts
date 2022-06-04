import { Object } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class AutoRemove extends ZepetoScriptBehaviour {

    Start() {    
        setTimeout(() => this.Remove(), 5000);
    }

    Remove() {
        Object.Destroy(this.gameObject);
    }
}
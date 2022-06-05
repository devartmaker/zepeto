import { Time } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ObjectScale extends ZepetoScriptBehaviour {

    Start() {    

    }

    Update() {
        let scale = this.transform.localScale;
        scale.x += 0.5 * Time.deltaTime;
        this.transform.localScale = scale;
    }
}
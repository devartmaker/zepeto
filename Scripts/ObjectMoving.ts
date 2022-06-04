import { Time, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ObjectMoving extends ZepetoScriptBehaviour {

    public speed: float = 1;

    Start() {    
        console.log("Move!");
    }

    Update() {
        let tx = this.speed * Time.deltaTime;
        let v = new Vector3(tx, 0, 0);
        this.transform.Translate(v);

        console.log(tx);
    }
}

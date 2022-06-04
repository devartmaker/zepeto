import { Time } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class ObjectRotate extends ZepetoScriptBehaviour {

    Start() {    

    }

    Update() {
        let rotX = 100 * Time.deltaTime;
        this.transform.Rotate(rotX, 0, 0);
    }
}
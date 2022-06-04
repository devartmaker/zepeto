import { Time, Transform, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class TargetMoving extends ZepetoScriptBehaviour {

    public target: Transform;
    public speed: float = 1;

    Start() {    

    }

    Update() {
        let pos : Vector3 = Vector3.MoveTowards(this.transform.position, this.target.position, this.speed * Time.deltaTime);
        this.transform.position = pos;
    }
}
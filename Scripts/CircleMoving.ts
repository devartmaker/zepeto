import { Mathf, Time, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class CircleMoving extends ZepetoScriptBehaviour {
    public speed: float = 0.1
    private t: float = 0;

    Start() {    

    }

    Update() {
        let x = Mathf.Sin(this.t) * 1;
        let z = Mathf.Cos(this.t) * 1;
        this.t += Time.deltaTime * this.speed;

        this.transform.localPosition = new Vector3(x, 0, z);
    }
}
import { Mathf, Time, Transform, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class YoyoMoving extends ZepetoScriptBehaviour {

    public tg0 : Transform;
    public tg1 : Transform;
    public speed: float = 0.5;
    private t : float = 0;

    Start() {    

    }

    Update() {
        let num : float = (Mathf.Sin(this.t) + 1) / 2;
        this.t += this.speed * Time.deltaTime;
        let pos : Vector3 = Vector3.Lerp(this.tg0.position, this.tg1.position, num);
        this.transform.position = pos;
    }
}
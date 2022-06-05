import { Collider, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class Interaction extends ZepetoScriptBehaviour {

    public enableControl: Boolean = false;

    Start() {
        this.StartControl();
    }

    StartControl() {
        this.enableControl = false;
        setTimeout(() => { this.Activate(); }, 1000);
    }

    Activate()
    {
        this.enableControl = true;
    }

    public MoveLeft() {
        if (!this.enableControl) return;
        let v = new Vector3(-0.5, 0, 0);
        this.transform.Translate(v);
    }

    public MoveRight() {
        if (!this.enableControl) return;
        let v = new Vector3(0.5, 0, 0);
        this.transform.Translate(v);
    }

    OnTriggerEnter(obj: Collider)
    {
        if (obj.name == "Cylinder")
        {
            this.transform.localPosition = new Vector3(-5, 2, 0);
            this.StartControl();
        }
    }
}

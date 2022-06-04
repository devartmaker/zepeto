import { ZepetoScriptBehaviour } from 'ZEPETO.Script'
import { Collider, Mathf, Time, Vector3, WaitForSeconds } from 'UnityEngine';

export default class TriggerEvent extends ZepetoScriptBehaviour {

    private t : float = 0;

    // Start() {    
    //     this.StartCoroutine(this.MoveUpDown());
    // }
    
    // *MoveUpDown() {
    //     while (true) {
    //         this.t += 0.03;
    //         let v = new Vector3(0, Math.sin(this.t) * 0.03, 0);
    //         this.transform.Translate(v);
    //         yield new WaitForSeconds(0.01)
    //     }
    // }

    Update() {
        this.t += 2 * Time.deltaTime;
        let pos = new Vector3(0, 0.5 + Mathf.Abs(Mathf.Sin(this.t) * 2), 0);
        this.transform.localPosition = pos;
    }

    OnTriggerEnter(obj: Collider) {
        console.log(obj.name);
    }
}
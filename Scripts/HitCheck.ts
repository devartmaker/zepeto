import { Collider } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class HitCheck extends ZepetoScriptBehaviour {

    OnCollisionEnter(obj: Collider) {
        console.log(obj.gameObject.name);
    }

}
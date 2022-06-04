import { GameObject, Object, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class CubeCreator extends ZepetoScriptBehaviour {

    public prefab: GameObject;

    Start() {    
        setInterval(() => this.Create(), 1000);
    }

    Create() {
        var obj: GameObject = Object.Instantiate(this.prefab) as GameObject;
        obj.transform.localPosition = new Vector3(0, 10, 0);
    }
}
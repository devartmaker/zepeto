import { GameObject, Object, Quaternion, Random, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class CubeCreator extends ZepetoScriptBehaviour {

    public prefab: GameObject;

    Start() {    
        // 1초마다 오브젝트 생성
        setInterval(() => this.Create(), 1000);
    }

    Create() {
        var obj: GameObject = Object.Instantiate(this.prefab) as GameObject;
        obj.transform.localRotation = Quaternion.Euler(Random.Range(0, 360), Random.Range(0, 360), Random.Range(0, 360));
        obj.transform.localPosition = new Vector3(Random.Range(-20, 20), 10, Random.Range(-20, 20));
    }
}
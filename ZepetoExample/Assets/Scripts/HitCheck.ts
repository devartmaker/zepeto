import { CapsuleCollider, CharacterController, Collider, GameObject } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class HitCheck extends ZepetoScriptBehaviour {
    Awake() {
        // 충돌감지용 
        let chacterController: CharacterController = this.gameObject.GetComponent<CharacterController>();
        let col: CapsuleCollider = this.gameObject.AddComponent<CapsuleCollider>();
        col.radius = chacterController.radius + 0.05;
        col.height = chacterController.height + 0.1;
        col.center = chacterController.center;
        col.isTrigger = true;
    }

    OnTriggerEnter(obj: Collider) {
        // 방금 닿은 오브텍트의 태그가 큐브인지 확인
        if (obj.gameObject.CompareTag("Cube"))
        {
            console.log(`충돌 객체 name=${obj.gameObject.name}, tag=${obj.gameObject.tag}`);
            
            // 큐브 충돌시 삭제
            GameObject.Destroy(obj.gameObject);
        }
    }
}
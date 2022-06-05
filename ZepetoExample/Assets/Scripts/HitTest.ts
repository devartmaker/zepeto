import { Camera, Input, Physics, RaycastHit, Vector3 } from 'UnityEngine'
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class HitTest extends ZepetoScriptBehaviour {
  private isOpend: Boolean = false

  Update() {
    this.MouseControl();
  }

  MouseControl() {
    if (Input.GetMouseButtonDown(0)) {
      let ray = Camera.main.ScreenPointToRay(Input.mousePosition)
      let ref = $ref<RaycastHit>()

      if (Physics.Raycast(ray, ref, 1000)) {
        let hitInfo = $unref(ref)
        
        console.log(`hitInfo.collider.name : ${hitInfo.collider.name}`)
        if (hitInfo.collider.name == "Door")
        {
          if (this.isOpend) {
            this.transform.localEulerAngles = new Vector3(0, 0, 0);
          } else {
            this.transform.localEulerAngles = new Vector3(0, -70, 0);
          }
          this.isOpend = !this.isOpend; 
        }
      }
    }
  }
}

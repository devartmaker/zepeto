import { Time, Transform, Vector3 } from 'UnityEngine';
import { ZepetoScriptBehaviour } from 'ZEPETO.Script'

export default class WayPoints extends ZepetoScriptBehaviour {

    public points: Transform[];
    public speed: float = 1;
    private index: int = 0;

    Start() {    
        this.transform.position = this.points[this.index].position;
        this.NextPosition()
    }

    Update() {
        let pos : Vector3 = Vector3.MoveTowards(this.transform.position, this.points[this.index].position, this.speed * Time.deltaTime);
        this.transform.position = pos;

        if (this.transform.position == this.points[this.index].position)
        {
            this.NextPosition();
        }
    }

    NextPosition()
    {
        this.index++;
        if(this.index >= this.points.length)
        {
            this.index = 0;
        }
    }
}
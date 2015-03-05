#pragma strict

public static var LAYER : int = 3;

function Start ()
{
	var cursorPos : Vector3;
	cursorPos = Input.mousePosition;
	cursorPos.z = 30;
	var worldPos : Vector3 = Camera.main.ScreenToWorldPoint(cursorPos);	
	transform.position = worldPos;
}

var myRenderer : SpriteRenderer;// in loc sa ia date de la obiectul actual ia de la prefab

function Update ()
{
	var cursorPos : Vector3;
	cursorPos = Input.mousePosition;
	cursorPos.z = LAYER;
	var worldPos : Vector3 = Camera.main.ScreenToWorldPoint(cursorPos);	
	transform.position = worldPos;
	
	var instance : SpriteRenderer = GetComponent(SpriteRenderer);
	var pointA : Vector2 = myRenderer.sprite.bounds.min;
	var pointB : Vector2 = myRenderer.sprite.bounds.max;
	Debug.Log(pointA);
	Debug.Log(pointB);
	var ceva : Collider2D[] =Physics2D.OverlapAreaAll(pointA, pointB);
	if(ceva)
		Debug.Log(30); 
	Debug.Log(Physics2D.OverlapAreaAll(pointA, pointB));// pune si celelalte variabile.
	
}
